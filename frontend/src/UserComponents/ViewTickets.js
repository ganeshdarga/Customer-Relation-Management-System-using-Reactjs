import React from 'react'
import { useState,useEffect } from 'react'
import Axios from 'axios'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import profile from './usercom_pictures/profile.jpg'
import admin from './usercom_pictures/admin.jpg'

const ViewTickets = () => {


  var storedData = localStorage.getItem('userData');
  var userEmail = JSON.parse(storedData);

  const [ticktes1,setTickets1]=useState([])


  useEffect(() => {
    const tickestlist=()=>{
      Axios.post('http://localhost:3002/viewticket',{userEmail:userEmail}).then((response)=>{
          setTickets1(response.data)
      }).catch((err)=>{
        alert("data not found")
      })
  }
    tickestlist();
  }, [userEmail]);


  return (
    <div className='view-ticket-container'>
      <div className='view-ticket'>
        <h3>View Your Tickest</h3>
        {
          ticktes1.map((e)=>{
            const timestamp1 = e.posting_date;
            const date1 = new Date(timestamp1);
            const formattedDate1 = date1.toDateString();

            const admintime = e.admin_remark_date;
            const date2 = new Date(admintime);
            const formattedDate2 = date2.toDateString();
            return(
              <>
                <Card className="text-center">
                  <Card.Header>SUBJECT:{e.subject}</Card.Header>
                    <Card.Body>
                      <Card.Title>Ticket_ID:<span style={{color:"blue"}}>{e.id}</span></Card.Title>
                      <Card.Title>Ticket Created on:<span style={{color:"blue"}}>{formattedDate1}</span></Card.Title>
                      <div className='profilecontainer3'>
                        <img src={profile} alt='admin' width={"2px"} height={"5px"}></img>
                        <ul>
                          <li>Ticket Discription: <span className="ticket-data" >{e.ticket}</span></li>
                          <li>Proririty: <span className="ticket-data"  >{e.prioprity}</span></li>
                          <li>Task Type: <span className="ticket-data" >{e.task_type}</span></li>
                        </ul>
                      </div>
                      <div className='profilecontainer3'>
                        <img src={admin} alt='admin' width={"2px"} height={"5px"}></img>
                        <ul>
                          <li>Admin Remark: <span className="ticket-data" >{e.admin_remark}</span></li>
                          <li>Admin Remark Date: <span className="ticket-data"  >{formattedDate2}</span></li>
                        </ul>
                      </div>
                   </Card.Body>
              </Card>
              </>
            )
          })
        }

      </div>
    </div>
  )
}

export default ViewTickets



// <div className='view-ticket-container'>
// <div className='view-ticket'>
//   <h3>View Your Tickest</h3>
//   {
//     ticktes1.map((e)=>{
//       return(
//         <div className='view-ticket1'>
//           <ul>
//             <li>Ticket_ID:<span className="ticket-data">{e.ticket_id}</span></li>
//             <li>Email_ID: <span className="ticket-data">{e.email_id}</span></li>
//             <li>Subject:<span className="ticket-data">{e.subject}</span></li>
//             <li>Task Type: <span className="ticket-data">{e.task_type}</span></li>
//             <li>Proririty: <span className="ticket-data">{e.prioprity}</span></li>
//             <li>Ticket Discription: <span className="ticket-data">{e.ticket}</span></li>
//             <li>Status: <span className="ticket-data">{e.status}</span></li>
//             <li>Admin Remark :<span className="ticket-data">{e.admin_remark}</span></li>
//             <li>Posting Date:<span className="ticket-data"></span>{e.posting_date}</li>
//             <li>Admin Remark Date:<span className="ticket-data">{e.admin_remark_date}</span></li>
//           </ul>
//         </div>
//       )
//     })
//   }

// </div>
// </div>


{/* <div className='view-ticket1'>
                <ul>
                  <li>Subject:<span style={{marginLeft:"3px"}}>{e.subject}</span></li>
                  <li>Created On :<span style={{marginLeft:"3px",color:"black"}}></span>{e.posting_date}</li>
                  <li>Status: <span style={{marginLeft:"3px",color:"black"}}>{e.status}</span></li>
                  <li>Ticket_ID:<span className="ticket-data">{e.ticket_id}</span></li>
                  <li>Ticket Discription: <span className="ticket-data">{e.ticket}</span></li>
                  <li>Task Type: <span className="ticket-data">{e.task_type}</span></li>
                  <li>Proririty: <span className="ticket-data">{e.prioprity}</span></li>
              
              
                 
                </ul>
  
                <ul>
                  <li>Admin Remark :<span className="ticket-data">{e.admin_remark}</span></li>
                  <li>Admin Remark Date:<span className="ticket-data">{e.admin_remark_date}</span></li>
                </ul>
              </div> */}