import {controller} from "../logic/controller";
import {taskFactory,projectFactory,projectMethods} from "../logic/create"

const DOMcontroller = (()=>{
    
    let addProjectButton = document.querySelector("#add-project-but");
    let projectTitle = document.querySelector("#project-title-input");
    let projectsDiv = document.querySelector("#projects-container");

   
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

    const createProjectButton = (title)=>{
        let buttonRow = document.createElement("div");
        buttonRow.classList.add("row", "pb-1");

        let projectButtonCol = document.createElement("div");
        projectButtonCol.classList.add("col-8","pr-0");

        let deleteButCol = document.createElement("div");
        deleteButCol.classList.add("col-4","pl-1");


        let button = document.createElement('button');
        button.textContent = title;
        button.classList.add("btn","btn-outline-info","btn-block");

        let delButton = document.createElement('button');
        delButton.textContent = "Delete"
        delButton.classList.add("btn","btn-outline-danger","btn-block")

        projectButtonCol.appendChild(button);
        deleteButCol.appendChild(delButton);

        buttonRow.appendChild(projectButtonCol);
        buttonRow.appendChild(deleteButCol);
        
        projectsDiv.append(buttonRow);

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
