import React from 'react';
import { withRouter } from 'react-router-dom';
import SectionIndexItemContainer from './section_index_item_container.jsx';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

class SectionIndex extends React.Component{
  constructor(props) {
    super(props)
    let sections = this.props.sections ? this.props.sections : {};

    this.state = {
      name: '',
      project_id: this.props.match.params.projectId,
      project: this.props.project,
      sections: sections,
      sectionOrder: this.props.sectionOrder
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.revealForm = this.revealForm.bind(this);
  };

  componentDidMount() {
    this.props.requestSections(this.props.match.params.projectId).then(result => {
      this.setState({
        sections: result.sections
      })
    })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.projectId !== this.props.match.params.projectId) {
      this.setState({ 
        name: '',
        project_id: this.props.match.params.projectId,
        sectionOrder: this.props.sectionOrder
      });
    };
    if (prevProps.project.section_order !== this.props.project.section_order) {
      this.setState({
        sectionOrder: this.props.project.section_order
      })
    }
    
    if (Object.keys(prevProps.sections)?.length !== Object.keys(this.props.sections).length) {
      this.setState({
        sections: this.props.sections
      })
    }

    // so here...
    // this.props.sections[sectionId].task_order 
    // and
    // prevProps.sections[sectionId].task_order
    // are the same. prevProps is getting the new task in task_order when it shouldn't yet.
    // so the question is, where is prevProps getting this from? 
    // because of this, the if conditional won't trigger
    Object.keys(this.props.sections).forEach(sectionId => {
      if (!prevProps.sections[sectionId]) return;
      // console.log("-----")
      // console.log(this.props.sections[sectionId])
      // console.log(prevProps.sections[sectionId])
      // console.log("-----")
      if (this.props.sections[sectionId].task_order.length !== 
        prevProps.sections[sectionId].task_order.length) {
          this.setState({
            ...this.state,
            sections: {
              ...this.state.sections,
              [sectionId]: this.props.sections[sectionId]
            }
          })
      }

      if (this.props.sections[sectionId].name !== 
        prevProps.sections[sectionId].name) {
          this.setState({
            ...this.state,
            sections: {
              ...this.state.sections,
              [sectionId]: this.props.sections[sectionId]
            }
          })
      }
    })
  }

  update(field) {
    return e => this.setState({ [field]: e.currentTarget.value })
  };

  handleSubmit(e) {
    e.preventDefault();
    let updatedSectionOrder = this.state.sectionOrder
    this.props.createSection({
      name: this.state.name,
      project_id: this.state.project_id,
    })
      .then(data => {
        updatedSectionOrder.push(data.section.id)

        this.setState({ 
          sectionOrder: updatedSectionOrder,
          sections: {
            ...this.state.sections,
            [data.section.id]: data.section
          }
        }, () => {
          this.props.updateProject({
            id: this.props.project.id,
            section_order: updatedSectionOrder
          })
      })
      })
    this.setState({ name: '' })
    const form = document.getElementById(`new-section-form-${this.props.projectId}`)
    if (form.classList.contains('show')) form.classList.remove('show');
    const toggle = document.getElementById(`new-section-toggle-${this.props.projectId}`);
    if (!toggle.classList.contains('show')) toggle.classList.toggle('show');
  };

  revealForm() {
    const toggle = document.getElementById(`new-section-toggle-${this.props.projectId}`);
    toggle.classList.toggle('show');
    const form = document.getElementById(`new-section-form-${this.props.projectId}`);
    form.classList.toggle('show');
    const input = document.getElementById(`new-section-input-${this.props.projectId}`);
    input.focus();
  };

