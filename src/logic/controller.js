import {taskFactory,projectFactory,projectMethods} from "./create.js"
import {storage} from "../storage/localStorage"

const controller = (()=>{
   
    let defaultProject = projectFactory("Daily");
    let projects = [defaultProject];
    

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

    return{addProject,getProjectsArray,getProjects,removeProject,isStored}

})();

export{
    controller
}
