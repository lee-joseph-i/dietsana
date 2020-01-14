import React from 'react';
import { Link } from 'react-router-dom';

function ProjectIndex({projects, updateProject, deleteProject}){
  if(projects.length === 0){
    return "There are no projects";
  }

  return(
    <div>
      <ul>
        {
          projects.map(project => (
            // <ProjectItemIndex key={project.id} project={project} deleteProject={deleteProject} updateProject={updateProject}/>
            <li>{project.name}</li>
          ))
        }
      </ul>
      <Link to="/app/projects/new">Create New Project</Link>
    </div>
  )
}

export default ProjectIndex;

