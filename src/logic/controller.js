import {taskFactory,projectFactory} from "./create.js"

const controller = (()=>{
    let defaultProject = projectFactory("Daily")
    
    let projects = [defaultProject];

    const addProject = (title)=>{
        let project = projectFactory(title)
        projects.push(project);
    }

    const getProjects = ()=> projects;

    return{addProject,getProjects}

})();

export{
    controller
}
