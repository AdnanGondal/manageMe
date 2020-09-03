import {controller} from "../logic/controller.js";


const storage = (()=>{

    let storeProjects = ()=>{
        localStorage.setItem("projects",JSON.stringify(controller.getProjectsArray()));
    };

    let getProjects = ()=>{
        if (!localStorage.getItem("projects")) return controller.getProjectsArray();
        else return JSON.parse(localStorage.getItem("projects"));
    };

    let getStored = ()=> localStorage.getItem("projects") ? true : false;

    return {
        storeProjects,getProjects,getStored
    };

})();

export {storage};