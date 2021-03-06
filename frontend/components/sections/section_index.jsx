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
        sectionOrder: newSectionOrder
      };
      
      // This is the problem area for flickering drag issue with sections.
      // section_index STATE will first show the OLD order <===== CULPRIT!
      // project_show props will then show the CORRECT new order.
      // section_index STATE will then show the OLD order
      // section_index STATE will then show the NEW order

      this.setState(newState, () => {
        this.props.updateProject({
          id: this.props.project.id,
          section_order: newSectionOrder
        })
      });

      return;
    }

    // these constants are used for both re-ordering tasks logic and re-ordering tasks to sections logic
    const start = this.state.sections[source.droppableId];
    const finish = this.state.sections[destination.droppableId];
    // dragging and reordering a task within the SAME section is handled by the below logic
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
      // newSection is now the section with the properly ordered task_order
      const newState = {
        ...this.state,
        sections: {
          ...this.state.sections,
          [newSection.id]: newSection,
        },
      };
      //newState is now the state, that has sections which itself has the updated task_order as mentioned in line 176

      this.setState(newState, () => {
        this.props.updateSection({
          id: start.id,
          task_order: newTaskOrder
        });
      });
      
      //note: once you setState, component will render. that is why console.log on render will show up immediately.
      //so observing this:
      // line 185 console log triggers first
      // render console log triggers
      // console logs "c" "a" "c" "a" trigger from task_index_item componentDidUpdate <--- i blocked out this logic.
      // line 194 console log triggers
      // render console log triggers <-- task_order is CORRECT
      // render console log triggers again <-- task_order DISAPPEARS!

      // i think this is because the backend is losing task_order.
      // fixed this because task_order was taskOrder when dispatching updateSection.
      return;
    }

    //the below logic is used to handle tasks moving to other sections.
    const startTaskOrder = Array.from(start.task_order);
    // startTaskOrder is the task_order array of the drag origin
    startTaskOrder.splice(source.index, 1);
    // startTaskOrder is the task_order array without the dragged taskId. 
    const newStart = {
      ...start,
      task_order: startTaskOrder,
    };
    //newStart is the state shape of the origin section where the task was moved from.

    const finishTaskOrder = Array.from(finish.task_order);
    finishTaskOrder.splice(destination.index, 0, parseInt(draggableId));
    const newFinish = {
      ...finish,
      task_order: finishTaskOrder,
    };

    const newState = {
      ...this.state,
      sections: {
        ...this.state.sections,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };

    //bug notes: flickering when re-ordering tasks
    //confirmed that component state is accurately reflecting new state everytime.
    //so possibly child component is exhibiting the cause
    //this.state in section index item is not updating task_order until a little later <== culprit area
    //so i need make sure render doesn't hit before this

    // this console log hits first.
    // then the section index render hits with the right task order!
    // then the section index item render hits with the wrong order

    this.setState(newState);
    this.props.updateSection({
      id: start.id,
      task_order: startTaskOrder
    });
    this.props.updateSection({
      id: finish.id,
      task_order: finishTaskOrder
    });
    this.props.updateTask({
      id: draggableId,
      section_id: finish.id
    })

    //dragging now works, except re-rendering doesn't occur unless page refresh or create a new task.
    //confirmed that in section_index_item, state is accurately updated to have the correct task_order.
    //also confirmed that the backend task_order is also correct. 
    //so why isn't it rendering? note that it does show up after creating a task. see what happens there that's not happening here.
  };

  render() {
    if (!this.props) return null;
    if (!this.props.sections) return null;
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