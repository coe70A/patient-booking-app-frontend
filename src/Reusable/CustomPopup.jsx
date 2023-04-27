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


import { Slider } from 'primereact/slider';
        
import { PrimeIcons } from 'primereact/api';

import { Message } from 'primereact/message';
        

import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";

import { Dialog } from 'primereact/dialog';


import CalendarPopup from '../components/mainPage/CalendarPopup'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

function CustomPopup(props) {

    const {tasks, setTasks} = props
   
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
    const [ohip, setOhip] = useState(props?.data?.patient_id)

    const [duration, setDuration] = useState();
    const [isError, setIsError] = useState(false)


  const [openPop, setOpenPop] = useState(false)

    const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

//   setDuration(10);

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
        console.log("POROPS>DATA")
        console.log(props?.data)
        const cat = props?.data?.illnesses?.split(',')
        if(categories?.length !== cat){
            cat?.map((i) => setCategories(oldarr => [...oldarr, i]) && console.log(i))
            
        }
    },[] )

    useEffect(() => {
        if(task !== props?.data?.name || desc !== props?.data?.desc || priority !== props?.data?.priority){
            SetOnSave(false)
        }
    }, [task, desc, priority])

    useEffect(() => {
        console.log(patient_id)
    },[patient_id])

    const updateTask =  async () => {
        console.log("Inside !!!!")
        const requestOptions = {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            "doctor_id": props?.doc_id,    
            "schedule_date": date,
            "patient_id": patient_id,
            "appointment_name": task,
            "description": desc,
            "illnesses": categories,
            "duration": duration
        }
        
        
        
        
        )
      };
        // try {

            const apiResp = await fetch(`https://patientbooking.azurewebsites.net/api/doctor/appointment/${props?.data?.id}`, requestOptions)

            console.log("RESPPPP")
            console.log(apiResp)
            console.log("JS")
            const resp = await apiResp?.json()
            console.log(resp)
            if(resp?.error === 'no valid timeslot'){
                setIsError(true)
            } else {
                props.getCall()

            }
            //.then(response => response.json())
            // .catch(err => {console.log("WE GOT ERROR"); console.log(err)})
        // } catch(err) {
        //     console.log("WE GOT A ERROR")
        //     setIsError(true)
        // }
          //setTasks([...tasks, {is_completed: isComplete}])
        
      }


      const closing = () => {
        setOpenPop(false)
      }
    
      const opening = (e) => {
        // setTaskData(e)
        setOpenPop(true)
      }
    
      const [value2, setValue2] = useState(50);
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
        <label> Patient OHIP Number: </label> 
        <div class="p-inputgroup">
            <InputText 
                id="Patient ID"
                value={patient_id} 
                type="text" 
                className="p-inputtext-lg block" 
                onChange={(event) => setpatient_id(event.target.value)}
                disabled={edit || props.isPatient}
            />
        </div>

        <label> Status: </label>
        <div class="p-inputgroup">
            <span className="p-inputgroup-addon">
                <i className="pi pi-check-circle"></i>
            </span>
            <ToggleButton checked={props?.data?.is_completed} onLabel="Completed" offLabel="In Progress" onIcon="pi pi-check" offIcon="pi pi-times" aria-label="Confirmation" disabled={true}/>
        </div>

        
        <label>Appointment Calendar:</label>
        <div class="p-inputgroup">
            <i className="pi pi-calendar" onClick={() => setOpenPop(true)} style={{ fontSize: '30px', fontWeight:'50', color:'#919191', cursor:'pointer' }}></i>
        </div>
        <Dialog header="Appointment Calendar" visible={openPop} style={{position:'absolute', top:'15%', width: '60vw'}} onHide={() => setOpenPop(false)}>
            <CalendarPopup setTasks={setTasks} tasks={tasks} />
        </Dialog>
        <label>Date:</label>
        <div class="p-inputgroup">
            <Calendar value={date ? new Date(date) : date => GMT(date)} onChange={(e) => setDate(e.value)} showTime hourFormat="12" disabled={edit} showIcon />
            {/* <Calendar id="icon" value={date ? new Date(date) : null} onChange={(e) => setDate(e.value)} disabled={edit} showIcon /> */}
        </div>
        <label>Duration: {duration}</label>
        {/* <Slider value={value2} onChange={(e) => setValue2(e.value)} /> */}
        <Slider  style={{marginTop:'10px', marginBottom: '30px'}} value={duration} onChange={(e) => setDuration(e.value)} className="w-14rem mb-8" step={10}/>

        {isError ? 
        <Message severity="error" text="Invalid timeslot. Check the appointment calendar for a valid appointment time" /> : null
        }
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
