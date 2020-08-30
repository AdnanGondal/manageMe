import {taskFactory,projectFactory} from "./create.js"
import {storage} from "../storage/localStorage"

const controller = (()=>{
   
    let defaultProject = projectFactory("Daily")
    let projects = [defaultProject]
    

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

   
    const getProjects = ()=>{
        return storage.getProjects();
    }

    return{addProject,getProjectsArray,getProjects}

})();

export{
    controller
}
