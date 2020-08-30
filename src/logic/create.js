

const taskFactory = (title,description,priority,deadline)=>{
    const getTitle = ()=> title;
    const getDescription = ()=> description;
    const getPriority = ()=> priority;
    const getDeadline = ()=> deadline;

    const setTitle = (title)=>{this.title = title}
    const setDescription = (description)=>{this.description = description}
    const setPriority = (priority)=>{this.priority = priority}
    const setDeadline = (deadline)=>{this.deadline = deadline}

    return{
        getTitle,getDescription,getPriority,getDeadline,
        setTitle,setDescription,setPriority,setDeadline
    }

}

const projectFactory = (title)=>{

    let tasks = [];
  

    const setTitle = (title)=>{this.title = title};
    const getTitle = ()=> title;

    const addTask = (todo)=>{
        this.toDos.push(todo);
    };

    const getTasks = ()=> this.tasks;
    return {title,addTask,setTitle,getTasks,getTitle}
}

let projectMethods = {
    getTitle() {
        return this.title;
    } 
}



export {
    taskFactory,
    projectFactory,
    projectMethods,
        }