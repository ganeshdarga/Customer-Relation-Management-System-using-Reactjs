import React from 'react'

import { RxDashboard } from "react-icons/rx";
import { useState,useEffect } from 'react';
import { FaHome } from "react-icons/fa";
import { FaBell } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { FaArrowLeft } from "react-icons/fa";
import { TbReportSearch } from "react-icons/tb";
import { FaFileInvoiceDollar } from "react-icons/fa6";
import { RiArrowRightSLine } from "react-icons/ri";
import { CgArrowBottomRight } from "react-icons/cg";
import { Link } from 'react-router-dom';
import { IoTicketSharp } from "react-icons/io5";
import { IoIosCreate } from "react-icons/io";
import { RiProfileFill } from "react-icons/ri";
import { CgPassword } from "react-icons/cg";
import { FaQuoteLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'
import Axios from "axios";



export const UserPanel = ({children}) => {
    const navigate = useNavigate();
   
  const [expand, updateExpanded] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [showDashboardSubItems, setShowDashboardSubItems] = useState(false);
  const [arrow,setArrow]=useState(<RiArrowRightSLine />);

  var storedData = localStorage.getItem('userData');
  var userEmail = JSON.parse(storedData);


  const [sidewidth,setsidewidth]=useState("1028px")
  const [leftmargin,setleftmargin]=useState("251px")
  const toggleSidebar = () => {
    setIsActive(!isActive);
  };
  useEffect(() => {
    if (isActive) {
        setsidewidth("1165px");
        setleftmargin("100px");
    } else {
        setsidewidth("1028px");
        setleftmargin("251px");
    }
}, [!isActive]);

  const toggleDashboardSubItems = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowDashboardSubItems(!showDashboardSubItems);
    setArrow(showDashboardSubItems ? <RiArrowRightSLine /> : <CgArrowBottomRight />);
  };

  const UserLogout =()=>{
    window.location.href = '/Login';
  }

  const [notificatiobn,setnotification] = useState(false)
  function cancel(){
    setnotification(false)
  }

  const [notification1,setNotification1]=useState([])

  const getnotification = ()=>{
    Axios.post('http://localhost:3002/getNotification',{userEmail:userEmail}).then((response)=>{
      setNotification1(response.data)
    }).catch((err)=>{
      alert("data not found")
    })
  }
  useEffect(()=>{
    getnotification()
  },[])

  const changestatus =(id)=>{
    Axios.post(`http://localhost:3002/changestatus/${id}`,{
    }).then((res)=>{
      getnotification()
    })

  }

  const zeroCount = notification1.filter(item => item.status === 0).length;
  console.log(zeroCount)
  console.log(notification1)




  return (
    
    <>
    <div className={`wrapper ${isActive ? 'active' : ''}`}>
    <div className="top_navbar">
      <div className="logo">
        <a href="#">COAAPS CRMS</a>
      </div>
      <div className="top_menu">
        <div className="home_link">
          <a to="/Mainpage">
          <FaHome />
            <span>Users Dashboard</span>
          </a>
        </div>
        <div className="right_info">
        <div className="icon_wrap">
            <div className="icon">
            <span>{userEmail}</span>
            </div>
          </div>
          <div className="icon_wrap">
            <div className="icon">
            <FaBell onClick={()=>{setnotification(true)}} /><p className='icon-p'>{zeroCount}</p>
            </div>

          </div>
          <div className="icon_wrap">
            <div className="icon">
            <span onClick={UserLogout} >logout</span>
            </div>
          </div>
          <div className='icon-notification'>
            
          {notificatiobn &&(
          <p className='notification-p' onClick={cancel}>X</p>)}
          {notificatiobn &&(
              notification1.map((e)=>{
                let x = 1
                let remarks =""
                if (e.status === 0){
                  remarks = e.remark
                  x = 0
                }else{
                  x =1
                }
                return(
                <>
                
                {remarks !=="" &&(
                  <div>
                    <p className='notification-p' onClick={()=>{changestatus(e.id)}} >{remarks}</p>
                    <p className='notification-p' onClick={()=>{changestatus(e.id)}} >Your Quote request in <span style={{backgroundColor:"blue"}}>{e.statusdata}</span></p>
                  </div>
                )}
                </>
              )})
            )}
            </div>
          
        </div>
      </div>
    </div>

    <div className="main_body">
      <div className="sidebar_menu">
        <div className="inner__sidebar_menu">
          <ul>
            <li>
              <a  className="active" onClick={toggleDashboardSubItems}>
                <RxDashboard  className='icons1'/>
                <span className="list">Dashboard</span><span>{arrow}</span>
              </a>
              {showDashboardSubItems && (
                  <ul>
                    <li>
                      <Link to="/Dashboard">
                        <span className="icon">
                          <i className="fas fa-chevron-right"></i>
                        </span>
                        <span className="list">Dashboard1</span>
                      </Link>
                    </li>
                  </ul>
                )}
            </li>
            <li>
              <Link to="/Quoterequest" className="active">
              <FaQuoteLeft className='icons1' />
                <span className="list">Request a Quote</span>
              </Link>
            </li>
            <li>
              <Link to="/Createticket">
              <IoTicketSharp className='icons1' />
                <span className="list">Create Ticket</span>
              </Link>
            </li>
            <li>
              <Link to="/Viewtickets">
              <IoIosCreate  className='icons1'/>
                <span className="list">View Tickets</span>
              </Link>
            </li>
            <li>
              <Link to="/Profile">
              <RiProfileFill className='icons1'/>
                <span className="list">Profile</span>
              </Link>
            </li>
            <li>
              <Link to="/Changepassword">
              <CgPassword className='icons1'/>
                <span className="list">Change Password</span>
              </Link>
            </li>
            <li>
              <Link to="/Invoice">
              <FaFileInvoiceDollar  className='icons1'/>
                <span className="list">Invoice</span>
              </Link>
            </li>
          </ul>
          <div className="hamburger" onClick={toggleSidebar}>
            <div className="inner_hamburger">
            <FaArrowLeft className='slidearrow' />
            </div>
          </div>
        </div>
      </div>
      

    </div>
  </div>
    <main className="child1" style={{marginLeft:leftmargin,width:sidewidth}} >{children}
    <div className='footerpage1' style={{width:sidewidth}} >Design and Developed by GVRN
    </div></main>
    </>
  )
}
export default UserPanel
