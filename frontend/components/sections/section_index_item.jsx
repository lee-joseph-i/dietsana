import React from "react";
import TaskIndexContainer from "../tasks/task_index_container";
import TaskIndexItem from "../tasks/task_index_item";
import { withRouter } from "react-router-dom";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

class SectionIndexItem extends React.Component {
  constructor(props) {
    super(props);
    let sectionName = this.props.section ? this.props.section.name : "";
    let taskOrder = this.props.section ? this.props.section.task_order : [];
    let task = this.props.tasks ? this.props.tasks : {};
    let section = this.props.section ? this.props.section : {};
    let sectionOrder = this.props.project
      ? this.props.project.section_order
      : [];

    this.state = {
      title: "",
      renderForm: false,
      sectionName: sectionName,
      tasks: task,
      taskOrder: taskOrder,
      section: section,
      sectionOrder: sectionOrder,
    };
    this.handleSubmitTask = this.handleSubmitTask.bind(this);
    this.handleDeleteSection = this.handleDeleteSection.bind(this);
    this.revealForm = this.revealForm.bind(this);
    this.handleUpdateSectionName = this.handleUpdateSectionName.bind(this);
  }

  componentDidMount() {
    // if (!this.props.section) return;
    // const sectionHeader = document.getElementById(`section-index-item-header-${this.props.section.id}`);
    // sectionHeader.onmouseover = function () {
    //   this.parentElement.style = 'border: 1px solid #fff; padding: 7px;'
    // }
    // sectionHeader.onmouseout = function() {
    //   this.parentElement.style = '';
    // }
 
    this.props.requestTasks(this.props.sectionId).then(result => {
      this.setState({
        tasks: result.tasks
      })
    })
  }

  componentDidUpdate(prevProps) {
    if (!this.props.section) return;
    if (!prevProps.section) return;

    if (this.state.taskOrder !== this.props.section.task_order) {
      this.setState({
        taskOrder: this.props.section.task_order,
      })
    }
  }

  handleSubmitTask(e) {
    e.preventDefault();
    let updatedTaskOrder = this.state.taskOrder;
    this.props
      .createTask({
        title: this.state.title,
        section_id: this.props.section.id,
      })
      .then((data) => {
        updatedTaskOrder.unshift(data.task.id);
        this.props.requestTasks(this.props.sectionId).then(result => {
          this.setState({
            taskOrder: updatedTaskOrder,
            tasks: result.tasks
          }, () => {
            this.props.updateSection({
              id: this.props.section.id,
              task_order: updatedTaskOrder
            })
            .then((data) => {
              this.setState({
                section: data.section
              })
            })
          })
        })
      });

    const form = document.getElementById(
      `create-task-${this.props.section.id}`
    );
    this.setState({ title: "" });
    if (form.classList.contains("show")) form.classList.remove("show");
  }

  handleDeleteSection(e) {
    e.preventDefault();
    let updatedSectionOrder = this.state.sectionOrder;
    updatedSectionOrder.splice(this.props.index, 1);
    this.props.updateProject({
      id: this.props.project.id,
      section_order: updatedSectionOrder,
    });
    this.props.deleteSection(this.props.section.id);
  }

  update(field) {
    return (e) => this.setState({ [field]: e.currentTarget.value });
  }

  revealForm() {
    const form = document.getElementById(
      `create-task-${this.props.section.id}`
    );
    form.classList.toggle("show");
    const input = document.getElementById(
      `create-task-textarea-${this.props.section.id}`
    );
    input.focus();
  }

  renderSectionName() {
    if (!this.state.renderForm) {
      return (
        <div
          className="section-index-item-title"
          onClick={() => this.setState({ renderForm: true })}
        >
          {this.props.section.name}
        </div>
      );
    } else {
      return (
        <form className="section-index-item-title-form">
          <input
            className="section-index-item-title-input"
            autoFocus
            type="text"
            value={this.state.sectionName}
            onChange={this.update("sectionName")}
            onBlur={this.handleUpdateSectionName}
          />
        </form>
      );
    }
  }

  handleUpdateSectionName() {
    const section = {
      name: this.state.sectionName,
      id: this.props.section.id,
      task_order: this.props.section.task_order,
    };
    this.props
      .updateSection(section)
      .then(() => this.setState({ renderForm: false }));
  }

  render() {
    if (!this.props.section) return null;
    const { section, deleteTask, taskOrder } = this.props;
    return (
      <Draggable
        draggableId={(this.props.section.id + 999999).toString()}
        index={this.props.index}
      >
        {(provided, snapshot) => (
          <div
            {...provided.draggableProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
            className={`section-index-item-parent ${
              snapshot.isDragging ? "isDragging" : ""
            }`}
            id="section-index-item-parent"
          >
            <div
              {...provided.dragHandleProps}
              className="section-index-item-header"
              id={`section-index-item-header-${section.id}`}
            >
              {this.renderSectionName()}
              <div>
                <svg
                  onClick={this.handleDeleteSection}
                  className="section-index-delete-icon"
                  viewBox="0 0 448 512"
                >
                  <path d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z"></path>
                </svg>
              </div>
            </div>
            <div onClick={this.revealForm} className="reveal-task-form-button">
              {/* <svg className="new-task-plus-icon" viewBox="0 0 32 32">
                <path d="M26,14h-8V6c0-1.1-0.9-2-2-2l0,0c-1.1,0-2,0.9-2,2v8H6c-1.1,0-2,0.9-2,2l0,0c0,1.1,0.9,2,2,2h8v8c0,1.1,0.9,2,2,2l0,0c1.1,0,2-0.9,2-2v-8h8c1.1,0,2-0.9,2-2l0,0C28,14.9,27.1,14,26,14z"></path>
              </svg> */}
              + New Task
            </div>
            <form
              id={`create-task-${section.id}`}
              className="task-create-form"
              onSubmit={this.handleSubmit}
            >
              <textarea
                className="task-create-input"
                id={`create-task-textarea-${section.id}`}
                onChange={this.update("title")}
                value={this.state.title}
                placeholder="New task"
                onBlur={this.handleSubmitTask}
              />
            </form>

            {/* Formerly TaskIndex */}
            <Droppable
              droppableId={this.props.section.id.toString()}
              type="task"
            >
              {provided => (
                <div
                  className="task-index-parent"
                  // id="task-index-container"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {
                    this.state.taskOrder.map((taskId, index) => (
                    // this.props.section.task_order.map((taskId, index) => (
                      <TaskIndexItem
                        // key={taskId.toString()}
                        key={taskId}
                        index={index}
                        taskId={taskId}
                        // task={this.props.tasks[taskId]}
                        task={this.state.tasks[taskId]}
                        deleteTask={deleteTask}
                        section={this.props.section}
                        updateSection={this.props.updateSection}
                      />
                    ))
                  }
                  {provided.placeholder}
                </div>
              )}
            </Droppable>

            {/* <DragDropContext onDragEnd={this.onDragEnd}> */}
            {/* <TaskIndexContainer 
                sectionId={section.id} 
                section={section}
                taskOrder={taskOrder}
              /> */}
            {/* </DragDropContext> */}
          </div>
        )}
      </Draggable>
    );
  }
}

export default withRouter(SectionIndexItem);
