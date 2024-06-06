import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [ShowFinished, setShowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])


  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }


  const toggleFinished = (e) => {
    setShowFinished(!ShowFinished)
  }
  


  const handleEdit = (e, id, text) => {
    setTodo(text);
    if (confirm("Press ok to edit") == true) {
      let newTodos = todos.filter(item => {
        return item.id !== id;
      });
      setTodos(newTodos);
      saveToLS()
    }
  }

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    saveToLS()
  }

  const handleDelete = (e, id) => {
    if (confirm("Press ok to delete") == true) {
      let newTodos = todos.filter(item => {
        return item.id !== id;
      });
      setTodos(newTodos);
    }
    saveToLS()
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheck = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLS()
  }


  return (
    <>
      <div className='container flex justify-center '>
        <div className="box border-2 bg-gradient-to-tr from-black to-[#8C16C7]  border-[#810181] text-white w-[90vw] sm:w-[60vw] xl:w-[30vw] h-[90vh] rounded-3xl my-5">

          <div className="header flex justify-center p-4 gap-4">
            <div className="batch"><img width={34} src="ion_logo-vue.svg" alt="" /></div>
            <div className="text-xl font-bold">Managing Todo</div>
          </div>
          <div className="border border-black mx-4"></div>

          <div className="header p-4 mx-2 text-left">
            <div className="batch font-bold">Add Todo</div>
            <div className="input flex ">
              <input onChange={handleChange} value={todo} className=' bg-white/15 bg-b my-4 p-1 px-2 w-[50%] rounded-[5px] ' type="text" placeholder='Enter your text' />
              <button onClick={handleAdd} disabled={todo.length<1} className='Save w-[90px] rounded-[30px] my-auto mx-9 py-2  bg-black'>Save</button>
            </div>
           <input onChange={toggleFinished} type="checkbox" checked={ShowFinished} /><span className='p-3'>Show Finished</span>
            <div className="input flex ">

            </div>

          </div>
          <div className="border  border-black mx-4 "></div>
          <div className='h-[70vh] sm:h-[55vh] overflow-auto scrollbar-hide'>
          {todos.length === 0 && <div>There is no todo to display</div>}
          {todos.map(item => {
            return (ShowFinished || !item.isCompleted) && <div key={item.id} className="todo mx-5 my-3 flex p-3 items-center justify-between">
              <input onClick={handleCheck} name={item.id} type="checkbox" checked={item.isCompleted} id="" />
              <div   className={item.isCompleted ? " px-2 line-through" : " px-2"} >{item.todo}</div>
              <div className="button flex">
                <button onClick={(e) => { handleEdit(e, item.id, item.todo) }} className='w-6 Save  my-auto mx-2py-2  bg-none'><img className='' src="Check.svg" alt="" /></button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className='w-6 Save  my-auto mx-2 py-2  bg-none'><img src="Delete.svg" alt="" /></button>
              </div>
            </div>
          })}
          </div>

        </div>
      </div>
    </>
  )
}

export default App
