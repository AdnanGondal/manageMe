

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
        title,description,priority,deadline,
        getTitle,getDescription,getPriority,getDeadline,
        setTitle,setDescription,setPriority,setDeadline
    }

}

let taskMethods = {
    getTitle() {
        return this.title;
    },
    getDescription() {
        return this.description;
    },
    getPriority() {
        return this.priority;
    },
    getDeadline() {
        return this.deadline;
    }
}

const projectFactory = (title)=>{

    let tasks = [];
  
    const setTitle = (title)=>{this.title = title};
    const getTitle = ()=> title;

    const addTask = (task)=>{
        this.tasks.push(task);
    };

    const removeTask = (index)=>{
        this.tasks.splice(index,1)
    }
    const getTasks = ()=> this.tasks;
    return {title,tasks,addTask,setTitle,getTasks,getTitle,removeTask}
}

let projectMethods = {
    getTitle() {
        return this.title;
    } ,
    getTasks() {
        return this.tasks;
    },
    addTask(task){
        this.tasks.push(task);
    },
    removeTask(index){
        this.tasks.splice(index,1)
    }
}



export {
    taskFactory,
    projectFactory,
    projectMethods,
    taskMethods
        }