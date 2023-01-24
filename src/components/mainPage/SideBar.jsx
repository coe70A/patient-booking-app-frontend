/* eslint-disable */
import React, { useState } from 'react'

import { useEffect } from 'react'
import { ListBox } from 'primereact/listbox';
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons
import '../../Stylings/sideBar.css'
function SideBar (props) {
  const [options, setOptions] = useState({ all: false, completed: false, calendarView: false })

  const [test, setTest] = useState(true);

  const [selectedTaskView, setSelectedTaskView] = useState(null);

  const tasks = [
    { name: 'All', code: 'all' , icon: 'pi-globe'},
    { name: 'Completed', code: 'completed', icon: 'pi-check-circle' },
    { name: 'Today', code: 'today' , icon: 'pi-sun'},
    { name: 'Calendar', code: 'calendarView', icon: 'pi-calendar' }
  ];

  const taskTemplate = (option) => {
    return (
        <div className="country-item">
            <i className={`pi ${option.icon}`}></i>
            <div> {option.name}</div>
        </div>
    );
}

  const selectedView = (searchedTask) => {
    if (searchedTask){
      setSelectedTaskView(null)
      console.log(selectedTaskView)
      return selectedTaskView
  } else{
    return selectedTaskView
  }
  }

  return (
    <div className='SideBar-containier'>
      <div className='pi pi-bolt'> Tasks </div>

 

      <ListBox value={selectedView} options={tasks} onChange={(e) => { setSelectedTaskView(e.value); props.changeOpt(e.value.code)} } itemTemplate={taskTemplate} optionLabel="name" style={{margin: '20px 0px',height: '100%', width: '100%'}}/>


      {/* <div className = { props.options?.all ? 'navbar-container-selected' : 'navbar-container' } style={{marginTop: '0.3rem'}}>
      <button className='navbar' onClick={() => props.changeOpt('all')}> All</button>
      </div>

      <div className = { props.options?.completed ? 'navbar-container-selected' : 'navbar-container' } >
      <button className='navbar' onClick={() => props.changeOpt('completed')}>Completed</button>
      </div> */}
    </div>
  )
}

function changeTaskView(task){
  // Set selected listbox option
  setSelectedTaskView(task);

  //  Set option for main view
  props.changeOpt(task.code);

}

export default SideBar
