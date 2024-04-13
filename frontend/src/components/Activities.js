import React from 'react'


import ganesh from './adminimages/ganesh.jpg'
import ravi from './adminimages/ravi.jpg';
import vasanthi from './adminimages/vasanthi.jpg'
import  { useEffect, useState } from 'react'
import Axios from 'axios'
import { FaIdeal } from "react-icons/fa";
import { LuActivitySquare } from "react-icons/lu";


const Activities = () => {
  const [view,setView]=useState(false)
  const [edit,setEdit]=useState(false)
  const [activities,setactivities]=useState([])
  const [addDate,setAdddate]=useState("")
  const [addDay,setDay]=useState("")
  const [addStarttime,setStarttime]=useState("")
  const [addEndtime,setEndtime]=useState("")
  const [addDis,setDis]=useState("")
  const getactivities = ()=>{
    Axios.get("http://localhost:3002/getactivities",{
    }).then((res)=>{
      setactivities(res.data)
    })
  }
  useEffect(() => {
    getactivities();
  }, []); 

  const addAct =()=>{
    setView(true)
    setEdit(false)
  }
  const cancelAdd=()=>{
    setView(false)
    setEdit(false)
    setdelete1(false)
  }
  const addActivitys =()=>{
    Axios.post("http://localhost:3002/addactivity",{
      addDate:addDate,
      addDay:addDay,
      addStarttime:addStarttime,
      addEndtime:addEndtime,
      addDis:addDis
    }).then((res)=>{
      alert("data addedd Success")
      getactivities()
      setView(false)
    }).catch((err)=>{
      alert("error occured")
    })
  }

  const [delete1,setdelete1]=useState(false);
  const [deleteId,setDeleteId]=useState("")
  const deletedata = (id)=>{
    setDeleteId(id)
    setdelete1(true)
  }
 
  const submitdeletedata = (id)=>{
    Axios.delete("http://localhost:3002/deteteactivitydata",{data:{deleteId:deleteId}
    }).then((res)=>{
      alert("Successfully deleted")
      getactivities()
      setdelete1(false)

    })
  }

  const [id,setId]=useState("")
  const editdata=(e)=>{
    setId(e)
    setEdit(true)
    setView(false)
  }

  const submiteditdata = ()=>{
    if (addDate === "" || addDay === "" || addStarttime === "" || addEndtime === "" || addDis === "" ){
      alert("pleas fill all the fields")
    }
    else{
      Axios.post(`http://localhost:3002/subactivityedit/${id}`,{
        addDate:addDate,
        addDay:addDay,
        addStarttime:addStarttime,
        addEndtime:addEndtime,
        addDis:addDis
    }).then((response)=>{
      getactivities()
      alert("data updated Success")
      setEdit(false)
  }).catch((err)=>{
    alert("Unable to add data")
  })

    }

  }
  return (
    <div className='Activities-Main-container'>
      <div className='company-logo'>
    <div className='company-main'>
    <div><LuActivitySquare  className="logo0" /></div>
    <div style={{marginTop:"19px"}}><h5>Activities</h5></div>
  </div>
    </div>
      
      <div className='h3-main'>
        <h3 onClick={addAct}>Add Activity</h3>
      </div>
      
      {view &&(
        <>
        
      <div className='Activity-add'>
        <div className='heading-add'>
          <h6>Add Activities</h6>
        </div>
        <div className='Activity-date'>
          Enter Activity Date<input type='date' onChange={(e)=>{setAdddate(e.target.value)}}></input>
        </div>
        <div className='Activity-day'>
          Enter Activity Days<select onChange={(e)=>{setDay(e.target.value)}}>
            <option>Select Day</option>
            <option>Mon</option>
            <option>Tue</option>
            <option>Web</option>
            <option>Thu</option>
            <option>Fri</option>
            <option>Sat</option>
          </select>
        </div>
        <div className='Activity-start-time'>
          Enter Start Time <input type='time' onChange={(e)=>{setStarttime(e.target.value)}}></input>
        </div>
        <div className='Activity-end-time'>
          Enter End Time <input type='time' onChange={(e)=>{setEndtime(e.target.value)}}></input>
        </div>
        <div className='Activity-discription'>
          Enter Discription of Activity<textarea onChange={(e)=>{setDis(e.target.value)}}></textarea>
        </div>
        <button className='activity-submit' onClick={addActivitys}>Submit</button>
        <button  className='activity-cancel' onClick={cancelAdd}>Cancel</button>
      </div>
      </>
      )}

      {edit &&(
        <>
      <div className='Activity-add'>
      <div className='heading-add'>
          <h6>Edit Activities</h6>
        </div>
        <div className='Activity-date'>
          Enter Activity Date<input type='date' onChange={(e)=>{setAdddate(e.target.value)}}></input>
        </div>
        <div className='Activity-day'>
          Enter Activity Days<select onChange={(e)=>{setDay(e.target.value)}}>
            <option>Select Day</option>
            <option>Mon</option>
            <option>Tue</option>
            <option>Web</option>
            <option>Thu</option>
            <option>Fri</option>
            <option>Sat</option>
          </select>
        </div>
        <div className='Activity-start-time'>
          Enter Start Time <input type='time' onChange={(e)=>{setStarttime(e.target.value)}}></input>
        </div>
        <div className='Activity-end-time'>
          Enter End Time <input type='time' onChange={(e)=>{setEndtime(e.target.value)}}></input>
        </div>
        <div className='Activity-discription'>
          Enter Discription of Activity<textarea onChange={(e)=>{setDis(e.target.value)}}></textarea>
        </div>
        <button className='activity-submit' onClick={submiteditdata}>Submit</button>
        <button  className='activity-cancel' onClick={cancelAdd}>Cancel</button>
      </div>
      </>
      )}
      {delete1 &&(
        <div className='company-add2'>
        <h5>Are you shure want to delete</h5>
        <div className='company-add-main2'>
          <div><button onClick={submitdeletedata}>Yes</button></div>
          <div><button className='cancel-btn2' onClick={cancelAdd}>cancel</button></div>
        </div>
      </div>
      )}

      <div className='Activities-container'>
        <h4>UPCOMMING ACTIVITIES</h4>
        <hr></hr>
        <div className='Activities-main'>
              {
                activities.map((e)=>{
                  console.log(e.dates)
                  const day = e.dates.substring(8, 10);
                  const starttime = e.starttime.substring(0, 5);
                  const endtime = e.endtime.substring(0,5)
                  return(
                    <>
                    <div className='Activity-col1'>
                      <h5>{day}</h5>{e.days}
                      </div>
                      <div className='Activity-col2'>
                        <h5>{starttime} - {endtime}</h5>{e.Discription}
                      </div>
                      <div className='Activity-col3'>
                        <div className='Activity-col3-img'>
                            <div><img src={ganesh} alt='ganesh'></img></div>
                            <div><img src={vasanthi} alt='ganesh'></img></div>
                            <div><img src={ravi} alt='ganesh'></img></div>
                        </div>
                      </div>
                      <div className='Activity-col4'>
                          <button className='edit' onClick={()=>editdata(e.id)}>Edit</button>
                          <button className='delete' onClick={()=>deletedata(e.id)}>delete</button>
                        </div>
                    </>
                  )
                })
              }
        </div>
      </div>
    </div>
  )
}

export default Activities