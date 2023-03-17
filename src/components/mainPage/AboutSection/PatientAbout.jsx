/* eslint-disable */
import React, { useEffect, useState } from 'react'
import 'primeicons/primeicons.css'
import '../../../Stylings/mainPage.css'
import CustomPopup from '../../../Reusable/CustomPopup'

import { useAuth0 } from '@auth0/auth0-react'
import PatientInfo from '../../registration/PatientInfo';
function PatientAbout (props) {
  const {tasks, setTasks, getCall, deleteTask, completeTask} = props;
  const [openPop, setOpenPop] = useState(false)
  const [taskdData, setTaskData] = useState()
  const [regData, setRegData] = useState({})
  const [tmp, setTmp] = useState(false)
  
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

      <PatientInfo userSignUp={true} user={user} css_style={"doc_about_container"} reg_Data={setRegData}/>
    </div>
  )
}

export default PatientAbout
