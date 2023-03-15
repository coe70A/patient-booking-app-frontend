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

import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

function CustomPopup(props) {
    const [displayBasic, setDisplayBasic] = useState(false);
    const [categories, setCategories] = useState([]);
    const GMT = (dateString) => {
        const [fullDate, time] = dateString.split('T');
        const [year, month, date] = fullDate.split('-');
        const [hour, minute] = time.split(':');
        const dateTime = new Date(year, month, date, (hour - 5), minute);
        return dateTime;
    }

    const [edit, setEdit] = useState(true)
    const [patient_id, setpatient_id] = useState(props?.data?.patient_id)
    const [task, setTask] = useState(props?.data?.appointment_name)
    const [desc, setDec] = useState(props?.data?.description)
    const [patientReason, setPatientReason] = useState(props?.data?.description)
    const [priority, setPriority] = useState(props?.data?.priority)
    const [onSave, SetOnSave] = useState(true)
    const [date, setDate] = useState(props?.data?.schedule_date);
    
    const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

    //Declaring date variables 
    let today = new Date();
    let month = today.getMonth();
    let year = today.getFullYear();
    let hour = today.getUTCHours();
    console.log("HOUR" + hour)
    let prevMonth = (month === 0) ? 11 : month - 1;
    let prevYear = (prevMonth === 11) ? year - 1 : year;
    let nextMonth = (month === 11) ? 0 : month + 1;
    let nextYear = (nextMonth === 0) ? year + 1 : year;

    
  useEffect(() => {
    console.log(editorState);
  }, [editorState]);

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

    useEffect(() => {
        console.log(date)
    },[date])

    const updateTask =  async () => {
        const requestOptions = {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            "doctor_id": "b645640e-143c-4c29-907c-516c0d550ce2",    
            "patient_id": "9883219878932",
            "schedule_date": date,
            "appointment_name": task,
            "description": desc,
            "illnesses": categories,
        }
        
        
        
        
        )
      };
      await fetch(`http://localhost:5000/api/doctor/appointment/${props?.data?.id}`, requestOptions)
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
                placeholder="Patient Name" 
                onChange={(event) => setTask(event.target.value)}
                disabled={edit}
            />
        <div style={{display:'flex', flexDirection: "row", justifyContent:'space-between'}}>
            <label> Patient ID: </label>
            <label style={{marginTop: '12px'}}> {patient_id} </label>
        </div>

        <label> Status: </label>
        <div class="p-inputgroup">
            <span className="p-inputgroup-addon">
                <i className="pi pi-check-circle"></i>
            </span>
            <ToggleButton checked={props?.data?.is_completed} onLabel="Completed" offLabel="In Progress" onIcon="pi pi-check" offIcon="pi pi-times" aria-label="Confirmation" disabled={true}/>
        </div>

        <label>Date:</label>
        <div class="p-inputgroup">
            <Calendar value={date ? new Date(date) : date => GMT(date)} onChange={(e) => setDate(e.value)} showTime hourFormat="12" disabled={edit} showIcon />
            {/* <Calendar id="icon" value={date ? new Date(date) : null} onChange={(e) => setDate(e.value)} disabled={edit} showIcon /> */}
        </div>

        <label>Diseases</label>
        <div className="p-inputgroup">
            <Chips value={categories} onChange={(e) => setCategories(e.value)} disabled={edit}/>
        </div>


        <label> Patients Reason for visit</label>
        <div className="description">
            <div >
                <InputTextarea 
                type='text'
                value={patientReason}
                name='descreption'
                cols={60}
                onChange={(event) => setDec(event.target.value)}
                disabled={true}/>
            </div>
        </div>

        <label> Doctors Notes </label>
        <div style={{ border: "1px solid black", padding: '2px', minHeight: '400px' }}>
        <Editor
          editorState={editorState}
          onEditorStateChange={setEditorState}
          disabled={true}/>
        
      </div>
    
       
        
        <div>
            <Button className='p-button-outlined p-button-secondary' disabled={onSave} style={onSave ? {color: 'grey'} : {color: 'blue'}} onClick={updateTask}> Save  </Button>
            <Button className='p-button-outlined p-button-danger' onClick={() => setEdit(!edit)}> {edit? "Edit" : "Close" }  </Button>
        </div>
    </div>
  )
}

export default CustomPopup
