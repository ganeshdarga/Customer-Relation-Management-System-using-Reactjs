import React from 'react'
import { LiaIndustrySolid } from "react-icons/lia";
import  { useEffect, useState } from 'react'
import Axios from 'axios'
import logo from './adminimages/company.jpg'
import { FaEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";





const Companies = () => {
  const [addcompany,setAddcompany] =useState(false)
  const [edit,setEdit]=useState(false)

  const [companydata,setcompanydata]=useState([])



  const getcompanies = ()=>{
    Axios.get("http://localhost:3002/getcompanydata",{
    }).then((res)=>{
      setcompanydata(res.data)
    })
  }

  

  useEffect(()=>{
    getcompanies();
  },[])

  const addcompanys=()=>{
    setAddcompany(true)
    setEdit(false)
  }
  const cancelbtn = ()=>{
    setAddcompany(false)
    setEdit(false)
    setdelete1(false)
  }
  
  //adding company
  const [companyname,setcompanyname]=useState("")
  const [companyemail,setcompanyemail]=useState("")
  const [comapanymobile,setcompanymobile]=useState("")
  const [companymanage,setcompanymanage]=useState("")
  const [companystatus,setcompanystatus]=useState("")
  

  const addcompanydata=()=>{
    if( companyname === "" || companyemail ==="" || comapanymobile === "" || companymanage ==="" || companystatus ===""){
      alert("please fill all the fields")
    }
    else{
      Axios.post("http://localhost:3002/addcompany",{
        companyname:companyname,
        companyemail:companyemail,
        comapanymobile:comapanymobile,
        companymanage:companymanage,
        companystatus:companystatus
      }).then((res)=>{
        alert("Company Added Success")
        getcompanies()
        setAddcompany(false)
      }).catch((err)=>{
        alert("unable to add company")
      })
    }
  }
  
  //deelete company
  const [delete1,setdelete1]=useState(false);
  const [deleteId,setDeleteId]=useState("")
  const deletedata = (id)=>{
    setDeleteId(id)
    setdelete1(true)
  }
  const submitdeletedata = (id)=>{
    Axios.delete("http://localhost:3002/detetecompanydata",{data:{deleteId:deleteId}
    }).then((res)=>{
      alert("Successfully deleted")
      getcompanies()
      setdelete1(false)
    })
  }

  //edit companies
  const [id,setId]=useState("")
  const editdata=(e)=>{
    setId(e)
    setEdit(true)
    setAddcompany(false)
  }

  const submiteditdata = ()=>{
    if (companyname === "" || companyemail === "" || comapanymobile === "" || companymanage === "" || companystatus === "" ){
      alert("please fill all the fields")
    }
    else{
      Axios.post(`http://localhost:3002/subcompanyedit/${id}`,{
        companyname:companyname,
        companyemail:companyemail,
        comapanymobile:comapanymobile,
        companymanage:companymanage,
        companystatus:companystatus
    }).then((response)=>{
      getcompanies()
      alert("data updated Success")
      setEdit(false)
  }).catch((err)=>{
    alert("Unable to add data")
  })
    }
  }


  return (
    <div className='companies-container'>
      <div className='company-logo'>
        <div className='company-main'>
          <div><LiaIndustrySolid className="logo0" /></div>
          <div><h5>company</h5>Company list</div>
        </div>
        <div className='company-main2'>
          <h5>Company Details</h5>
          <hr></hr>
          <button onClick={addcompanys}>Add New Company</button>
        </div>
        <div className='company-main3'>
          <div className='company-names'>LOGO</div>
          <div className='company-names'>Company Name</div>
          <div className='company-names'>Email</div>
          <div className='company-names' style={{width:"105px"}}>Mobile</div>
          <div className='company-names' style={{width:"105px"}}>Manage</div>
          <div className='company-names'>Status</div>
          <div className='company-names' style={{width:"173px"}}>Action</div>
          {
            companydata.map((e)=>{
              return(
                <>
                <div className='company-names1'><img src={logo} alt='company' width={"3px"} height={"3px"}></img></div>
                <div className='company-names1'>{e.companyName}</div>
                <div className='company-names1'>{e.Email}</div>
                <div className='company-names1' style={{width:"105px"}}>{e.mobile}</div>
                <div className='company-names1' style={{width:"105px"}}>{e.manage}</div>
                <div className='company-names1'><span className='span1'>{e.statuss}</span></div>
                <div className='company-names1' style={{width:"173px"}}><span><FaEdit className='faEdit1' onClick={()=>editdata(e.id)}/></span><span><MdOutlineDelete style={{backgroundColor:"orange"}} onClick={()=>deletedata(e.id)} className='faEdit1'/></span></div>
                </>
              )
            })
          }
        </div>
        {addcompany &&(
        <div className='company-add'>
          <h5>Add Company</h5>
          <div className='company-add-main'>
            <div className='company-row1'>Company Name  </div>
            <input onChange={(e)=>{setcompanyname(e.target.value)}} type='text'></input>
            <div className='company-row1'>Email  </div>
            <input type='email' onChange={(e)=>{setcompanyemail(e.target.value)}}  ></input>
            <div className='company-row1'>Mobile</div>
            <input type='number' onChange={(e)=>{setcompanymobile(e.target.value)}} ></input>
            <div className='company-row1'>Manage</div>
            <input type='text' onChange={(e)=>{setcompanymanage(e.target.value)}}></input>
            <div className='company-row1'>Status</div>
            <input type='text'  onChange={(e)=>{setcompanystatus(e.target.value)}}></input>
            <div><button onClick={addcompanydata}>submit</button></div>
            <div><button className='cancel-btn' onClick={cancelbtn}>cancel</button></div>
          </div>
        </div>
        )}
        {edit &&(
          <div className='company-add'>
          <h5>Edit Company</h5>
          <div className='company-add-main'>
            <div className='company-row1'>Company Name</div>
            <input  onChange={(e)=>{setcompanyname(e.target.value)}} type='text'></input>
            <div className='company-row1'>Email </div>
            <input type='email' onChange={(e)=>{setcompanyemail(e.target.value)}}  ></input>
            <div className='company-row1'>Mobile</div>
            <input type='number' onChange={(e)=>{setcompanymobile(e.target.value)}}></input>
            <div className='company-row1'>Manage</div>
            <input type='text' onChange={(e)=>{setcompanymanage(e.target.value)}}></input>
            <div className='company-row1'>Status</div>
            <input type='text' onChange={(e)=>{setcompanystatus(e.target.value)}}></input>
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

export default Companies
