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
import axios from 'axios'
// import CalendarView from '../CalendarView'
import CalendarPopup from '../CalendarPopup'

function TaskView (props) {

  const {tasks, setTasks, getCall, deleteTask, completeTask, doc_id} = props;
  const today = new Date()
  let day = today.getDate();
  let month = today.getMonth() + 1;
  let year = today.getFullYear();
  const [openPop, setOpenPop] = useState(false)
  const [openPop2, setOpenPop2] = useState(true)
  const [taskdData, setTaskData] = useState()
  const [isHover, setIsHover] = useState(false)
  const [regData, setRegData] = useState()
  const { user, logout } = useAuth0()


  const addTask = async (task) => {
  // const [tasks, setTasks] = useState(data)
  // const [tempTask, setTempTask] = useState('');
  const res = await fetch(`https://patientbooking.azurewebsites.net/api/patient/appointment`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },  
    body: JSON.stringify({
      "doctor_id": doc_id,
      "patient_id": null,
      "schedule_date": `${year}-${month}-${day}`,
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

  
  useEffect(() => {
   
    const fetchTasks = async() => {
      const DoctorInfo = await axios.get(`https://patientbooking.azurewebsites.net/api/user/${user.email}`);
      const doctoId = DoctorInfo?.data.data?.doctor_id;
      setRegData(DoctorInfo?.data?.data?.name)
     console.log(regData)

      return DoctorInfo?.data?.data;
    }
    fetchTasks()
  }, [])

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
    <div className='task-view-background'>

      <i className='pi pi-globe' style={{'fontSize': '2em'}}></i>
      <h2 className = 'task-type-header'>{regData?.name !== '' ? regData : 'Doctor View'}</h2>


      <AddTask className='MyDay-AddTask-Container' onAdd = {addTask}/>

      <h5 className='task-subtitle'>All Schedueled Appointments</h5>

      <div className='myDay-tasks'>
      
          {/* {tasks?.length !== 0 ? <h1>{JSON.stringify(tasks)}</h1> : null} */}
          {tasks?.map((i) => !i.is_complete ? <div className='myDay-tasks'> 
          <Appointment key= {i.id} task={ i } onDelete={deleteTask} onCheck={completeTask} opening={opening} /> </div> : null)}
          {/* {tasks?.map((i) => !i.is_completed && i?.is_completed !== null ? <div className='myDay-tasks'> 
          <Appointment key= {i.id} task={ i } onDelete={deleteTask} onCheck={completeTask} opening={opening} /> </div> : null)} */}

        <div className="tasks-panel" style={{marginTop: '100px',padding:'0px 0em',width:'80%'}}>
          <Panel header="Patients Already Seen" toggleable collapsed={true} style={{background:'rgba(255,255,255,0.1)'}}>
            <ScrollPanel style={{width: '100%', height: '300px'}}>
            {/* <Appointment opening={opening} key= {i.id} task={ i } onDelete={deleteTask} onCheck={completeTask} />  */}
              {tasks?.map((i) => i.is_complete && i.is_complete !== null ? <Appointment opening={opening} key= {i.id} task={ i } onDelete={deleteTask} onCheck={completeTask} /> : null)}
            </ScrollPanel>
          
          </Panel>
        </div>
      </div>
      {/* {openPop ? <CustomPopup closeTab={closing} data={taskdData} getCall={getCall}/>: ""} */}

      <Dialog header="Patient Informaion" visible={openPop} style={{ width: '50vw' }} onHide={() => setOpenPop(false)}>
        <CustomPopup tasks={tasks} setTasks={setTasks} closeTab={closing} data={taskdData} getCall={getCall} docID={doc_id} isPatient={false}/>
      </Dialog>
      {/* <Dialog header="Appointment Calendar" visible={openPop2} style={{ width: '50vw' }}>
      <CalendarPopup tasks={tasks} />
      </Dialog> */}
    </div>
  )
}

export default TaskView
