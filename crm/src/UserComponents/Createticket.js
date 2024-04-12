import React from 'react'
import { useState } from 'react'
import Axios from 'axios'
import dealimg from './usercom_pictures/deal.jpg'

import { FaIdeal } from "react-icons/fa";


const Createticket = () => {

    const [subject,SetSubject] = useState("")
    const [tasktype,SetTaskType]= useState("")
    const [Prioritys,SetProritys]=useState("")
    const [Discriptions, SetDiscriptions] = useState("")
    const [UserName,SetUserName] = useState("")
    const [Emails,SetEmails] = useState("")


    const SubmitTicket = ()=>{
        Axios.post("http://localhost:3002/submitticket",{
            subject:subject,
            tasktype:tasktype,
            Prioritys:Prioritys,
            Discriptions:Discriptions,
            UserName:UserName,
            Emails:Emails,
        }).then(()=>{
            console.log("Success")
            alert("Ticket Generated Success")
        }).catch((error)=>{
          console.error("Sigiup Failed:",error)
          alert("Faled to send ticket")
        })
    }
    
  return (
    <div>
    <div className='company-logo'>
    <div className='company-main'>
    <div><FaIdeal className="logo0" /></div>
    <div style={{marginTop:"19px"}}><h5>Deal Tickets</h5></div>
  </div>
    </div>
    <div className="create-ticket-container">
            <div className="userform">
            <div className="form">
                <legend className="heading">Create Ticket</legend>
                <ul>
                    <li className="firstname">
                        UserName<input placeholder='Enter User Name' className='fname' type="text" onChange={(e)=>{SetUserName(e.target.value)}}/>
                    </li>
                    <li className="firstname">
                        EMAIL<input placeholder='Enter email' style={{marginLeft:"153px"}} className="pass" type="text" onChange={(e)=>{SetEmails(e.target.value)}} />
                    </li>
                    <li className="firstname">
                        SUBJECT<input placeholder='Enter subject' style={{marginLeft:"133px"}}  className="pass" type="text" onChange={(e)=>{SetSubject(e.target.value)}}/>
                    </li>
                
                    <li className="firstname">
                        TASK TYPE
                        <select style={{marginLeft:"120px"}}  onChange={(e)=>{SetTaskType(e.target.value)}}>
                            <option>Select Task</option>
                            <option>Task1</option>
                            <option>Task2</option>
                            <option>Task3</option>
                            <option>Task4</option>
                        </select>
                    </li>
                    <li className="firstname">
                        PRIORITY
                        <select style={{marginLeft:"126px"}}  onChange={(e)=>{SetProritys(e.target.value)}}>
                            <option>Select Priority</option>
                            <option>Important</option>
                            <option>Urgent</option>
                            <option>Non important</option>
                            <option>Question</option>
                        </select>
                    </li>
                    <li className="firstname">
                        DESCRIPTION
                        <textarea style={{marginLeft:"92px"}}  className="add" rows="4" cols="50" name="form" form="usrform" onChange={(e)=>{SetDiscriptions(e.target.value)}}></textarea>
                       
                    </li>
                    <li className="firstname">
                    <button className="submit" onClick={SubmitTicket}>Submit</button>
                    </li>
                </ul>
            </div>
            <div>
                <img className='dealticket-image' src={dealimg} alt='dealticket image'></img>
            </div>
        </div>
    </div>
    </div>
  )
}

export default Createticket