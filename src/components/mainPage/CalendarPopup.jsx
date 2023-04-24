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



function CalendarPopup(props){
  const {tasks, setTasks, wether, setWether} = props;
  const { user } = useAuth0()
  console.log(tasks)
  

  const fetchTasks = async() => {
    const tasksResp = await fetch(`http://localhost:5000/api/tasks/user/${user.email}`);
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

  const events = tasks.map(({created_on, schedule_date, ...item}) => {
    return ({start: new Date(Date.parse(schedule_date)),
             end: new Date(Date.parse(schedule_date)),
             ...item})
            })

    return(
        <Calendar localizer={localizer} events={events} 
        startAccessor="start" endAccessor="end" titleAccessor="appointment_name" allDayAccessor="is_completed" style={{height: "600px",color:'black' ,background: 'white', border:'solid white'}} />
 
      )
}

export default CalendarPopup