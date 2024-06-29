import {useState, useEffect} from 'react'

import Events from '../Events'
import EventsForm from '../EventsForm'

import './style.css'

export default function Calendar () {
    const [events, setEvents] = useState([])
    const [showEventForm,setShowEventForm] = useState(false)

    const handleCreateEvent = () => {
        setShowEventForm(!showEventForm)
    }

    const handleEventAdd = (newEvent) => {
        setShowEventForm(!showEventForm)
        setEvents([...events,newEvent])
        localStorage.setItem('events', JSON.stringify([...events,newEvent]))
    }

    const days = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']
    const hours =  Array.from({length:24},( _, i)=>`${String(i).padStart(2,'0')} : 00`)

    const segrgateEvents = (timeSlot, day) => {
        return events.filter(event =>  event.day === day && ( String(event.startTime).substring(0,2) === String(timeSlot).substring(0,2) || String(event.endTime).substring(0,2) === String(timeSlot).substring(0,2)) )
    }

    useEffect(()=>{
        setEvents(JSON.parse(localStorage.getItem('events')) || [])
    },[])


    return <div>
        <button className='bg-sky-600 text-white px-4 py-2' onClick={handleCreateEvent}>Create</button>
        {showEventForm && <EventsForm handleEventAdd={handleEventAdd}/>}
        <div>
            <div>
                <div>GMT-05 (time stamp)</div>
                <div className='flex'>{days.map(item => <div className='m-2'>{item}</div>)}</div>
            </div>
            <div>
                {hours.map(timeSlot =><div>
                    <div>{timeSlot}</div>
                    <div className='flex m-2'>
                        {days.map(day=> <div>
                            {segrgateEvents(timeSlot,day).map(event => <Events event={event}/>)}
                        </div>)}
                    </div>
                </div>)}
            </div>
        </div>
    </div>
}