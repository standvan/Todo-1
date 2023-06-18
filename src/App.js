import Todo from "./components/Todo";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import { useState } from "react";
import { nanoid } from "nanoid";

const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed,
};
const FILTER_NAMES = Object.keys(FILTER_MAP);

function App(props) {
  const [filter,setFilter] = useState("All");
  const [tasks,setTasks] = useState(props.tasks);
  const taskList = tasks
  .filter(FILTER_MAP[filter])
  .map(task => {
    return <Todo 
    name={task.name} 
    completed={task.completed} 
    id={task.id} 
    key={task.id} 
    toogleTaskCompleted={toogleTaskCompleted}
    deleteTask={deleteTask} 
    editTask={editTask}
    >    
    </Todo>
  })
  const filterList = FILTER_NAMES.map(name =>{
    return <FilterButton key={name} name={name} isPressed={name===filter} setFilter={setFilter}></FilterButton>
  })
  function addTask(name) {
    const newTask = { id: `todo-${nanoid()}`, name:name, completed: false};
    setTasks([...tasks, newTask]);
  }
  function toogleTaskCompleted(id){
    const updateTasks = tasks.map(task =>{
      if(task.id === id){
        return {...task,completed: !task.completed}
      }
      return task;
    })
    setTasks(updateTasks);
  }
  function deleteTask(id){
    const remaingtask = tasks.filter((task) => task.id !== id);
    setTasks(remaingtask);
  }
  function editTask(id,newName){
    const editedTaskList = tasks.map(task => {
      if(task.id === id){
        return {...task, name: newName};
      }
      return task;
    });
    setTasks(editedTaskList);
  }
  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask}></Form>
      <div className="filters btn-group stack-exception">
        {filterList}
      </div>
      <h2 id="list-heading">{tasks.length} tasks remaining</h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading">
          {taskList}
      </ul>
    </div>
  );
}


export default App;
