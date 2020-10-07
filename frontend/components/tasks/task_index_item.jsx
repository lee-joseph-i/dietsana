import React from "react";
import { Draggable } from "react-beautiful-dnd";

class TaskIndexItem extends React.Component {
  constructor(props) {
    super(props);
    let taskOrder = this.props.section.task_order
      ? this.props.section.task_order
      : [];
    let taskId = this.props.taskId ? this.props.taskId : "";

    this.state = {
      taskOrder: taskOrder,
      // taskOrder: this.props.section.taskOrder,
      taskId: taskId,
    };

    this.handleDelete = this.handleDelete.bind(this);
    this.revealTaskDropdown = this.revealTaskDropdown.bind(this);
  }

  // componentDidUpdate(prevProps) {
  //   //so it looks like this.props is not getting the new task, returned as undefined. note that the taskId is there though! 
  //   //i suspect because section_index_item is passing a task prop `task={this.state.tasks[taskId]}` <--- this state is likely not being updated with the new task
  //   // but taskId does exist...
  //   // console.log("START")
  //   // console.log(prevProps)
  //   // console.log(this.props)
  //   // console.log("END")
  //   if (prevProps.section.task_order !== this.props.section.task_order) {
  //     console.log("c")
  //     this.setState({
  //       taskOrder: this.props.section.task_order,
  //     });
  //   }
  //   // if (prevProps.task !== this.props.task) {
  //     if (prevProps.section !== this.props.section) {
  //         console.log("a")
  //     this.setState({
  //       sections: this.props.sections,
  //       taskOrder: this.props.section.task_order
  //     })
  //   }

  //   if (prevProps.taskId !== this.props.taskId) {
  //     console.log('b')
  //     this.setState({
  //       taskId: this.props.taskId
  //     })
  //   }
  // }

  handleDelete(e) {
    e.stopPropagation();
    let updatedTaskOrder = this.props.section.task_order;
    updatedTaskOrder.splice(this.props.index, 1);
    this.setState({ taskOrder: updatedTaskOrder }, () => {
      this.props.deleteTask(this.props.task.id).then((data) => {
        this.props.updateSection({
          id: this.props.section.id,
          task_order: this.state.taskOrder,
        });
      });
    });

    let dropdowns = document.getElementsByClassName("task-dropdown-contents");
    for (let i = 0; i < dropdowns.length; i++) {
      let openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }

  revealTaskDropdown(e) {
    e.stopPropagation();
    const dropdown = document.getElementById(`task-item-${this.props.task.id}`);
    dropdown.classList.toggle("show");

    window.onclick = () => {
      let dropdowns = document.getElementsByClassName("task-dropdown-contents");
      for (let i = 0; i < dropdowns.length; i++) {
        let openDropdown = dropdowns[i];
        if (openDropdown.classList.contains("show")) {
          openDropdown.classList.remove("show");
        }
      }
    };
  }
  // when a task is dragged and re-ordered, 
  // the task_order array from this.props.section.task_order ends up empty, 
  // so nothing is mapped and rendered from section_index_item component
  // this.props.section will still have the section information, otherwise.
  // PRIOR to that, this.props in this task_index_item component 
  // will show both tasks with their associated section. 
  // so it's not like the tasks lose their association to the section.

  // when the task is reordered, there is a taskOrder prop that has the new right order,
  // however, i think we want to move this to task_order instead.
  // furthermor, the item that was moved has it's id stringified, though i can't immediately tell why <--- this is where i left off

  // additional: 
  // in the backend, the tasks still have their section_id properly assigned to them.
  // that's good news? I can probably request those tasks.
  // i need to figure out how to repopulate task_order in section_index_item
  render() {
    if (!this.props.task) return null;
    if (!this.props) return null;
    if (!this.props.taskId) return null;
    // console.log("this.props from task_index_item:")
    // console.log(this.props)
    // console.log("end")
    const { task } = this.props;

    return (
      <Draggable
        // testing
        // draggableId={this.props.task.id.toString()}
        draggableId={`${this.props.task.id}`}
        key={this.props.task.id}
        index={this.props.index}
      >
        {(provided) => (
          <div
            className="task-index-item-parent"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div className="task-index-item-content">
              <div>{task.title}</div>
              <div className="task-index-item-dropdown">
                <svg
                  onClick={this.revealTaskDropdown}
                  className="task-dropdown-icon"
                  viewBox="0 0 32 32"
                >
                  <path d="M16,13c1.7,0,3,1.3,3,3s-1.3,3-3,3s-3-1.3-3-3S14.3,13,16,13z M3,13c1.7,0,3,1.3,3,3s-1.3,3-3,3s-3-1.3-3-3S1.3,13,3,13z M29,13c1.7,0,3,1.3,3,3s-1.3,3-3,3s-3-1.3-3-3S27.3,13,29,13z"></path>
                </svg>
                <div
                  id={`task-item-${task.id}`}
                  className="task-dropdown-contents"
                >
                  {/* <div className='task-dropdown-item'>
                    Edit task details
                  </div> */}
                  <div
                    onClick={this.handleDelete}
                    className="task-dropdown-item"
                  >
                    Delete task
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Draggable>
    );
  }
}

export default TaskIndexItem;
