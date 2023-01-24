/* eslint-disable */
import React, { useEffect, useState } from 'react'
import '../../../Stylings/mainPage.css'
import { FaRegLightbulb } from 'react-icons/fa'
import Tasks from '../tasksFolder/Tasks'
import 'primeicons/primeicons.css'
import CustomPopup from '../../../Reusable/CustomPopup'
import { Dialog } from 'primereact/dialog';


function SearchedTasksView (props) {
    const {searchedResult, tasks, setTasks, getCall, deleteTask, completeTask} = props;
    const [openPop, setOpenPop] = useState(false)
    const [taskdData, setTaskData] = useState()

    const searchedTasks = (taskNames) => {
      if (searchedResult === ''){
        return false
      } 
      return taskNames.includes(searchedResult)
      }

      const closing = () => {
        setOpenPop(false)
      }
    
      const opening = (e) => {
        setTaskData(e)
        setOpenPop(true)
      }
    
  return (

    <div className='task-view-background' style={{backgroundImage: 'linear-gradient(to right top, #7427C1, #833BCA, #872DE1, #884BC4, #AD86D3)'}}>
      <div className="task-view-container">
        <i className='pi pi-search' style={{'fontSize': '2em'}}></i>
        <h2 className = 'task-type-header'>The Searched Results are...</h2>
        {tasks.map((i) => searchedTasks(i.name) ? <Tasks key= {i.id} task={ i } onDelete={deleteTask} onCheck={completeTask} opening={opening}/> : null)}
      </div>
      <Dialog header="Task Editor" visible={openPop} style={{ width: '50vw' }} onHide={() => setOpenPop(false)}>
        {openPop ? <CustomPopup closeTab={closing} data={taskdData} getCall={getCall}/>: ""}
      </Dialog>
    </div>
  )
}

export default SearchedTasksView;
