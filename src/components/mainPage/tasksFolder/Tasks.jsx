/* eslint-disable */
import React, { useState, useEffect } from 'react'
import '../../../Stylings/tasks.css'
import emailjs from 'emailjs-com'
import propTypes from 'prop-types'
import { RiDeleteBinLine } from 'react-icons/ri'
import 'primeicons/primeicons.css';
import { Chip } from 'primereact/chip'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { Chips } from 'primereact/chips';
import { Checkbox } from 'primereact/checkbox';

function Tasks ({ task, onDelete, onCheck, opening }) {
  const [checked, setChecked] = useState(false)
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setCategories([])
    if(categories?.length !== task?.categories?.length){
      task?.categories?.map((i) => setCategories(oldarr => [...oldarr, `${i} `]) && console.log(i))
        
    }
},[] )
  function handleCheckbox () {
    console.log(checked)
    setChecked(!task?.is_completed)
    if (task?.is_completed) {
      onCheck(task.id, false)
    emailjs.send('service_1wxbzng', 'template_9pix7kh', tempTask, 'BWIC0zbpY90OqAlQk')
    .then((response) => {
      console.log('Email Notification Sent!', response.status, response.text);
    })
    .catch((err) => {
      console.log('FAILED...', err);
    });
    } else {
      onCheck(task.id, true)
    }

    
  }

  const taskScheduleDate = new Date(Date.parse(task.schedule_date))

  const taskTemplate = (option) => {
    return (

        <div className="inline-task-container" >


          <div style={{height:'100%'}} onClick={(event) =>  event.stopPropagation() } >
            <Checkbox style={{width:'50px',height:'100%'}} onChange={(event)=>  handleCheckbox() } checked={task?.is_completed}></Checkbox>
          </div>

          <span className="task-name-container">
            {task.name}
            {!task?.is_completed && <p className='pi pi-calendar' style={{color:"grey", fontSize:"10px"}}> {task.schedule_date?.slice(0,10)} </p>}
            {task?.is_completed && <p className='pi pi-calendar' style={{color:"grey", fontSize:"10px", textDecoration: "line-through" }}> {task.schedule_date?.slice(0,10)} </p>}
          </span>

          <Chips style={{border:'none'}} value={categories} onChange={(e) => setCategories(e.value)} disabled={true}/>

          <div style={{width:"100px"}}>
            <Button className='p-button-rounded p-button-outlined' style={{zIndex:"9000"}} icon='pi pi-trash' onClick={(event) =>    {onDelete(task.id); event.stopPropagation() }} >          
            </Button>
          </div>
        </div>
    );
}


  return (
    <Chip style={{padding:'1em', width: '80%', justifyContent: 'space-evenly', background: 'white', margin: '1em 0',cursor:'pointer'}} onClick={() => opening(task)} template={taskTemplate} />
    // <div className='myDay-tasks-container'>

      
      
    //   <div className='myDay-task'>
    //     <span><input type='checkbox' checked={task?.status} onChange={handleCheckbox}></input></span>
    //     {task.task}

    //     <span>

    //       <button className='deleteTask-button' onClick={() => onDelete(task.id)}>

    //         <RiDeleteBinLine />

    //       </button>

    //     </span>

    //   </div>

    // </div>
  )
}

Tasks.defaultProps = {
  task: 'test'
}

Tasks.propTypes = {
  task: propTypes.any,
  id: propTypes.any,
  onDelete: propTypes.any,
  onCheck: propTypes.any
}

export default Tasks
