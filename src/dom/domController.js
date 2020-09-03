import { format } from "date-fns";
import parseISO from "date-fns/parseISO";
import { controller } from "../logic/controller";
import { projectMethods, taskMethods } from "../logic/create";

const DOMcontroller = (() => {
  const addProjectButton = document.querySelector("#add-project-but");
  const projectTitle = document.querySelector("#project-title-input");
  const projectsDiv = document.querySelector("#projects-container");

  const addTaskButton = document.querySelector("#add-task-but");
  const tasksDiv = document.querySelector("#task-container");
  const taskTitle = document.querySelector("#new-task-title");
  const taskDescription = document.querySelector("#task-description-text");
  const taskPriority = document.querySelector("#task-priority-select");
  const taskDeadLine = document.querySelector("#task-deadline");

  const render = () => {
    projectDisplay();

    // Button event listeners:

    addProjectButton.addEventListener("click", () => {
      addProject();
      // console.log(controller.getProjects())
    });

    addTaskButton.addEventListener("click", () => {
      // console.log(controller.getCurrentProject());
      addTask();
    });
  };

  const addTask = () => {
    if (!controller.getCurrentProject()) {
      alert("Warning: Select a project");
      return;
    }

    if (!taskTitle.value) {
      alert("Warning: Enter task title.");
      return;
    }
    if (!taskDeadLine.value) {
      alert("Warning: Select Deadline.");
      return;
    }

    controller.addTask(controller.getCurrentProjectindex(), taskTitle.value, taskDescription.value, taskPriority.value, taskDeadLine.value);
    taskTitle.value = "";
    taskDescription.value = "";
    showTasks();
  };

  const showTasks = () => {
    Object.assign(controller.getCurrentProject(), projectMethods);
    // console.log(controller.getCurrentProject().getTasks());

    const tasks = controller.getCurrentProject().getTasks();

    tasksDiv.innerHTML = "";
    let indexT = 0;
    tasks.forEach((task) => {
      const taskIndex = indexT;
      Object.assign(task, taskMethods);
      console.log(task.getTitle());

      const taskContainer = document.createElement("div");
      taskContainer.classList.add("mb-1", "pl-3");

      const row1 = document.createElement("div");
      row1.classList.add("row");

      const taskCol = document.createElement("div");
      taskCol.classList.add("col-md-9", "border", "rounded");

      const buttonCol = document.createElement("div");
      buttonCol.classList.add("col-md-3", "pl-1", "m-0");

      const deleteBut = document.createElement("button");
      deleteBut.classList.add("btn", "btn-outline-danger", "btn-block");
      deleteBut.textContent = "Delete";
      buttonCol.appendChild(deleteBut);

      deleteBut.addEventListener("click", () => {
        console.log("button pressed");
        controller.deleteTask(controller.getCurrentProjectindex(), taskIndex);
        controller.changeCurrentProject(controller.getCurrentProjectindex());
        showTasks();
      });

      const title = document.createElement("h6");
      title.textContent = `${task.getTitle()}`;
      title.classList.add("m-0");

      const priority = document.createElement("p");
      const priorityVal = task.getPriority();
      priority.textContent = `${priorityVal} priority`;
      priority.classList.add("m-0");

      const deadline = document.createElement("p");
      deadline.textContent = `Due: ${format(parseISO(task.getDeadline()), "dd/MM/yyyy")}`;
      deadline.classList.add("m-0");
      const description = document.createElement("p");
      description.textContent = task.getDescription();

      taskCol.appendChild(title);

      taskCol.appendChild(deadline);
      taskContainer.addEventListener("mouseover", () => {
        taskCol.appendChild(priority);
        taskCol.appendChild(description);
      });
      taskContainer.addEventListener("mouseout", () => {
        taskCol.removeChild(priority);
        taskCol.removeChild(description);
      });
      row1.appendChild(taskCol);
      row1.appendChild(buttonCol);
      taskContainer.appendChild(row1);

      taskContainer.addEventListener("dblclick", () => {
        editTask(task, controller.getCurrentProjectindex(), taskIndex);
      });

      tasksDiv.appendChild(taskContainer);

      indexT++;
    });
  };

  const editTask = (task, indexp, indext) => {
    const title = document.querySelector("#task-title-edit");
    title.value = task.getTitle();
    const description = document.querySelector("#task-description-edit");
    description.value = task.getDescription();
    const priority = document.querySelector("#task-priority-edit");
    priority.value = task.getPriority();
    const deadline = document.querySelector("#task-deadline-edit");
    deadline.value = task.getDeadline();

    const changeTaskBut = document.querySelector("#edit-task-but");
    $("#edit-task-Modal").modal("show");

    changeTaskBut.addEventListener("click", () => {
      controller.editTask(indexp, indext, title.value, description.value, priority.value, deadline.value);
      controller.changeCurrentProject(indexp);
      showTasks();
    });
  };

  const addProject = () => {
    if (projectTitle.value) {
      controller.addProject(projectTitle.value);
      projectDisplay();
      projectTitle.value = "";
    } else {
      alert("Warning: Enter project title.");
    }
  };

  const projectDisplay = () => {
    // get current stored projects and displays them....
    // is called everytime a new project is added, removed, page refresh.

    projectsDiv.innerHTML = "";
    // console.log(controller.getProjects());
    const projects = controller.getProjects();
    projects.forEach((project, index) => {
      // console.log(controller.isStored())
      if (controller.isStored()) {
        Object.assign(project, projectMethods);
      }
      // console.log({project});
      createProjectButton(project.getTitle(), index);
    });
  };

  const createProjectButton = (title, index) => {
    console.log(index);
    const buttonRow = document.createElement("div");
    buttonRow.classList.add("row", "pb-1");

    const projectButtonCol = document.createElement("div");
    projectButtonCol.classList.add("col-8", "pr-0");

    const deleteButCol = document.createElement("div");
    deleteButCol.classList.add("col-4", "pl-1");

    const button = document.createElement("button");
    button.textContent = title;
    button.classList.add("btn", "btn-outline-info", "btn-block", "notCurrent");

    button.addEventListener("click", () => {
      // colours and that:
      button.classList.remove("notCurrent");
      const otherButtons = document.querySelectorAll(".notCurrent");

      otherButtons.forEach((but) => {
        but.classList.remove("btn-info", "current");
        but.classList.add("btn-outline-info");
      });

      button.classList.remove("btn-outline-info");
      button.classList.add("btn-info", "notCurrent");

      // logic:
      controller.changeCurrentProject(index);
      showTasks();
    });

    button.addEventListener("dblclick", () => {
      editProjectTitle(title, index);
    });

    const delButton = document.createElement("button");
    delButton.textContent = "Delete";
    delButton.classList.add("btn", "btn-outline-danger", "btn-block", "deleteButs");

    delButton.addEventListener("click", () => {
      // console.log("Hello");
      projectsDiv.removeChild(buttonRow);
      controller.removeProject(index);
      projectDisplay();
      controller.resetCurrentProject(index);
      tasksDiv.innerHTML = "";
    });

    projectButtonCol.appendChild(button);
    deleteButCol.appendChild(delButton);

    buttonRow.appendChild(projectButtonCol);
    buttonRow.appendChild(deleteButCol);

    projectsDiv.append(buttonRow);
  };

  const editProjectTitle = (title, index) => {
    const newProjectTitle = document.querySelector("#project-title-change");
    newProjectTitle.value = title;
    $("#editProjectModal").modal("show");
    const editProjectBut = document.querySelector("#change-project-but");
    editProjectBut.addEventListener("click", () => {
      controller.editProject(index, newProjectTitle.value);
      projectDisplay();
    });
  };

  return {
    render,
  };
})();

export
{ DOMcontroller };
