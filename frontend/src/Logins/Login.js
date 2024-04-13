import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import './Login.css'
import Axios from 'axios'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FcCustomerSupport } from "react-icons/fc";
import { IoIosEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";
import {  Row, Col } from "react-bootstrap";
import {
  AiFillGithub,
  AiOutlineTwitter,
  AiFillInstagram,
} from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";
import mainbackground from "./Loginimages/mainbackground.jpg"
import crmimage from "./Loginimages/crm.jpg"
import Type from "./Type";
import { TfiMenu } from "react-icons/tfi";
import { RxCross2 } from "react-icons/rx";






const Login = ({children,setAdminpanelData,setUserPanelData}) => {
  const navigate = useNavigate();
  const [main,setMain]=useState(true)
  const [signup,setSignup] = useState(false);
  const [customerlogin,setCustomerLogin] = useState(false)
  const [adminlogin,SetAdminLogin] = useState(false)
  //forget password
  const [forgetpassword,setForgetPassword] = useState(false)
  const [success, setSuccess] = useState("")

  const [adminsignupsuccess, setAdminSignupSuccess] = useState(false);
  const [usersignupsuccess,setUserSignupsuccess]=useState(false)

  //sign up  data
  const [name,setName] = useState("")
  const [email,setEmail]= useState("")
  const [password,setPassword]=useState("")
  const [contactnumber, setContactNumber] = useState("")
  const [showPassword, setShowPassword] = useState(false);
  const [gender,setGender]=useState("")

  //admin login data
  const[adminname,setAdminName]=useState("")
  const[adminpassword,setAdminPassword]=useState("")
  const [loginStatus,setLoginStatus]=useState("")

  //user login data
  const [useremail,setUserEmail] = useState("")
  const [userpassword,setUserPassword] = useState("")
  const [loginuserStatus,setLoginuserStatus]=useState("")




  const passwordRules = [
    { label: 'New password must contain at least 8 characters', fulfilled: false },
    { label: 'Including one uppercase letter', fulfilled: false },
    { label: 'One lowercase letter', fulfilled: false },
    { label: 'One number', fulfilled: false },
    { label: 'And one special character (!@#$%^&*)', fulfilled: false }
  ];

  const [rules, setRules] = useState(passwordRules);

  const handlePasswordChange = (e) => {
    const value = e.target.value;
      setPassword(value);

    const updatedRules = passwordRules.map(rule => ({
      ...rule,
      fulfilled: checkRuleFulfillment(rule, value)
    }));
    setRules(updatedRules);
  };

  const checkRuleFulfillment = (rule, password) => {
    switch (rule.label) {
      case 'New password must contain at least 8 characters':
        return password.length >= 8;
      case 'Including one uppercase letter':
        return /[A-Z]/.test(password);
      case 'One lowercase letter':
        return /[a-z]/.test(password);
      case 'One number':
        return /\d/.test(password);
      case 'And one special character (!@#$%^&*)':
        return /[!@#$%^&*]/.test(password);
      default:
        return false;
    }
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };



    const Signup = (e) => {
      e.preventDefault();
      setCustomerLogin(false)
      SetAdminLogin(false)
      setMain(false)
      setSignup(true); // Set showGanesh to true only if it's currently false
    };

    const CustomerLogin = (e) => {
      e.preventDefault();
      setSignup(false)
      SetAdminLogin(false)
      setMain(false)
      setCustomerLogin(true); // Set showGanesh to true only if it's currently false
    };

    const AdminLogin = (e) => {
      e.preventDefault();
      setSignup(false)
      setCustomerLogin(false)
      setMain(false)
      SetAdminLogin(true); // Set showGanesh to true only if it's currently false
    };

    //Signup purpoese
    const submitSignup = ()=>{
      const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
      if (!passwordRegex.test(password)) {
        alert('New password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&*).');
        return;
      }

      if(name === "" || email === "" || password === "" || contactnumber === "" || gender ===""){
        alert("Please Fill All the Fields")
      }
      else{
      Axios.post("http://localhost:3002/signup",{
            name:name,
            email:email,
            password:password,
            contactnumber:contactnumber,
            gender:gender
        }).then(()=>{
            console.log("Success")
            setSuccess("Signup successfull")
            setUserSignupsuccess(true)
        }).catch((success)=>{
          setSuccess("An success occured while signing up")
          console.success("Sigiup Failed:",success)
        })
      }
    }

    //AdminLogin
    function AdminLogin1(){
      Axios.post('http://localhost:3002/adminLogin',{
      adminname:adminname,
      adminpassword:adminpassword,
      }).then((response)=>{
      // console.log(response);
      if (response.data.message){
          setLoginStatus(response.data.message);
      }else{
          // setLoginStatus(response.data[0].account_number)
          navigate('/Dashboard')
          setAdminpanelData(true)
          setAdminSignupSuccess(true)

      }
    })
    console.log(loginStatus);
  }

//userLogin
  function UserLogin(){
    Axios.post('http://localhost:3002/userLogin',{
    useremail:useremail,
    userpassword:userpassword,
  }).then((response)=>{
  // console.log(response);
      if (response.data.message){
        setLoginuserStatus(response.data.message);
  }else{
      // setLoginStatus(response.data[0].account_number)
      setUserPanelData(true);
      setAdminSignupSuccess(true);
      const userData = {
        userEmail: useremail,};
        navigate('/Dashboard', { state: userData });
        var json_data = JSON.stringify(useremail)
        localStorage.setItem('userData', json_data);
    }
  }) 
  console.log(loginStatus);
  }

  const forgetpass=()=>{
    setForgetPassword(true)
    setSignup(false)
    setCustomerLogin(false)
    SetAdminLogin(false)
    
  }

  const [showSidebar,setshowsidebar]= useState(true)
  


  return (
  <div className='login-main33'>
    {!adminsignupsuccess &&(
      <div className='login12'>
        <Navbar className='login-container' bg="dark" data-bs-theme="dark">
          <Container className='login-main-container'>
            <Navbar.Brand className='login-heading'><FcCustomerSupport width={37} height={30} /> COAAPS CRMS</Navbar.Brand>
            {showSidebar &&(
              <Nav className="me-auto">
                <Nav.Link className='login-nav' onClick={CustomerLogin}>Customer LOGIN</Nav.Link>
                <Nav.Link className='login-nav' onClick={AdminLogin}>Admin LOGIN</Nav.Link>
                <Nav.Link className='login-nav' onClick={Signup}>Signup </Nav.Link>
                <Nav.Link className='login-nav-2' ><TfiMenu  className='login-nav2' onClick={()=>setshowsidebar(false)} width="59px" height= "26px" /> </Nav.Link>
              </Nav>
              )}
          </Container>
        </Navbar>
        {!showSidebar &&(
        <ul className='sidebar'>
               <li><RxCross2 onClick={()=>setshowsidebar(true)} /></li>
               <li><Nav.Link className='login-nav1' onClick={CustomerLogin}>Customer LOGIN</Nav.Link></li>
               <li><Nav.Link className='login-nav1' onClick={AdminLogin}>Admin LOGIN</Nav.Link></li>
               <li><Nav.Link className='login-nav1' onClick={Signup}>Signup </Nav.Link></li>
        </ul>
        )}
       
        {main && (
        <div className='image2-comntainer'>
        <div className='main3-image'>
            <img className='main3' src ={crmimage} alt='crm image'></img>
          </div>
          <div className='main2-text'>
            <h2><Type></Type></h2>
          </div>
        </div>
        )}
        {signup && (
          <>
          <img className='main4' src ={crmimage} alt='crm image'></img>
          <div className='signup1'>
          <h3>Create New Account</h3>
          <p>Get Your Free Coapps Account Now</p>
          <ul>
            Username <span style={{color:"red"}}>*</span>
            <li><input type='text' placeholder='Enter Username' disabled={usersignupsuccess} onChange={(e)=>{setName(e.target.value)}}></input></li>
            Email <span style={{color:"red"}}>*</span>
            <li><input type='email' placeholder='Enter Email' disabled={usersignupsuccess}  onChange={(e)=>{setEmail(e.target.value)}} ></input></li>
            Contact Number
            <li><input type='text' placeholder='Contact Number' disabled={usersignupsuccess}  onChange={(e)=>{setContactNumber(e.target.value)}}></input></li>
            Gender <span style={{color:"red"}}>*</span>
            <li><select disabled={usersignupsuccess}  onChange={(e)=>{setGender(e.target.value)}}>
                  <option>Select Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                </select></li>
            Password <span style={{color:"red"}}>*</span>
            <li><input disabled={usersignupsuccess}  type={showPassword ? 'text' : 'password'} placeholder='Enter Password' value={password} onChange={handlePasswordChange}></input><button className='toggle-button' onClick={togglePasswordVisibility}>{showPassword ? <IoIosEye /> : <IoIosEyeOff />}</button></li>
            <p className='terms-condition'>By registering you agree to the Velzon Terms of Use</p>
                  
            {rules.some(rule => !rule.fulfilled) &&(
                  <ul>
                    <h4>NOTE:</h4>
                    {rules.filter(rule => !rule.fulfilled).map((rule, index) => (
                      <li key={index} style={{ color: rule.fulfilled ? 'green' : 'red' }}>{rule.label}</li>
                    ))}
                  </ul>
                  )}
                  <button onClick={submitSignup}>Submit</button>
                  <li style={{color:"green"}} >{success && <p className="error1">{success}</p>}</li>
                </ul>
              </div>
              </>
            )}
            
            {customerlogin && (
              <>
              <img className='main4' src ={crmimage} alt='crm image'></img>
              <div className='signup1'>
                <h3>CUSTOMER LOGIN</h3>
                <ul>
                  Email <span style={{color:"red"}}>*</span>
                  <li><input placeholder='Enter Email' type='email' onChange={(e)=>{setUserEmail(e.target.value)}} ></input></li>
                  Password <span style={{color:"red"}}>*</span>
                  <li><input  placeholder='Enter Password' type={showPassword ? 'text' : 'password'} onChange={(e)=>{setUserPassword(e.target.value)}}></input><button className='toggle-button' onClick={togglePasswordVisibility}>{showPassword ? <IoIosEye /> : <IoIosEyeOff />}</button></li>
                  <p className='forget-password' onClick={forgetpass}>Forget Password ?</p>
                  <button onClick={UserLogin}>Submit</button>
                  <li><h3 style={{color:"red"}} >{loginuserStatus}</h3></li>
                </ul>
              </div>
              </>
            )}

            {adminlogin && (
              <>
              <img className='main4' src ={crmimage} alt='crm image'></img>
              <div className='signup1'>
                <h3>ADMIN LOGIN</h3>
                <ul>
                  Name <span style={{color:"red"}}>*</span>
                  <li><input placeholder='Enter Name' type='text' onChange={(e)=>{setAdminName(e.target.value)}} ></input></li>
                  Password <span style={{color:"red"}}>*</span>
                  <li><input placeholder='Enter Password' type={showPassword ? 'text' : 'password'} onChange={(e)=>{setAdminPassword(e.target.value)}}></input><button className='toggle-button' onClick={togglePasswordVisibility}>{showPassword ? <IoIosEye /> : <IoIosEyeOff />}</button></li>
                  <button onClick={AdminLogin1}>Submit</button>
                  <li><h3 style={{color:"red"}} >{loginStatus}</h3></li>
                </ul>
              </div>
              </>
            )}

        <Container fluid className="footer">
        <Row>
        <Col md="4" className="footer-copywright">
          <h3>Designed and Developed by VGRN</h3>
        </Col>
        <Col md="4" className="footer-copywright">
          <h3>Copyright © 2024 VGRN</h3>
        </Col>
        <Col md="4" className="footer-body">
          <ul className="footer-icons">
            <li className="social-icons">
              <a
                href="https://github.com/ganeshdarga"
                style={{ color: "white" }}
                target="_blank" 
                rel="noopener noreferrer"
              >
                <AiFillGithub />
              </a>
            </li>
            <li className="social-icons">
              <a
                href="https://www.linkedin.com/in/darga-ganesh-817611197/"
                style={{ color: "white" }}
                target="_blank" 
                rel="noopener noreferrer"
              >
                <FaLinkedinIn />
              </a>
            </li>
            <li className="social-icons">
              <a
                href="https://www.instagram.com/dargaganesh/"
                style={{ color: "white" }}
                target="_blank" 
                rel="noopener noreferrer"
              >
                <AiFillInstagram />
              </a>
            </li>
          </ul>
        </Col>
        </Row>
        </Container>
      
      </div>
      )}
      

      {adminsignupsuccess &&(
      <main className="child2">{children}</main>
    )}

  </div>
  )
}

export default Login