/* eslint-disable */
import React, { useEffect, useState } from 'react'
import 'primeicons/primeicons.css'
import '../../../Stylings/mainPage.css'
import CustomPopup from '../../../Reusable/CustomPopup'
import { Dialog } from 'primereact/dialog';
import { FaRegLightbulb } from 'react-icons/fa'
import Tasks from '../tasksFolder/Tasks'


function CompletedView (props) {
  const {tasks, setTasks, getCall, deleteTask, completeTask} = props;
  const [openPop, setOpenPop] = useState(false)
  const [taskdData, setTaskData] = useState()

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
        <h2 className = 'task-type-header'>Completed</h2>
        {tasks.map((i) => i.is_completed && i.is_completed !== null ? <Tasks key= {i.id} task={ i } onDelete={deleteTask} onCheck={completeTask} opening={opening} /> : null)}
      </div>

      
      <Dialog header="Task Editor" visible={openPop} style={{ width: '50vw' }} onHide={() => setOpenPop(false)}>
        <CustomPopup closeTab={closing} data={taskdData} getCall={getCall}/>
      </Dialog>
    </div>
  )
}

export default CompletedView
