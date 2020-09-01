import {taskFactory,projectFactory,projectMethods} from "./create.js"
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
        projects[indexp].removeTask(indext);
        storage.storeProjects();
    }

    return{addProject,getProjectsArray,getProjects,removeProject,isStored,
        changeCurrentProject,getCurrentProject,resetCurrentProject,getCurrentProjectindex,
        addTask,deleteTask,
    
    }

})();

export{
    controller
}
