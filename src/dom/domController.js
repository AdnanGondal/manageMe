import {controller} from "../logic/controller";
import {taskFactory,projectFactory,projectMethods} from "../logic/create"

const DOMcontroller = (()=>{
    
    let addProjectButton = document.querySelector("#add-project-but");
    let projectTitle = document.querySelector("#project-title-input");
    let projectsDiv = document.querySelector("#projects-container");

    const createProjectButton = (title)=>{
        let button = document.createElement('button');
        button.textContent = title;
        button.classList.add("btn","btn-outline-info","btn-block");
        projectsDiv.append(button);

    }

    const projectDisplay=()=>{


        //console.log(localStorage.removeItem('projects'));
        console.log(JSON.parse(localStorage.getItem('projects')));
        
        console.log(controller.getProjects())

        let projects = controller.getProjects();
        
        
        projects.forEach((project)=>{
            //console.log({project});
            Object.assign(project,projectMethods);
            createProjectButton(project.getTitle());

        });


    }

    const addProject=()=>{
        if (projectTitle.value){
            controller.addProject(projectTitle.value);
            createProjectButton(projectTitle.value);
            projectTitle.value = "";
            console.log(JSON.parse(localStorage.getItem('projects')));
        } else {
            alert("warning")
        }
        
         
    }

    const render = ()=>{

        projectDisplay();
        //Button event listeners:

        addProjectButton.addEventListener('click',()=>{
            addProject();
        });
    }


    return {
        render,
    }

})()

export
{DOMcontroller}
