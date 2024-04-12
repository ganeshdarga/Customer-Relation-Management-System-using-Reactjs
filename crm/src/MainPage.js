import React, { useEffect } from 'react'
import './Styles/style.css'
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { FcCustomerSupport } from "react-icons/fc";
import { RxDashboard } from "react-icons/rx";
import { useState } from 'react';
import { FaHome } from "react-icons/fa";
import { FaBell } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { BiTask } from "react-icons/bi";
import { IoIosContacts } from "react-icons/io";
import { GoOrganization } from "react-icons/go";
import { SiGoogleads } from "react-icons/si";
import { FaArrowLeft } from "react-icons/fa";
import { FaIdeal } from "react-icons/fa6";
import { GoProjectSymlink } from "react-icons/go";
import { TbReportSearch } from "react-icons/tb";
import { BsActivity } from "react-icons/bs";
import { LiaBlogSolid } from "react-icons/lia";
import { FaFileInvoiceDollar } from "react-icons/fa6";
import { LuMailSearch } from "react-icons/lu";
import { FaArrowRight } from "react-icons/fa";
import { RiArrowRightSLine } from "react-icons/ri";
import { CgArrowBottomRight } from "react-icons/cg";
import { Link } from 'react-router-dom';
import { TfiMenu } from "react-icons/tfi";
import { RxCross2 } from "react-icons/rx";
import { BsChatRightQuoteFill } from "react-icons/bs";





export const MainPage = ({children}) => {
  const [expand, updateExpanded] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [showDashboardSubItems, setShowDashboardSubItems] = useState(false);
  const [arrow,setArrow]=useState(<RiArrowRightSLine />);
  


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

  // const [viewsidebar,setviewsidebar]=useState(true)

  // function viewside(){
  //   setviewsidebar(true)
  // }
  const [viewsidebar, setViewSidebar] = useState(window.innerWidth > 767);

  useEffect(() => {
    const handleResize = () => {
      setViewSidebar(window.innerWidth > 767);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // localStorage.setItem('active', isActive);
  useEffect(() => {
    localStorage.setItem('active', isActive);
}, [isActive]);

  return (
    
    <>
    <div className={`wrapper ${isActive ? 'active' : ''}`}>
    <div className="top_navbar">
      <div className="logo">
        <a href="#">COAAPS CRMS</a>
      </div>
      <div><TfiMenu className="side-main" onClick={() => setViewSidebar(!viewsidebar)}></TfiMenu></div>
      <div className="top_menu">
        <div className="home_link">
          <Link to="/Dashboard">
          <FaHome />
            <span>Home</span>
          </Link>
        </div>
        <div className="right_info1">
          <div className="icon_wrap">
            <div className="icon">
            <FaBell />
            </div>
          </div>
          <div className="icon_wrap">
            <div className="icon">
            <span onClick={UserLogout} >logout</span>
            </div>
          </div>
        </div>
      </div>
    </div>

   
    <div className="main_body">
    {viewsidebar &&(
      <div className="sidebar_menu">
        <div className="inner__sidebar_menu">
        
          <ul>
          <li className='setview'>
            <h5  onClick={()=>setViewSidebar(false)}>X</h5>
          </li>
         
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
                    <li>
                      <Link to="/Crm">
                        <span className="icon">
                          <i className="fas fa-chevron-right"></i>
                        </span>
                        <span className="list">CRM</span>
                      </Link>
                    </li>
                  </ul>
                )}
            </li>
            <li>
              <Link to="/Tasks" className="active">
              <BiTask  className='icons1' />
                <span className="list">Tasks</span>
              </Link>
            </li>
            {/* <li>
              <div><RxCross2 onClick={()=>setviewsidebar(false)} className='rxcross'></RxCross2></div></li> */}
            <li>
              <Link to="/Dealtickets" className="active">
              <FaIdeal className='icons1' />
                <span className="list">Deals Ticktes</span>
              </Link>
            </li>
            <li>
              <Link to="/Contacts">
              <IoIosContacts  className='icons1' />
                <span className="list">Contact</span>
              </Link>
            </li>
            <li>
              <Link to="/Companies">
              <GoOrganization  className='icons1' />
                <span className="list">Companies</span>
              </Link>
            </li>
            <li>
              <Link to="/Leads">
              <SiGoogleads  className='icons1' />
                <span className="list">Leads</span>
              </Link>
            </li>
            <li>
              <Link to="/Adminquote">
                <BsChatRightQuoteFill   className='icons1'/>
                <span className="list">Quote Requests</span>
              </Link>
            </li>
            <li>
              <Link to="/Projects">
              <GoProjectSymlink   className='icons1'/>
                <span className="list">Projects</span>
              </Link>
            </li>
            <li>
              <Link to="/Activities">
              <BsActivity  className='icons1'/>
                <span className="list">Activities</span>
              </Link>
            </li>
            <li>
              <Link to="/Invoice">
              <FaFileInvoiceDollar  className='icons1'/>
                <span className="list">Invoice</span>
              </Link>
            </li>
            <li>
              <Link to="/Mails">
              <LuMailSearch className='icons1' />
                <span className="list">Mails</span>
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
      )}
       
    </div>
    
   
  </div>
    <main className="child1" style={{marginLeft:leftmargin,width:sidewidth}}  >{children}
    <div className='footerpage1' style={{width:sidewidth}} >Design and Developed by GVRN
    </div>
    </main>
    </>
  )
}
export default MainPage

