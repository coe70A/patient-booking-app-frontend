/* eslint-disable */
import React, { useState, useEffect } from 'react'
import { FaRegLightbulb } from 'react-icons/fa'
import Appointment from './Appointment'
import AddTask from './AddTask'
import 'primeicons/primeicons.css'
import '../../../Stylings/mainPage.css'
import CustomPopup from '../../../Reusable/CustomPopup'
import { Chip } from 'primereact/chip';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button'
import { Panel } from 'primereact/panel';
import { User } from '@auth0/auth0-react'
import { useAuth0 } from '@auth0/auth0-react'
import { ScrollPanel } from 'primereact/scrollpanel';
import { Dialog } from 'primereact/dialog';

function TaskView (props) {

  const {tasks, allTasks, setTasks, getCall, deleteTask, completeTask, doc_id, patientInfo} = props;
  const today = new Date()
  let day = today.getDate();
  let month = today.getMonth() + 1;
  let year = today.getFullYear();
  const [openPop, setOpenPop] = useState(false)
  const [taskdData, setTaskData] = useState()
  const [isHover, setIsHover] = useState(false)
  const { user, logout } = useAuth0()
  useEffect(() => {
    console.log("HIIII")
    console.log(props.patientInfo)
  })

  const addTask = async (task) => {
  // const [tasks, setTasks] = useState(data)
  // const [tempTask, setTempTask] = useState('');
  const res = await fetch(`http://localhost:5000/api/patient/appointment`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },  
    body: JSON.stringify({
      "doctor_id": doc_id,
      "patient_id": props.patientInfo?.data?.ohip_number,
      "schedule_date": null,
      "appointment_name": task,
      "description": "this is just a routine checkup"
    })
  })
    const data = await res.json()
    .catch(err => console.log(err))
    console.log(data?.code)
    if(data?.code.toString() === '200'){
      console.log("inside")
      getCall()
    }
    getCall()
  }

  const closing = () => {
    setOpenPop(false)
  }

  const opening = (e) => {
    setTaskData(e)
    setOpenPop(true)
  }

  const taskTemplate = (option) => {
    return (
        <div className="inline-task-container" >
          <Button icon="pi pi-check" className="p-button-rounded p-button-outlined p-button-success" aria-label="User" />
        </div>
    );
  }


  return (
    <div className='task-view-background-pg2'>

      <i className='pi pi-globe' style={{'fontSize': '2em'}}></i>
      <h2 className = 'task-type-header'>Patient Info</h2>


      <AddTask className='MyDay-AddTask-Container' onAdd = {addTask}/>

      <h5 className='task-subtitle'>{user.email} Appointments</h5>

      <div className='myDay-tasks'>
      
          {/* {tasks?.length !== 0 ? <h1>{JSON.stringify(tasks)}</h1> : null} */}
          {tasks?.map((i) => true ? <div className='myDay-tasks'> 
          <Appointment key= {i.id} task={ i } onDelete={deleteTask} onCheck={completeTask} opening={opening} /> </div> : null)}
        

        <div className="tasks-panel" style={{marginTop: '100px',padding:'0px 0em',width:'80%'}}>
          
        </div>
      </div>
      {/* {openPop ? <CustomPopup closeTab={closing} data={taskdData} getCall={getCall}/>: ""} */}

      <Dialog header="Patient Information" visible={openPop} style={{ width: '50vw' }} onHide={() => setOpenPop(false)}>
        <CustomPopup tasks={allTasks} setTasks={setTasks} closeTab={closing} data={taskdData} getCall={getCall} docID={doc_id} ohip={props.patientInfo?.data?.ohip_number} isPatient={true}/>
      </Dialog>
    </div>
  )
}

export default TaskView