  onDragEnd = result => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === 'column') {
      const newSectionOrder = Array.from(this.state.sectionOrder);
      newSectionOrder.splice(source.index, 1);
      newSectionOrder.splice(destination.index, 0, (parseInt(draggableId) - 999999));

      const newState = {
        ...this.state,
        section: newSectionOrder
      };
      this.setState(newState, () => {
        this.props.updateProject({
          id: this.props.project.id,
          section_order: newSectionOrder
        })
      });
      return;
    }

    // dragging and reordering a task is handled by the below logic
    const start = this.state.sections[source.droppableId];
    const finish = this.state.sections[destination.droppableId];
    if (start === finish) {
      const newTaskOrder = Array.from(start.task_order);
      //newTaskOrder at this point is the unchanged task_order. 
      newTaskOrder.splice(source.index, 1);
      newTaskOrder.splice(destination.index, 0, parseInt(draggableId));
      //newTaskOrder at this point is the CHANGED task_order, however, draggableId is a string so I added parseInt to it to turn that into a desired integer.
      
      const newSection = {
        ...start,
        task_order: newTaskOrder,
      };
      // newSection is now the section, with a not-yet-ordered task_order but has an ordered taskOrder. 
      const newState = {
        ...this.state,
        sections: {
          ...this.state.sections,
          [newSection.id]: newSection,
        },
      };
      //newState is now the state, that has sections which itself has taskOrder and task_order as mentioned in line 176
      console.log("newState with should-be new order", newState)

      // something is wrong in between here. newState has the desired task_order but setting state below does not apply that and keeps the original order.

      this.setState(newState, () => {
        this.props.updateSection({
          id: start.id,
          task_order: newTaskOrder
        });
        console.log("after drag state", this.state)
      });
      
      //note: once you setState, component will render. that is why console.log on render will show up before it does in line 194. 
      //so observing this:
      // line 185 console log triggers first
      // render console log triggers
      // console logs "c" "a" "c" "a" trigger from task_index_item componentDidUpdate <--- logic i dont understand at this point
      // line 194 console log triggers
      // render console log triggers <-- task_order is CORRECT
      // render console log triggers again <-- task_order DISAPPEARS!

      // i think this is because the backend is losing task_order.
  
      return;
    }

    const startTaskOrder = Array.from(start.task_order);
    startTaskOrder.splice(source.index, 1);
    const newStart = {
      ...start,
      taskOrder: startTaskOrder,
    };

    const finishTaskOrder = Array.from(finish.task_order);
    finishTaskOrder.splice(destination.index, 0, parseInt(draggableId));
    const newFinish = {
      ...finish,
      taskOrder: finishTaskOrder,
    };

    const newState = {
      ...this.state,
      sections: {
        ...this.state.sections,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };

    this.setState(newState, () => console.log('new state', this.state));
    this.props.updateSection({
      id: start.id,
      task: startTaskOrder
    });
    this.props.updateSection({
      id: finish.id,
      task: finishTaskOrder
    });
    this.props.updateTask({
      id: draggableId,
      section_id: finish.id
    })


  };

  render() {
    if (!this.props) return null;
    if (!this.props.sections) return null;
    console.log("render state", this.state)
    return (
      <div className='section-index-parent'>
        <div className='section-index-content'>
          <DragDropContext onDragEnd={this.onDragEnd}>
            <Droppable 
              droppableId='all-sections' 
              direction='horizontal' 
              type='column'
            >
              {(provided, snapshot) => (
                <div
                  className='sections-droppable'
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {
                    this.state.sectionOrder.map((sectionId, index) => (
                      <SectionIndexItemContainer
                        key={sectionId}
                        sectionId={sectionId}
                        section={this.state.sections[sectionId]}
                        createTask={this.props.createTask} 
                        project={this.props.project}
                        index={index}
                        updateProject={this.props.updateProject}
                      />
                    ))
                  }
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          <div className='new-section-form-container'>
            <div 
              className='new-section-form-toggle show' 
              id={`new-section-toggle-${this.props.projectId}`}
              onClick={this.revealForm}
            >
              + New Section
            </div>
            <form 
              onSubmit={this.handleSubmit} 
              className='new-section-form'
              id={`new-section-form-${this.props.projectId}`}
            >
              <input
                className='new-section-input'
                id={`new-section-input-${this.props.projectId}`}
                onChange={this.update('name')}
                type="text" 
                value={this.state.name}
                placeholder='Section Title'
                onBlur={this.handleSubmit}
              />
            </form>
          </div>
        </div>
      </div>
    );
  };
};

export default withRouter(SectionIndex);