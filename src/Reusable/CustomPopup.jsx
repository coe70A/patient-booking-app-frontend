/* eslint-disable */
import React from 'react'
import { useEffect, useState } from 'react'
import './CustomPopup.css'
import Dropdown from 'react-bootstrap/Dropdown'
import { Calendar } from 'primereact/calendar'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea';
import { ToggleButton } from 'primereact/togglebutton';
import { Button } from 'primereact/button'
import { Chips } from 'primereact/chips';
import 'primereact/resources/themes/tailwind-light/theme.css'    

function CustomPopup(props) {
    const [displayBasic, setDisplayBasic] = useState(false);
    const [categories, setCategories] = useState([]);
    
    const [edit, setEdit] = useState(true)
    const [id, setId] = useState(props?.data?.id)
    const [task, setTask] = useState(props?.data?.name)
    const [desc, setDec] = useState(props?.data?.description)
    const [priority, setPriority] = useState(props?.data?.priority)
    const [onSave, SetOnSave] = useState(true)
    const [date, setDate] = useState(props?.data?.schedule_date);
    
    //Declaring date variables 
    let today = new Date();
    let month = today.getMonth();
    let year = today.getFullYear();
    let prevMonth = (month === 0) ? 11 : month - 1;
    let prevYear = (prevMonth === 11) ? year - 1 : year;
    let nextMonth = (month === 11) ? 0 : month + 1;
    let nextYear = (nextMonth === 0) ? year + 1 : year;

    useEffect(() => {
        setCategories([])
        if(categories?.length !== props?.data?.categories?.length){
            props?.data?.categories?.map((i) => setCategories(oldarr => [...oldarr, i]) && console.log(i))
            
        }
    },[] )

    useEffect(() => {
        if(task !== props?.data?.name || desc !== props?.data?.desc || priority !== props?.data?.priority){
            SetOnSave(false)
        }
    }, [task, desc, priority])

    const updateTask =  async () => {
        const requestOptions = {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: task,
            description: desc,
            priority: priority,
            schedule_date: date,
            categories: categories

          })
      };
      await fetch(`http://localhost:5000/api/tasks/${props?.data?.id}`, requestOptions)
          //.then(response => response.json())
          .catch(err => console.log(err))
          props.getCall()
          //setTasks([...tasks, {is_completed: isComplete}])
        
      }

  return (
    <div id="task-editor-container" >
     
            <InputText 
                id="title"
                value={task} 
                type="text" 
                className="p-inputtext-lg block" 
                placeholder="Task Name" 
                onChange={(event) => setTask(event.target.value)}
                disabled={edit}
            />

        <label> Priority: </label>
        <div class="p-inputgroup">
            <span className="p-inputgroup-addon">
                <i className="pi pi-sort-amount-up"></i>
            </span>
            <Dropdown style={{ left: '0%', marginRight: '2rem' }} >
                <Dropdown.Toggle variant="success" id="dropdown-basic" style={{borderColor: 'transparent' }} disabled={edit}>
                    {priority}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item onClick={ () => setPriority(1)}> 1 </Dropdown.Item>
                    <Dropdown.Item onClick={ () => setPriority(2)}> 2 </Dropdown.Item>
                    <Dropdown.Item onClick={ () => setPriority(3)}> 3 </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>

        <label> Status: </label>
        <div class="p-inputgroup">
            <span className="p-inputgroup-addon">
                <i className="pi pi-check-circle"></i>
            </span>
            <ToggleButton checked={props?.data?.is_completed} onLabel="Completed" offLabel="Incomplete" onIcon="pi pi-check" offIcon="pi pi-times" aria-label="Confirmation" disabled={true}/>
        </div>

        <label>Date:</label>
        <div class="p-inputgroup">
            <Calendar id="icon" value={date ? new Date(date) : null} onChange={(e) => setDate(e.value)} disabled={edit} showIcon />
        </div>

        <label>Categories</label>
        <div className="p-inputgroup">
            <Chips value={categories} onChange={(e) => setCategories(e.value)} disabled={edit}/>
        </div>

        <label> Description </label>
        <div className="description">
            <div >
                <InputTextarea 
                type='text'
                value={desc}
                name='descreption'
                cols={60}
                onChange={(event) => setDec(event.target.value)}
                disabled={edit}/>
            </div>
        </div>
        
        <div>
            <Button className='p-button-outlined p-button-secondary' disabled={onSave} style={onSave ? {color: 'grey'} : {color: 'blue'}} onClick={updateTask}> Save  </Button>
            <Button className='p-button-outlined p-button-danger' onClick={() => setEdit(!edit)}> {edit? "Edit" : "Close" }  </Button>
        </div>
    </div>
  )
}

export default CustomPopup
