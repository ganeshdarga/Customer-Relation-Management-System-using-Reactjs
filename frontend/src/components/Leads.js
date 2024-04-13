import React from 'react'
import { LiaIndustrySolid } from "react-icons/lia";
import  { useEffect, useState } from 'react'
import Axios from 'axios'
import logo from './adminimages/company.jpg'
import { FaEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";

const Leads = () => {
  const [addleads,setaddleads] =useState(false)
  const [edit,setEdit]=useState(false)

  const [leaddata,setleaddata]=useState([])



  const getleads = ()=>{
    Axios.get("http://localhost:3002/getleaddata",{
    }).then((res)=>{
      setleaddata(res.data)
    })
  }

  useEffect(()=>{
    getleads();
  },[])

  const addleadss=()=>{
    setaddleads(true)
    setEdit(false)
  }
  const cancelbtn = ()=>{
    setaddleads(false)
    setEdit(false)
    setdelete1(false)
  }
  
  //adding Leads
  const [leadname,setleadname]=useState("")
  const [leadtitle,setleadtitle]=useState("")
  const [leadcompany,setleadCompany]=useState("")
  const [leadphone,setleadphone]=useState("")
  const [leademail,setleademail]=useState("")
  const [lead_status,setleadstatus]=useState("")
  const [leadcreate,setleadcreated]=useState("")
  const [leadowner,setleadowner]=useState("")
  

  const addleadsdata=()=>{
    if( leadname === "" || leadtitle ==="" || leadcompany === "" || leadphone ==="" || leademail ==="" || lead_status ==="" || leadcreate ==="" || leadowner===""){
      alert("please fill all the fields")
    }
    else{
      Axios.post("http://localhost:3002/addleads",{
        leadname:leadname,
        leadtitle:leadtitle,
        leadcompany:leadcompany,
        leadphone:leadphone,
        leademail:leademail,
        lead_status:lead_status,
        leadcreate:leadcreate,
        leadowner:leadowner
      }).then((res)=>{
        alert("Lead Added Success")
        getleads()
        setaddleads(false)
      }).catch((err)=>{
        alert("unable to add Leads")
      })
    }
  }
  
  //deelete leads
  const [delete1,setdelete1]=useState(false);
  const [deleteId,setDeleteId]=useState("")
  const deletedata = (id)=>{
    setDeleteId(id)
    setdelete1(true)
  }
  const submitdeletedata = (id)=>{
    Axios.delete("http://localhost:3002/deteteleaddata",{data:{deleteId:deleteId}
    }).then((res)=>{
      alert("Successfully deleted")
      getleads()
      setdelete1(false)
    })
  }

  //edit Leads
  const [id,setId]=useState("")
  const editdata=(e)=>{
    setId(e)
    setEdit(true)
    setaddleads(false)
  }

  const submiteditdata = ()=>{
    if (leadname === "" || leadtitle === "" || leadcompany === "" || leadphone === "" || leademail === "" || lead_status ==="" || leadcreate ==="" || leadowner===""){
      alert("please fill all the fields")
    }
    else{
      Axios.post(`http://localhost:3002/subleadedit/${id}`,{
        leadname:leadname,
        leadtitle:leadtitle,
        leadcompany:leadcompany,
        leadphone:leadphone,
        leademail:leademail,
        lead_status:lead_status,
        leadcreate:leadcreate,
        leadowner:leadowner
    }).then((response)=>{
      getleads()
      alert("Lead updated Success")
      setEdit(false)
  }).catch((err)=>{
    alert("Unable to add Lead")
  })
    }
  }
  return (
    <div className='companies-container'>
    <div className='company-logo'>
      <div className='company-main'>
        <div><LiaIndustrySolid className="logo0" /></div>
        <div><h5>Leads</h5>Leads list</div>
      </div>
      <div className='company-main2'>
        <h5>Leads Details</h5>
        <hr></hr>
        <button onClick={addleadss}>Add New Leads</button>
      </div>
      <div className='company-main3'>
        <div className='deal-names'>Name</div>
        <div className='deal-names'>Title</div>
        <div className='deal-names'>company</div>
        <div className='deal-names' style={{width:"93px"}}>phone</div>
        <div className='deal-names' style={{width:"171px"}}>email</div>
        <div className='deal-names' style={{width:"140px"}}>lead_status</div>
        <div className='deal-names' style={{width:"110px"}}>Lead_created</div>
        <div className='deal-names' style={{width:"150px"}}>Action</div>
        
        {
          leaddata.map((e)=>{
            return(
              <>
              
              <div className='deal-names1'>{e.Name}</div>
              <div className='deal-names1'>{e.Title}</div>
              <div className='deal-names1'>{e.company}</div>
              <div className='deal-names1' style={{width:"93px"}}>{e.phone}</div>
              <div className='deal-names1' style={{width:"171px"}}>{e.email}</div>
              <div className='deal-names1' style={{width:"140px"}}><span className='span22'>{e.lead_status}</span></div>
              <div className='deal-names1' style={{width:"110px"}}>{e.Lead_created}</div>
              <div className='deal-names1' style={{width:"150px"}}><span><FaEdit style={{marginLeft:"7px"}} className='faEdit1' onClick={()=>editdata(e.id)}/></span><span><MdOutlineDelete style={{backgroundColor:"orange"}} onClick={()=>deletedata(e.id)} className='faEdit1'/></span></div>
              </>
            )
          })
        }
      </div>
      {addleads &&(
      <div className='company-add'>
        <h5>Add Leads</h5>
        <div className='company-add-main'>
          <div className='company-row1'>Name</div>
          <input onChange={(e)=>{setleadname(e.target.value)}} type='text'></input>
          <div className='company-row1'>Title  </div>
          <input type='text' onChange={(e)=>{setleadtitle(e.target.value)}}  ></input>
          <div className='company-row1'>company</div>
          <input type='text' onChange={(e)=>{setleadCompany(e.target.value)}} ></input>
          <div className='company-row1'>phone</div>
          <input type='number' onChange={(e)=>{setleadphone(e.target.value)}}></input>
          <div className='company-row1'>email</div>
          <input type='email'  onChange={(e)=>{setleademail(e.target.value)}}></input>
          <div className='company-row1'>lead_status</div>
          <input type='text'  onChange={(e)=>{setleadstatus(e.target.value)}}></input>
          <div className='company-row1'>Lead_created</div>
          <input type='date'  onChange={(e)=>{setleadcreated(e.target.value)}}></input>
          <div className='company-row1'>Lead_owner</div>
          <input type='text'  onChange={(e)=>{setleadowner(e.target.value)}}></input>
          <div><button onClick={addleadsdata}>submit</button></div>
          <div><button className='cancel-btn' onClick={cancelbtn}>cancel</button></div>
        </div>
      </div>
      )}
      {edit &&(
        <div className='company-add'>
        <h5>Add Edit lead of id{id}</h5>
        <div className='company-add-main'>
          <div className='company-row1'>Name</div>
          <input onChange={(e)=>{setleadname(e.target.value)}} type='text'></input>
          <div className='company-row1'>Title  </div>
          <input type='text' onChange={(e)=>{setleadtitle(e.target.value)}}  ></input>
          <div className='company-row1'>company</div>
          <input type='text' onChange={(e)=>{setleadCompany(e.target.value)}} ></input>
          <div className='company-row1'>phone</div>
          <input type='number' onChange={(e)=>{setleadphone(e.target.value)}}></input>
          <div className='company-row1'>email</div>
          <input type='email'  onChange={(e)=>{setleademail(e.target.value)}}></input>
          <div className='company-row1'>lead_status</div>
          <input type='text'  onChange={(e)=>{setleadstatus(e.target.value)}}></input>
          <div className='company-row1'>Lead_created</div>
          <input type='date'  onChange={(e)=>{setleadcreated(e.target.value)}}></input>
          <div className='company-row1'>Lead_owner</div>
          <input type='text'  onChange={(e)=>{setleadowner(e.target.value)}}></input>
          <div><button onClick={submiteditdata}>submit</button></div>
          <div><button className='cancel-btn' onClick={cancelbtn}>cancel</button></div>
        </div>
      </div>
      )}
      {delete1 &&(
      <div className='company-add2'>
      <h5>Are you shure want to delete</h5>
      <div className='company-add-main2'>
        <div><button onClick={submitdeletedata}>Yes</button></div>
        <div><button className='cancel-btn2' onClick={cancelbtn}>cancel</button></div>
      </div>
    </div>
    )}
    </div>
  </div>
  )
}

export default Leads
