import React from 'react'

import  { useEffect, useState } from 'react'
import Axios from 'axios'

import { FaEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { BiTask } from "react-icons/bi";
import ganesh from './ganesh.jpg'
import ravi from './ravi.jpg';
import vasanthi from './vasanthi.jpg'






const Tasks = () => {

  const [addtask,setaddtask] =useState(false)
  const [edit,setEdit]=useState(false)

  const [taskdata,settaskdata]=useState([])

  const gettasks = ()=>{
    Axios.get("http://localhost:3002/gettaskdata",{
    }).then((res)=>{
      settaskdata(res.data)
    })
  }

  useEffect(()=>{
    gettasks();
  },[])

  const addtasks=()=>{
    setaddtask(true)
    setEdit(false)
  }
  const cancelbtn = ()=>{
    setaddtask(false)
    setEdit(false)
    setdelete1(false)
  }
  
  //adding company
  const [taskname,settaskname]=useState("")
  const [deadline,setdeadline]=useState("")
  const [taskstatus,settaskstatus]=useState("")
  const [taskassignee,settaskassignee]=useState("")

  

  const addtaskdata=()=>{
    if( taskname === "" || deadline ==="" || taskstatus === "" || taskassignee ===""){
      alert("please fill all the fields")
    }
    else{
      Axios.post("http://localhost:3002/addtask",{
        taskname:taskname,
        deadline:deadline,
        taskstatus:taskstatus,
        taskassignee:taskassignee,
      }).then((res)=>{
        alert("Task Added Success")
        gettasks()
        setaddtask(false)
      }).catch((err)=>{
        alert("unable to add task")
      })
    }
  }
  
  //deelete company
  const [delete1,setdelete1] = useState(false)
  const [Id1,setId1]=useState("")


  const deletedata = (id)=>{
    setId1(id)
    setdelete1(true)
  }

  const submitdeletedata1 = (id)=>{
    Axios.delete("http://localhost:3002/detetetaskdata",{data:{Id1:Id1
    }}).then((res)=>{
      alert("Successfully deleted")
      gettasks()
      setdelete1(false)
    })
  }
  // edit companies
  const [id,setId]=useState("")
  const editdata=(e)=>{
    setId(e)
    setEdit(true)
    setaddtask(false)
  }

  const submiteditdata = ()=>{
    if (taskname === "" || deadline === "" || taskstatus === "" || taskassignee === ""){
      alert("please fill all the fields")
    }
    else{
      Axios.post(`http://localhost:3002/subtaskedit/${id}`,{
        taskname:taskname,
        deadline:deadline,
        taskstatus:taskstatus,
        taskassignee:taskassignee,
    }).then((response)=>{
      gettasks()
      alert("task updated Success")
      setEdit(false)
  }).catch((err)=>{
    alert("Unable to update task")
  })
    }

  }


  return (
    <div className='companies-container'>
      <div className='company-logo'>
        <div className='company-main'>
          <div><BiTask  className="logo0" /></div>
          <div><h5>Tasks</h5>Tasks list</div>
        </div>
        <div className='company-main2'>
          <h5>Task Details</h5>
          <hr></hr>
          <button onClick={addtasks}>Add New Tasks</button>
        </div>
        <div className='company-main3'>
          <div className='task-names'>Task Name</div>
          <div className='task-names'  style={{width:"146px"}}>Deadline</div>
          <div className='task-names'>Status</div>
          <div className='task-names'  style={{width:"220px"}}>Assignee</div>
          <div className='task-names'>Action</div>
          {
            taskdata.map((e)=>{
              console.log(e.status)
              var color1 = e.status === "Pending" ? "green" : "red";

              let name= ""

              if (e.Asignee === "dargaganesh63@gmail.com"){
                name = ganesh
              }else if (e.Asignee === "Vasanthi@gmail.com"){
                name = vasanthi
              }else if (e.Asignee === "ravi@gmail.com"){
                name = ravi
              }else{
                name = ganesh
              }
              return(
                <>
                <div className='task-names1'>{e.Taskname}</div>
                <div className='task-names1' style={{width:"146px"}}>{e.deadLine}</div>
                <div className='task-names1'><div className='task-names1-1' style={{backgroundColor: color1, color:'white'}}> {e.status}</div></div>
                <div className='task-names1'style={{width:"220px"}} ><img src={name} alt='ganesh'></img><span>{e.Asignee}</span></div>
                <div className='task-names1'><span><FaEdit className='faEdit'  onClick={()=>editdata(e.id)}/></span><span><MdOutlineDelete style={{backgroundColor:"orange"}}  onClick={()=>deletedata(e.id)} className='faEdit'/></span></div>
                </>
              )
            })
          }
        </div>
        {addtask &&(
        <div className='company-add'>
          <h5>Add Task</h5>
          <div className='company-add-main'>
            <div className='company-row1'>Task name </div>
            <input placeholder='Enter Task name' onChange={(e)=>{settaskname(e.target.value)}} type='text'></input>
            <div className='company-row1'>Deadline  </div>
            <input placeholder="ENter Deadline Date" type='date' onChange={(e)=>{setdeadline(e.target.value)}}  ></input>
            <div className='company-row1'>Status</div>
            <select  onChange={(e)=>{settaskstatus(e.target.value)}}>
              <option>Select Status</option>
              <option>Pending</option>
              <option>Closed</option>
            </select>
            <div className='company-row1'>Assignee</div>
            <input placeholder='Enter task Assigned Email' type='text' onChange={(e)=>{settaskassignee(e.target.value)}}></input>
            <div><button onClick={addtaskdata}>submit</button></div>
            <div><button className='cancel-btn' onClick={cancelbtn}>cancel</button></div>
          </div>
        </div>
        )}
        {edit &&(
          <div className='company-add'>
          <h5>Edit Company</h5>
          <div className='company-add-main'>
            <div className='company-row1'>Task Name</div>
            <input  placeholder='Add Task Name' onChange={(e)=>{settaskname(e.target.value)}} type='text'></input>
            <div className='company-row1'>Deadline </div>
            <input placeholder='Enter Deadline date' type='date' onChange={(e)=>{setdeadline(e.target.value)}}  ></input>
            <div className='company-row1'>Status</div>
            <select  onChange={(e)=>{settaskstatus(e.target.value)}}>
              <option>Select Status</option>
              <option>Pending</option>
              <option>Closed</option>
            </select>
            <div className='company-row1'>Assignee</div>
            <input placeholder='Enter Task Assigned Email' type='text' onChange={(e)=>{settaskassignee(e.target.value)}}></input>
            <div><button onClick={submiteditdata}>submit</button></div>
            <div><button className='cancel-btn' onClick={cancelbtn}>cancel</button></div>
          </div>
        </div>
        )}
        {delete1 &&(
                    <div className='company-add'>
                    <h5 className='company-add-delete'>Are You Shure want to delete data</h5>
                    <div className='company-add-main'>
                      <div className='company-row1'></div>
                      <div><button onClick={submitdeletedata1}>YES</button></div>
                      <div><button className='cancel-btn' onClick={cancelbtn}>cancel</button></div>
                    </div>
                  </div>
          )}
      </div>
    </div>
  )
}

export default Tasks




// Tasks
