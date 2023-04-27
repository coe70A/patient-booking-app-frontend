/* eslint-disable */
import '../../Stylings/mainPage.css'
import 'primeicons/primeicons.css'
import { FaRegLightbulb } from 'react-icons/fa'
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useState, useEffect } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { useAuth0 } from '@auth0/auth0-react'

import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Card } from 'primereact/card';



const locales = {
  "en-US": require("date-fns/locale/en-US")
}
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});



function CalendarView(props){
  const {tasks, setTasks, wether, setWether} = props;
  const { user } = useAuth0()
  console.log(tasks)
  

  const fetchTasks = async() => {
    const tasksResp = await fetch(`https://patientbooking.azurewebsites.net/api/tasks/user/${user.email}`);
    return tasksResp;
  }

  useEffect(() => {
    console.log("in use Effect")
    fetchTasks()
    .then(resp => resp.json())
    .then(data => setTasks(data))
    .catch(err => console.log(err))
  }, [])

// jason's version end: new Date(task.schedule_date)

  const events = tasks.map(({created_on, duration, schedule_date, ...item}) => {
    const startDate = new Date(Date.parse(schedule_date))
    let endDate = new Date(Date.parse(schedule_date))
    if(duration) {

      const currentMinutes = startDate.getMinutes();
      
      const newMinutes = currentMinutes + duration;
      endDate.setMinutes(newMinutes);

    }

    return ({start: startDate,
             end: endDate,
             ...item})
            })

    return(
      <div className='task-view-background' style={{backgroundImage: 'linear-gradient(to right top, #00e4ff, #00cdfc, #00b6f5, #2b9ee8, #4f85d5)',width:'auto', alignItems:'center'}}>
        
        
        <div className="task-view-container">
          <i className='pi pi-calendar' style={{'fontSize': '2em'}}></i>
          <h2 className = 'task-type-header'>Calendar View</h2>
        </div>

        <Calendar localizer={localizer} events={events} 
        startAccessor="start" endAccessor="end" titleAccessor="appointment_name" allDayAccessor="is_completed" style={{height: "600px", margin:"50px", width:"90%",color:'black' ,background: 'white', border:'solid white',padding:'20px',borderRadius:'2%', boxShadow: '-1px 16px 39px -15px rgba(0,0,0,0.67)'}} />
      </div>    
      )
}

export default CalendarView