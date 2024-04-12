
import { useState,useEffect } from 'react'
import Axios from 'axios'
import profile from './profile.jpg'



const Profile = () => {
  const [view1,SetView1] = useState(true)

  //For adding edited data
  const [userName,setUserName]=useState("")
  const [userEmail_id,setUserEmail_ID] = useState("")
  const [useAlterEmail,setUserAlterEmail] = useState("")
  const [userMobile,setUserMobile] = useState("")
  const [UserGender,setUserGender]= useState("")
  const [userAddress,setUserAddress]=useState("")



  var storedData = localStorage.getItem('userData');
  var userEmail = JSON.parse(storedData);

  console.log(userEmail)

  const [profiledata,setProfileData] = useState([])

  const viewProfile=()=>{
    Axios.post('http://localhost:3002/viewprofile',{userEmail:userEmail}).then((response)=>{
        setProfileData(response.data)
    }).catch((err)=>{
      alert("data not found")
    })
}
  useEffect(() => {
    viewProfile();
  }, []);

  const editprofiledata =()=>{
    SetView1(false)
  }
  const canceledit=()=>{
    SetView1(true)
  }

  const submiteditdata = (id)=>{
    
    if (userName === "" || userEmail_id === "" || useAlterEmail === "" || userMobile === "" || UserGender === "" || userAddress === ""){
      alert("pleas fill all the fields")
    }
    else{
      Axios.post(`http://localhost:3002/submiteditdata/${id}`,{
      userName:userName,
      userEmail_id:userEmail_id,
      useAlterEmail:useAlterEmail,
      userMobile:userMobile,
      UserGender:UserGender,
      userAddress:userAddress
    }).then((response)=>{
      SetView1(true)
      viewProfile()
      alert("data updated Success")
  }).catch((err)=>{
    alert("Unable to add data")
  })

    }

  }



  return (
    <div className='profile-main-container'>
      <div className='profile-container'>
        <h3>Your Profile</h3>
        {
          profiledata.map((e)=>{
            return(
              <>
              <div className='profile-main'>
                <img src={profile} alt='Image not Found'></img>
              </div>
              {view1 && (
              <div className='profile-list'>
                <ul>
                  <li>Your Name: <span className= "profile-data" >{e.name}</span> </li>
                  <li>Email_ID:  <span className= "profile-data">{e.email}</span></li>
                  <li>Mobile Number:  <span className= "profile-data">{e.mobile}</span></li>
                  <li>Gender:  <span className= "profile-data">{e.gender}</span></li>
                  <li>Address:  <span className= "profile-data">{e.address}</span></li>
                  <li>Password: <span className= "profile-data">{e.password}</span></li>
                  <button onClick={editprofiledata} >EDIT YOUR DATA</button>
                </ul>
              </div>
              )}
              {!view1 &&(
                      <div className='profile-list'>
                        <p className='profileedit-heading'>Enter Edit Data</p>
                          <ul>
                            
                            <li>Your Name:<input placeholder='Enter Name' style={{marginLeft:"153px"}} type='text' className= "profile-data" onChange={(e)=>{setUserName(e.target.value)}} ></input></li>
                            <li>Email_ID: <input placeholder='Enter Email' style={{marginLeft:"165px"}} type='email'className= "profile-data" onChange={(e)=>{setUserEmail_ID(e.target.value)}}></input></li>
                            <li>Alternate Email Email_ID: <input placeholder='Enter Alternate Email' style={{marginLeft:"13px"}}  type='email'className= "profile-data" onChange={(e)=>{setUserAlterEmail(e.target.value)}}></input></li>
                            <li>Mobile Number: <input type='number' placeholder='Enter Mobile No' style={{marginLeft:"109px"}}  className= "profile-data" onChange={(e)=>{setUserMobile(e.target.value)}}></input></li>
                            <li>Gender: <select style={{marginLeft:"189px"}}  className= "profile-data" onChange={(e)=>{setUserGender(e.target.value)}}>
                                            <option>Select Ganeder</option>
                                            <option>Male</option>
                                            <option>Female</option>
                                        </select></li>
                            <li>Address:  <input type='text' placeholder='Enter Address' style={{marginLeft:"182px"}}  className= "profile-data" onChange={(e)=>{setUserAddress(e.target.value)}}></input></li>
                            <button onClick={()=> submiteditdata(e.id)}>SUBMIT YOUR EDITED DATA</button>
                            <button onClick={canceledit}>Cancel</button>
                          </ul>
                      </div>
              )}
              </>
            )
          })
        }

      </div>
    </div>
  )
}

export default Profile