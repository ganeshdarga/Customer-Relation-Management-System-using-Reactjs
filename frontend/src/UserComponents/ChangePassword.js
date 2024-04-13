import React, { useState } from 'react'
import Axios from 'axios'

const ChangePassword = () => {
  const [currentpassword,setCurrentPassword] = useState("")
  const [newpassword,setNewPassword]=useState("")

  var storedData = localStorage.getItem('userData');
  var userEmail = JSON.parse(storedData);

  console.log(userEmail)

    // Define password rules
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
      setNewPassword(value);
  
      // Update rule fulfillment status based on new password value
      const updatedRules = passwordRules.map(rule => ({
        ...rule,
        fulfilled: checkRuleFulfillment(rule, value)
      }));
      setRules(updatedRules);
    };
  
    const checkRuleFulfillment = (rule, newPassword) => {
      switch (rule.label) {
        case 'New password must contain at least 8 characters':
          return newPassword.length >= 8;
        case 'Including one uppercase letter':
          return /[A-Z]/.test(newPassword);
        case 'One lowercase letter':
          return /[a-z]/.test(newPassword);
        case 'One number':
          return /\d/.test(newPassword);
        case 'And one special character (!@#$%^&*)':
          return /[!@#$%^&*]/.test(newPassword);
        default:
          return false;
      }
    };

  const submitpassword =()=>{
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;

    if (!passwordRegex.test(newpassword)) {
      alert(
        'New password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&*).'
      );
      return;
    }

    Axios.post('http://localhost:3002/setpassword',{
      userEmail:userEmail,
      currentpassword:currentpassword,
      newpassword:newpassword
    }).then((response)=>{
      alert("Password Changed")
  }).catch((err)=>{
    alert("Enter correct Current Password")
  })

  }
  return (
    <div className='changepassword-container'>
      <div className='password-container'>
        <h3>Change Password</h3>
        <ul>
          <li>Enter Your Current Password<input className='current-password' placeholder='Enter current password' onChange={(e)=>{setCurrentPassword(e.target.value)}} ></input></li>
          {/* <li>Enter New Password<input className='new-password' placeholder='Enter new password' onChange={(e)=>{setNewPassword(e.target.value)}}></input></li> */}
          <li>Enter New Password<input className='new-password' placeholder='Enter new password' value={newpassword} onChange={handlePasswordChange}></input></li>
          <button onClick={submitpassword} >SUBMIT</button>
        </ul>
        {rules.some(rule => !rule.fulfilled) &&(
        <div>
        <ul>
            <h4>NOTE:</h4>
            {rules.filter(rule => !rule.fulfilled).map((rule, index) => (
              <li key={index} style={{ color: rule.fulfilled ? 'green' : 'red' }}>{rule.label}</li>
            ))}
        </ul>
      </div>
      )}
      </div>


    </div>
  )
}

export default ChangePassword