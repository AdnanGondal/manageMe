import {controller} from "../logic/controller";
import {taskFactory,projectFactory,projectMethods,taskMethods} from "../logic/create"

const DOMcontroller = (()=>{
    
    let addProjectButton = document.querySelector("#add-project-but");
    let projectTitle = document.querySelector("#project-title-input");
    let projectsDiv = document.querySelector("#projects-container");
    let deleteButs;

    let addTaskButton = document.querySelector("#add-task-but");
    let tasksDiv = document.querySelector("#task-container")
    let taskTitle = document.querySelector("#new-task-title");
    let taskDescription = document.querySelector("#task-description-text");
    let taskPriority = document.querySelector("#task-priority-select");
    let taskDeadLine = document.querySelector("#task-deadline")



    const render = ()=>{

        projectDisplay();

        //Button event listeners:

        addProjectButton.addEventListener('click',()=>{
            addProject();
        });

        addTaskButton.addEventListener('click',()=>{
            //console.log(controller.getCurrentProject());
            addTask();
        });

    }

    const addTask=()=>{
        if (!controller.getCurrentProject()) {
            alert ("Warning: Select a project");
            return;
        }
       
        if (!taskTitle.value){
            alert("Warning: Enter task title.");
            return;
        }
        if (!taskDeadLine.value){
            alert("Warning: Select Deadline.");
            return;
        }

        controller.addTask(controller.getCurrentProjectindex(),taskTitle.value,taskDescription.value,taskPriority.value,taskDeadLine.value);
        taskTitle.value = '';
        taskDescription.value = '';
        showTasks();

    }

    const showTasks = ()=>{
        Object.assign(controller.getCurrentProject(),projectMethods)
        console.log(controller.getCurrentProject().getTasks());
       
        let tasks = controller.getCurrentProject().getTasks();

        tasksDiv.innerHTML = '';
        let indexT = 0;
        tasks.forEach((task)=>{
            let taskIndex = indexT;
            Object.assign(task,taskMethods);
            console.log(task.getTitle());

            let taskContainer=document.createElement('div');
            taskContainer.classList.add("mb-1","pl-3");

            let row1 = document.createElement('div');
            row1.classList.add("row");
            

            let taskCol = document.createElement('div')
            taskCol.classList.add("col-md-9","border","rounded",);

            let buttonCol = document.createElement('div')
            buttonCol.classList.add("col-md-3","pl-1","m-0");

            let deleteBut = document.createElement("button");
            deleteBut.classList.add("btn","btn-outline-danger","btn-block")
            deleteBut.textContent = "Delete";
            buttonCol.appendChild(deleteBut);

            deleteBut.addEventListener('click',()=>{
                controller.deleteTask(controller.getCurrentProjectindex(),taskIndex)
                showTasks();
            });

            let title = document.createElement('h6');
            title.textContent = `${task.getTitle()}`;
            title.classList.add("m-0");

            let priority = document.createElement('p');
            let priorityVal = task.getPriority();
            priority.textContent = `${priorityVal} priority`;
            priority.classList.add("m-0")

            let deadline = document.createElement('p');
            deadline.textContent = `Due: ${task.getDeadline()}`
            deadline.classList.add("m-0");
            let description = document.createElement('p');
            description.textContent = task.getDescription();

            
            
            taskCol.appendChild(title);
            
            taskCol.appendChild(deadline);
            taskContainer.addEventListener('mouseover',(e)=>{
                taskCol.appendChild(priority);
                taskCol.appendChild(description);
            });
            taskContainer.addEventListener('mouseout',()=>{
                taskCol.removeChild(priority);
                taskCol.removeChild(description);
            });
            row1.appendChild(taskCol);
            row1.appendChild(buttonCol)
            taskContainer.appendChild(row1);

            tasksDiv.appendChild(taskContainer);
            
            indexT ++;
        });
    

    }

    const addProject=()=>{
        if (projectTitle.value){
            controller.addProject(projectTitle.value);
            projectDisplay();
            projectTitle.value = "";

        } else {
            alert("Warning: Enter project title.")
        }
        
         
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
            //colours and that: 
            button.classList.remove("notCurrent");
            let otherButtons = document.querySelectorAll(".notCurrent");
            
            otherButtons.forEach((but)=>{
                but.classList.remove("btn-info","current");
                but.classList.add("btn-outline-info");
            });

            button.classList.remove("btn-outline-info");
            button.classList.add("btn-info","notCurrent");

            //logic:
            controller.changeCurrentProject(index);
            //console.log(controller.getCurrentProject());
            showTasks();
        });

        let delButton = document.createElement('button');
        delButton.textContent = "Delete";
        delButton.classList.add("btn","btn-outline-danger","btn-block","deleteButs");

        delButton.addEventListener('click',()=>{
            //console.log("Hello");
            projectsDiv.removeChild(buttonRow);
            controller.removeProject(index);
            projectDisplay();
            controller.resetCurrentProject(index);
            tasksDiv.innerHTML = '';
        });

        projectButtonCol.appendChild(button);
        deleteButCol.appendChild(delButton);

        buttonRow.appendChild(projectButtonCol);
        buttonRow.appendChild(deleteButCol);
        
        projectsDiv.append(buttonRow);

    }


    return {
        render,
    }

})()

export
{DOMcontroller}
