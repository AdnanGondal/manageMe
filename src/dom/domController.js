import {controller} from "../logic/controller";
import {taskFactory,projectFactory,projectMethods} from "../logic/create"

const DOMcontroller = (()=>{
    
    let addProjectButton = document.querySelector("#add-project-but");
    let projectTitle = document.querySelector("#project-title-input");
    let projectsDiv = document.querySelector("#projects-container");
    let deleteButs;

    const render = ()=>{

        projectDisplay();

        //Button event listeners:

        addProjectButton.addEventListener('click',()=>{
            addProject();
        });

    }
   
    const projectDisplay=()=>{

        //get current stored projects and displays them....
        // is called everytime a new project is added, removed, page refresh.

        projectsDiv.innerHTML = '';

        console.log(controller.getProjects());
        let projects = controller.getProjects();
        projects.forEach((project,index)=>{
            
            //console.log(controller.isStored())
            if (controller.isStored()) {
                Object.assign(project,projectMethods);
            }
            //console.log({project});
            createProjectButton(project.getTitle(),index);
        });


    }

    const createProjectButton = (title,index)=>{
        console.log(index);
        let buttonRow = document.createElement("div");
        buttonRow.classList.add("row", "pb-1");

        let projectButtonCol = document.createElement("div");
        projectButtonCol.classList.add("col-8","pr-0");

        let deleteButCol = document.createElement("div");
        deleteButCol.classList.add("col-4","pl-1");

        let button = document.createElement('button');
        button.textContent = title;
        button.classList.add("btn","btn-outline-info","btn-block","notCurrent");
        
        button.addEventListener('click',()=>{

            button.classList.remove("notCurrent");
            let otherButtons = document.querySelectorAll(".notCurrent");
            
            otherButtons.forEach((but)=>{
                but.classList.remove("btn-info","current");
                but.classList.add("btn-outline-info");
            });

            controller.changeCurrentProject(index);
            console.log(controller.getCurrentProject());

            button.classList.remove("btn-outline-info");
            button.classList.add("btn-info","notCurrent")
        });

        let delButton = document.createElement('button');
        delButton.textContent = "Delete";
        delButton.classList.add("btn","btn-outline-danger","btn-block","deleteButs");

        delButton.addEventListener('click',()=>{
            //console.log("Hello");
            projectsDiv.removeChild(buttonRow);
            controller.removeProject(index);
            projectDisplay();
        });

        projectButtonCol.appendChild(button);
        deleteButCol.appendChild(delButton);

        buttonRow.appendChild(projectButtonCol);
        buttonRow.appendChild(deleteButCol);
        
        projectsDiv.append(buttonRow);

    }


    const addProject=()=>{
        if (projectTitle.value){
            controller.addProject(projectTitle.value);
            projectDisplay();
            projectTitle.value = "";

        } else {
            alert("warning")
        }
        
         
    }





    return {
        render,
    }

})()

export
{DOMcontroller}
