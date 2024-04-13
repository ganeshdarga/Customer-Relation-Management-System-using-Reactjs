import React from "react";
import { useState, useEffect } from "react";
import Axios from "axios";
import { SiStatuspal } from "react-icons/si";
import { RiPassPendingLine } from "react-icons/ri";
import { FaIdeal } from "react-icons/fa";

const DealTickets = () => {
  const [closedStatus, SetClosedStatus] = useState("active");

  const [textarea, Settextarea] = useState("");

  const [ticktes, setTickets] = useState([]);
  const tickestlist = () => {
    Axios.get("http://localhost:3002/tickets").then((response) => {
      setTickets(response.data);
    });
  };

  useEffect(() => {
    tickestlist();
  }, []);

  function UpdateStatus(id) {
    Axios.post(`http://localhost:3002/setupdatestatus/${id}`, {
      textarea: textarea,
    })
      .then((res) => {
        tickestlist();
        alert("Ticket Update");
      })
      .catch((error) => {
        console.log(error);
      });
  }
  const ckeckclosedstatus = () => {
    SetClosedStatus("closed");
  };
  const ckeckactivestatus = () => {
    SetClosedStatus("active");
  };

  const filteredTickets = ticktes.filter(
    (ticket) => ticket.status === closedStatus
  );

  return (
    <>
      <div className="tickets-container">
      <div className='company-logo'>
    <div className='company-main'>
    <div><FaIdeal className="logo0" /></div>
    <div style={{marginTop:"19px"}}><h5>Deal Tickets</h5></div>
  </div>
    </div>
        <div className="closed-status1">
          <h4 className="closed-status" onClick={ckeckclosedstatus}>
            Check Closed Deals
          </h4>
          <h4 className="closed-status" onClick={ckeckactivestatus}>
            Check Active Deals
          </h4>
        </div>
        {filteredTickets.length > 0 ? (
          filteredTickets.map((ticket) => {
            const timestamp = ticket.posting_date;
            const date = new Date(timestamp);
            const formattedDate = date.toDateString();

            const timestamp1 = ticket.admin_remark_date;
            const date1 = new Date(timestamp);
            const formattedDate1 = date.toDateString();

            return (
              <div className="tickets-data" key={ticket.id}>
                <ul>
                  <li>
                    Priority:{" "}
                    <span className="container-headings">
                      {ticket.priority}
                    </span>
                  </li>
                  <li>
                    Deal Ticket{" "}
                    <strong style={{ color: "blue" }}>{ticket.id}</strong>{" "}
                    created on  <strong style={{ color: "blue" }}>{formattedDate}</strong>{" "}
                  </li>
                  {closedStatus === "active" ? (
                    <li>
                      Deal Status:{" "}
                      <strong>
                      <span
                        style={{ color: "green" }}
                        className="container-headings"
                      >
                        <SiStatuspal />
                        {ticket.status}{" "}
                      </span>
                      </strong>
                    </li>
                    
                  ) : (
                    <>
                      <li>
                        Deal Status:{" "}
                        <strong>
                        <span
                          style={{ color: "red" }}
                          className="container-headings"
                        >
                          <SiStatuspal />
                          {ticket.status}
                        </span>
                        </strong>
                      </li>
                      <li>
                        Admin-Remark-date:
                        <strong>
                        <span
                          style={{ color: "red" }}
                          className="container-headings"
                        >
                          {formattedDate1}
                        </span>
                        </strong>
                      </li>
                    </>
                  )}
                </ul>
                <h4>Deal Subject:</h4>
                <p>{ticket.ticket}</p>
                {closedStatus === "closed" ? (
                  <></>
                ) : (
                  <>
                    <textarea placeholder="Add Admin Remark"
                      onChange={(e) => Settextarea(e.target.value)}
                    ></textarea>
                    <br></br>
                    <button onClick={() => UpdateStatus(ticket.id)}>
                      update
                    </button>
                  </>
                )}
              </div>
            );
          })
        ) : (
          <div className="no-pending">
            <h2>
              No Pending Active Deals <RiPassPendingLine />
            </h2>
          </div>
        )}
      </div>
    </>
  );
};

export default DealTickets;

{
  /* <>

    <div className='tickets-container'>
    <h3>Home</h3>
    <h4 className='closed-status' onClick={ckeckclosedstatus}>Check Closed Status</h4>
    <h4 className='closed-status' onClick={ckeckactivestatus}>Check Active Status Status</h4>
    {
        ticktes.map((e)=>{
            return(
                <>
                {e.status === closedStatus ? (
                <div className='tickets-data'>
                    <ul>
                        <li>Priority: <span className='container-headings'>{e.prioprity}</span></li>
                        <li>Ticket #{e.id} creataed on {e.posting_date}</li>
                        {closedStatus === "active" ? (
                        <li>Status: <span style={{color:"green"}} className='container-headings'><SiStatuspal />{e.status}</span></li>
                        ):(<li>Status: <span style={{color:"red"}} className='container-headings'><SiStatuspal />{e.status}</span></li>)}
                    </ul>
                    <h4>Ticket Data:</h4>
                    <p>{e.ticket}</p>
                    <textarea onChange={(e)=>{Settextarea(e.target.value)}}></textarea><br></br>
                    <button onClick={()=> UpdateStatus(e.id)}>update</button>
                </div>
                ):(<div></div>)}
                </>
            )
        })
    }
 </div>
    </> */
}
