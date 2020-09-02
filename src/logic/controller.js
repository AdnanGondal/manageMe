import {taskFactory,projectFactory,projectMethods,taskMethods} from "./create.js"
import {storage} from "../storage/localStorage"

const controller = (()=>{
   
    let defaultProject = projectFactory("Daily");
    let projects = [defaultProject];
    let currentProject = false;
    let projectIndex = null;
    

    const addProject = (title)=>{

        projects = storage.getProjects();
        let project = projectFactory(title);
        projects.push(project);
        storage.storeProjects();

    }

    const getProjectsArray = ()=> {
        //projects = storage.getProjects();
        return projects;
    }

    const removeProject = (index)=>{
        projects = storage.getProjects();
        projects.splice(index,1);
        console.log(projects);   
        storage.storeProjects();
    }

    const isStored = ()=>{
        return storage.getStored();
    }
   
    const getProjects = ()=>{  
        return storage.getProjects();
    }

    const editProject = (index,title)=>{
        projects[index].setTitle(title);
        storage.storeProjects();
    }

    const changeCurrentProject = (index)=>{
        projects = storage.getProjects();
        currentProject = projects[index];
        projectIndex = index;
    }

    const getCurrentProject = ()=> currentProject;
    const getCurrentProjectindex = ()=> projectIndex;

    const resetCurrentProject = ()=>{
        currentProject = false;
        projectIndex = null;
    }

    

    const addTask = (index,title,description,priority,deadline)=>{
        let task = taskFactory(title,description,priority,deadline);
        Object.assign(projects[index],projectMethods);
        projects[index].addTask(task);
        console.log(projects[index]);
        storage.storeProjects();
        
    }

    const deleteTask = (indexp,indext)=>{
        projects = storage.getProjects();
        Object.assign(projects[indexp],projectMethods);
        projects[indexp].removeTask(indext);
        storage.storeProjects();
    }
    
    const editTask = (indexp,indext,title,description,priority,deadline)=>{
        projects = storage.getProjects();
        Object.assign(projects[indexp],projectMethods);
        let task = projects[indexp].getTasks()[indext];
        Object.assign(task,taskMethods);
        task.setTitle(title);
        task.setDescription(description);
        task.setPriority(priority);
        task.setDeadline(deadline);

        storage.storeProjects();
    }

    return{addProject,getProjectsArray,getProjects,removeProject,editProject,isStored,
        changeCurrentProject,getCurrentProject,resetCurrentProject,getCurrentProjectindex,
        addTask,deleteTask,editTask,
    
    }

})();

export{
    controller
}
