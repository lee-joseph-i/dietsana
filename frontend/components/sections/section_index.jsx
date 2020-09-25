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
    
    if (prevProps.project.sectionOrder !== this.props.project.sectionOrder) {
      this.setState({
        sectionOrder: this.props.sectionOrder
      })
    }

    if (Object.keys(prevProps.sections)?.length !== Object.keys(this.props.sections).length) {
      this.setState({
        sections: this.props.sections
      })
    }

    Object.keys(this.props.sections).forEach(sectionId => {
      if (!prevProps.sections[sectionId]) return;
      if (this.props.sections[sectionId].task_order?.length !== 
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

    const start = this.state.sections[source.droppableId];
    const finish = this.state.sections[destination.droppableId];

    if (start === finish) {
      const newTaskOrder = Array.from(start.taskOrder);
      newTaskOrder.splice(source.index, 1);
      newTaskOrder.splice(destination.index, 0, draggableId);

      const newSection = {
        ...start,
        taskOrder: newTaskOrder,
      };

      const newState = {
        ...this.state,
        sections: {
          ...this.state.sections,
          [newSection.id]: newSection,
        },
      };

      this.setState(newState, () => {
        this.props.updateSection({
          id: start.id,
          task: newTaskOrder
        })
      });
      return;
    }

    const startTaskOrder = Array.from(start.taskOrder);
    startTaskOrder.splice(source.index, 1);
    const newStart = {
      ...start,
      taskOrder: startTaskOrder,
    };

    const finishTaskOrder = Array.from(finish.taskOrder);
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
    // console.log("===");
    // console.log("section index: this.state.sectionOrder:")
    // console.log(this.state.sectionOrder)
    //     console.log("===");

    return (
      <div className='section-index-parent'>
        <div className='section-index-content'>
          <DragDropContext onDragEnd={this.onDragEnd}>
            <Droppable 
              droppableId='all-sections' 
              direction='horizontal' 
              type='column'
            >
              {(provided) => (
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
            {/* <div 
              className='new-section-form-toggle show' 
              id={`new-section-toggle-${this.props.projectId}`}
              onClick={this.revealForm}
            >
              + Add Column
            </div> */}
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