import React from "react";
import { useState, useEffect } from "react";
import Axios from "axios";
import { FaQuoteLeft } from "react-icons/fa";

const AdminQuote = () => {
  const [quotesData, setQuotesData] = useState([]);
  const [data1,setdata1]=useState(true)

  const getQuotes = () => {
    Axios.get("http://localhost:3002/getquotes", {}).then((res) => {
      setQuotesData(res.data);
    });
  };
  useEffect(() => {
    getQuotes();
  }, []);


  const [customdata,setCustomdata] = useState([])

  const customquote=(id)=>{
    setdata1(false)
    Axios.post(`http://localhost:3002/getcustondata/${id}`,{
    }).then((res)=>{
      setCustomdata(res.data)
    }).catch((err)=>{
      alert("No data found")
    })
  }
  function cancelbtn(){
    setdata1(true)
  }



  //updatin status in quote table
  const [statusquote,setstatusquote] = useState("")
  const [adminremark,setadminremark] = useState("")

  const submitbtn=(id,email)=>{
    let status1 = ""
    if (statusquote === "Pending"){
      status1 = 0
    }else if(statusquote === "Active"){
      status1 = 1
    }else if(statusquote === "On progress"){
      status1 = 2
    }else if(statusquote === "Closed"){
      status1 = 3
    }

    if (statusquote === "" || adminremark === ""){
      alert("please fill all the fields")
    }
    else{
      Axios.post(`http://localhost:3002/submitcustomdata/${id}`,{
      status1:status1,
      adminremark:adminremark
    }).then((res)=>{
      alert("data inserted Success")
    }).catch((err)=>{
      alert("No data found")
    })

    Axios.post(`http://localhost:3002/sendnotification/${email}`,{
      statusquote:statusquote,
      adminremark:adminremark
    }).then((res)=>{
      alert("data notified Success")
      getQuotes()
      setdata1(true)
    }).catch((err)=>{
      alert("No notified found")
    })

    }

    

  }

  

  return (
    <div className="adminquote-container">
      <div className="admin-container2">
        <div className="adminquote-main">
          <div>
            <FaQuoteLeft className="logo0" />
          </div>
          <div>
            <h5>Quote</h5>Quote list
          </div>
        </div>
        {data1 &&(
        <div className="adminquote-main2">
          <div style={{width:"41px"}} className="quoteCol">ID</div>
          <div  className="quoteCol">NAME</div>
          <div style={{width:"179px"}}  className="quoteCol">EMAIL</div>
          <div className="quoteCol">CONTACT</div>
          <div className="quoteCol">COMPANY</div>
          <div className="quoteCol">STATUS</div>
          <div className="quoteCol">POSTING DATE</div>
          <div className="quoteCol">REMARK</div>
          {quotesData.map((e) => {
            let status = "";
            if (e.status === 0) {
              status = "Pending";
            }else if(e.status === 1){
              status = "Active"
            }else if(e.status ===2){
              status = "On progress"
            }else if(e.status ===3){
              status = "Closed"
            }
            const timestamp = e.posting_date;
            const date = new Date(timestamp);
            const formattedDate = date.toDateString();
            return (
              <>
                <div style={{width:"41px"}}  className="quoteRow">{e.id}</div>
                <div className="quoteRow">{e.name}</div>
                <div   style={{width:"179px"}} className="quoteRow">{e.email}</div>
                <div className="quoteRow">{e.contactno}</div>
                <div className="quoteRow">{e.company}</div>
                <div className="quoteRow">{status}</div>
                <div className="quoteRow">{formattedDate}</div>
                <div className="quoteRow">
                  <span className="open-btn" onClick={()=>customquote(e.id)}>Open</span>
                </div>
              </>
            );
          })}
        </div>
        )}

        {!data1 &&(
        <div className="adminquote-main3">
          {customdata.map((e) => {
            let status1 = "";
            if (e.status === 0) {
              status1 = "Pending";
            }

            const timestamp = e.posting_date;
            const date = new Date(timestamp);
            const formattedDate = date.toDateString();
            return (
              <>
              <div className="data-info1"><h5>Information of ID: {e.id}</h5></div>
              <div className="data-info">
                <ul>
                  <li className="quote-heading">Quote Id</li>
                  <li>{e.id}</li>
                </ul>
              </div>
              <div className="data-info" >
                <ul>
                  <li className="quote-heading">status: <span>{status1}</span></li>
                  <li>update status:<select onChange={(e)=>{setstatusquote(e.target.value)}}>
                                      <option>Active</option>
                                      <option>pending</option>
                                      <option>On progress</option>
                                      <option>Closed</option>
                                    </select></li>
                </ul>
              </div>
              <div className="data-info">
                <ul>
                  <li className="quote-heading">Customer Informaton:</li>
                  <li>Name: {e.name}</li>
                  <li>Contact Number :{e.contactno}</li>
                </ul>
              </div>
              <div className="data-info">
                <ul>
                  <li className="quote-heading">Created On:</li>
                  <li>On:{formattedDate}</li>
                  <li>By:{e.name}</li>
                  <li>To: <span>Coaaps CRM</span></li>
                </ul>
              </div>
              <div className="data-info">
                <ul>
                  <li className="quote-heading">Email</li>
                  <li>{e.email}</li>
                </ul>
              </div>
              <div className="data-info">
                <ul>
                  <li className="quote-heading">Service:</li>
                  <li>service needed:{e.services}</li>
                  <li>Subject:{e.query}</li>
                  <li><textarea onChange={(e)=>{setadminremark(e.target.value)}}></textarea></li>
                  <li><button>Add Remark</button></li>
                </ul>
              </div>
              <div className="quote-heading"><button onClick={()=>submitbtn(e.id,e.email)} >Submit</button></div>
              <div className="quote-heading" onClick={cancelbtn}><button>Cancel</button></div>
              <div>

              </div>
              </>
              
            );
          })}
        </div>
        )}
      </div>
    </div>
  );
};
export default AdminQuote;
