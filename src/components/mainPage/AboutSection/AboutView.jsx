/* eslint-disable */
import React, { useEffect, useState } from 'react'
import 'primeicons/primeicons.css'
import '../../../Stylings/mainPage.css'
import CustomPopup from '../../../Reusable/CustomPopup'
import { Dialog } from 'primereact/dialog';
import { FaRegLightbulb } from 'react-icons/fa'
import DoctorInfo from '../../registration/DoctorInfo';
import { useAuth0 } from '@auth0/auth0-react'
function AboutView (props) {
  const {tasks, setTasks, getCall, deleteTask, completeTask} = props;
  const [openPop, setOpenPop] = useState(false)
  const [taskdData, setTaskData] = useState()
  const { user, logout } = useAuth0()
    const closing = () => {
      setOpenPop(false)
    }
  
    const opening = (e) => {
      setTaskData(e)
      setOpenPop(true)
    }

    
  return (

    <div className='task-view-background' style={{backgroundImage: 'linear-gradient(to right top, #347a2d, #4b962f, #66b22c, #85cf25, #a8eb12)'}}>
      <div className="task-view-container">
        <i className='pi pi-check' style={{'fontSize': '2em'}}></i>
        <h2 className = 'task-type-header'>About</h2>
        
      </div>

      <DoctorInfo doctorSignUp={true} user={user} css_style={"about_container"}/>
      {/* <Dialog header="Patient Information" visible={openPop} style={{ width: '50vw' }} onHide={() => setOpenPop(false)}>
        <CustomPopup closeTab={closing} data={taskdData} getCall={getCall}/>
      </Dialog> */}
    </div>
  )
}

export default AboutView
