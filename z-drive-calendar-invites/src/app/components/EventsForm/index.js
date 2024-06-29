import {useState} from 'react'

import Events from '../Events'

export default function EventForm ({handleEventAdd}) {
    const [titleName, setTitleName] = useState('')
    const [startTime, setStartTime] = useState('')
    const [endTime, setEndTime] = useState('')
    const [day, setDay] = useState('Monday')

    const days = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']

    const validateForm =() => {
        if(titleName && startTime && endTime) {
            return true
        }
    }

    const handleSubmit =(e) => {
        e.preventDefault();
        if(validateForm()){
            handleEventAdd({titleName,startTime,endTime,day})
        }
    }

    const handleEventName = (e) => setTitleName(e.target.value)
    const handleStartTime = (e) => setStartTime(e.target.value)
    const handleEndTime = (e) => setEndTime(e.target.value)
    const handleDay = (e) => setDay(e.target.value)

    return <div>
       <form onSubmit={handleSubmit}>
            <input placeholder='Event Name' type='text' onChange={handleEventName} value={titleName}/>
            <select onChange={handleDay}>{days.map(item=> <option value={item}>{item}</option>)}</select>
            <input placeholder='Start Time' type='time' onChange={handleStartTime} value={startTime}/>
            <input placeholder='End Time' type='time' onChange={handleEndTime} value={endTime}/>
            <button type='submit'>Create Event</button>
       </form>
    </div>
}