import Todo from "./components/Todo.jsx"
import Form from "./components/Form.jsx"
import FilterButton from "./components/FilterButton.jsx"
import {useState} from "react"
import {nanoid} from "nanoid"

const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed 
}

const FILTER_NAMES = Object.keys(FILTER_MAP)

function App  (props) {

  const [tasks, setTasks] = useState(props.tasks)

    const [filter, setFilter] = useState("All")
  function addTask(name){
    const newTask = {id: `todo-${nanoid()}`, name, completed:false}; 
    setTasks([...tasks, newTask])
  }


  const taskList = tasks.filter(FILTER_MAP[filter]).map((task) => (
    <Todo id={task.id} 
    name ={task.name} 
    completed={task.completed} 
    key={task.id} 
    toggleTaskCompleted={toggleTaskCompleted}
    deleteTask = {deleteTask}
    editTask = {editTask}/>
  ));

  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton key={name} 
    name={name} isPressed={name === filter}
    setFilter={setFilter}/> 
  ))
  
  const tasksNoun = taskList.length == 1? "task" : "tasks";  
  const headingText = taskList.length == 0? "No Scheduled Tasks" : `${taskList.length} ${tasksNoun} remaining`; 
  
  function toggleTaskCompleted(id){
    const updatedTasks = tasks.map((task) => {
      if (id === task.id){
        return {...task, completed: !task.completed}
      }
      return task; 
    });
    setTasks(updatedTasks)
  }

  function deleteTask(id){
    const remainingTasks = tasks.filter((task) => id !== task.id);
    setTasks(remainingTasks) 
    } 
  
    function editTask(id, newName){
        const editedTaskList = tasks.map((task) => {
          if (id == task.id){
            return {...task, name: newName}
          }
          return task
        });
        setTasks(editedTaskList)
    }
  
  

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask} />
    <div className="flex justify-evenly">{filterList}</div>

      <h2 className="text-center" id="list-heading">{headingText}</h2>
      <ul role="list" className="todo-list stack-large stack-exception" aria-labelledby="list-heading">
        {taskList}
      </ul>
    </div>
  );
}

export default App;