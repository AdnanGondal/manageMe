import {controller} from "../logic/controller";
import {taskFactory,projectFactory,projectMethods} from "../logic/create"

const DOMcontroller = (()=>{
    
    let addProjectButton = document.querySelector("#add-project-but");
    let projectTitle = document.querySelector("#project-title-input");
    let projectsDiv = document.querySelector("#projects-container");
    let deleteButs;

   
    const projectDisplay=()=>{

        //get current stored projects and displays them....
        // also indexes correctly to allow deletion

        //console.log(localStorage.removeItem('projects'));
        //console.log(JSON.parse(localStorage.getItem('projects')));
        projectsDiv.innerHTML = '';

        console.log(controller.getProjects());
        let projects = controller.getProjects();
        projects.forEach((project,index)=>{
            
            //console.log(controller.isStored())
            if (controller.isStored()) {
                Object.assign(project,projectMethods);
            }
            console.log({project});
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
        button.classList.add("btn","btn-outline-info","btn-block");

        let delButton = document.createElement('button');
        delButton.textContent = "Delete";
        delButton.classList.add("btn","btn-outline-danger","btn-block","deleteButs");

        delButton.addEventListener('click',()=>{
            console.log("Hello");
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
            //createProjectButton(projectTitle.value,controller.getProjects().length-1);
            projectDisplay();
            projectTitle.value = "";
            console.log(JSON.parse(localStorage.getItem('projects')));


        } else {
            alert("warning")
        }
        
         
    }

    const deleteProject=()=>{
        /*
        deleteButs = document.querySelectorAll(".deleteButs");
        console.log(deleteButs);

        deleteButs.forEach((button,index)=>{

            button.addEventListener('click',(e)=>{
                console.log(index);
                controller.removeProject(index);
                //projectDisplay();
                e.stopPropagation();
                
            });
        });*/
    }



    const render = ()=>{

        projectDisplay();

        //Button event listeners:

        addProjectButton.addEventListener('click',()=>{
            addProject();
        });

        deleteProject();
    }


    return {
        render,
    }

})()

export
{DOMcontroller}
