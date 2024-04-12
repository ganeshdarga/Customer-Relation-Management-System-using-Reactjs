import React from 'react'
import { LiaIndustrySolid } from "react-icons/lia";
import  { useEffect, useState } from 'react'
import Axios from 'axios'
import logo from './company.jpg'
import { FaEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { FaFileInvoiceDollar } from "react-icons/fa";


const Invoice = () => {
  const [addinvoice,setaddinvoice] =useState(false)
  const [edit,setEdit]=useState(false)



  const [invoicedata,setinvoicedata]=useState([])

  

  const getinvoice = ()=>{
    Axios.get("http://localhost:3002/getinvoicedata",{
    }).then((res)=>{
      setinvoicedata(res.data)
    })
  }

  useEffect(()=>{
    getinvoice();
  },[])

  const addinvoices=()=>{
    setaddinvoice(true)
    setEdit(false)
  }
  const cancelbtn = ()=>{
    setaddinvoice(false)
    setEdit(false)
    setdelete1(false)
  }
  
  //adding company
  const [accountnumber,setaccountnumber]=useState("")
  const [account,setaccount]=useState("")
  const [amount,setamount]=useState("")
  const [invoicedate,setinvoicedate]=useState("")
  const [duedate,setduedate]=useState("")
  const [type,settype]=useState("")
  const [status,setstatus]=useState("")
  

  const addinvoicedata=()=>{
    if( accountnumber === "" || account ==="" || amount === "" || invoicedate ==="" || duedate ==="" || type === "" || status ===""){
      alert("please fill all the fields")
    }
    else{
      Axios.post("http://localhost:3002/addinvoice",{
        accountnumber:accountnumber,
        account:account,
        amount:amount,
        invoicedate:invoicedate,
        duedate:duedate,
        type:type,
        status:status
      }).then((res)=>{
        alert("Invoice Added Success")
        getinvoice()
        setaddinvoice(false)
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
    Axios.delete("http://localhost:3002/deteteinvoicedata",{data:{deleteId:deleteId}
    }).then((res)=>{
      alert("Successfully deleted")
      getinvoice()
      setdelete1(false)
    })
  }
  //edit companies
  const [id,setId]=useState("")
  const editdata=(e)=>{
    setId(e)
    setEdit(true)
    setaddinvoice(false)
  }

  const submiteditdata = ()=>{
    if (accountnumber === "" || account === "" || amount === "" || invoicedate === "" || duedate === ""  || type === "" || status ==="" ){
      alert("please fill all the fields")
    }
    else{
      Axios.post(`http://localhost:3002/subinvoiceedit/${id}`,{
        accountnumber:accountnumber,
        account:account,
        amount:amount,
        invoicedate:invoicedate,
        duedate:duedate,
        type:type,
        status:status
    }).then((response)=>{
      getinvoice()
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
        <div><FaFileInvoiceDollar  className="logo0" /></div>
        <div><h5>Invoice</h5>Invoice list</div>
      </div>
      <div className='company-main2'>
        <h5>Invoice Details</h5>
        <hr></hr>
        <button onClick={addinvoices}>Add New Invoice</button>
      </div>
      <div className='company-main3'>
        <div className='company-names'>A/C number</div>
        <div className='company-names'>Account</div>
        <div className='company-names' style={{width:"110px"}}>Amount</div>
        <div className='company-names'>Invoice Date</div>
        <div className='company-names' style={{width:"106px"}}>Due date</div>
        <div className='company-names'>Status</div>
        <div className='company-names'  style={{width:"165px"}}>Action</div>
        {
          invoicedata.map((e)=>{
            return(
              <>
              <div className='company-names1'>{e.accountNumber}</div>
              <div className='company-names1'>{e.account}</div>
              <div className='company-names1' style={{width:"110px"}}>{e.Amount}</div>
              <div className='company-names1'>{e.invoiceDate}</div>
              <div className='company-names1'style={{width:"106px"}}>{e.dueDate}</div>
              <div className='company-names1'><span className='span1'>{e.status}</span></div>
              <div className='company-names1'  style={{width:"165px"}}><span><FaEdit className='faEdit1' onClick={()=>editdata(e.id)}/></span><span><MdOutlineDelete style={{backgroundColor:"orange"}} onClick={()=>deletedata(e.id)} className='faEdit1'/></span></div>
              </>
            )
          })
        }
      </div>
      {addinvoice &&(
      <div className='company-add'>
        <h5>Add Invoice</h5>
        <div className='company-add-main'>
          <div className='company-row1'>Account Number</div>
          <input  type='text' onChange={(e)=>{setaccountnumber(e.target.value)}} ></input>
          <div className='company-row1'>Account Holder</div>
          <input type='email' onChange={(e)=>{setaccount(e.target.value)}} ></input>
          <div className='company-row1'>Amount</div>
          <input type='number' onChange={(e)=>{setamount(e.target.value)}} ></input>
          <div className='company-row1'>Invoice Date</div>
          <input type='date' onChange={(e)=>{setinvoicedate(e.target.value)}}></input>
          <div className='company-row1'>Due Date </div>
          <input type='date'  onChange={(e)=>{setduedate(e.target.value)}}></input>
          <div className='company-row1'>Type</div>
          <input type='text' onChange={(e)=>{settype(e.target.value)}}></input>
          <div className='company-row1'>status</div>
          <input type='text' onChange={(e)=>{setstatus(e.target.value)}}></input>
          <div><button onClick={addinvoicedata}>submit</button></div>
          <div><button className='cancel-btn' onClick={cancelbtn}>cancel</button></div>
        </div>
      </div>
      )}
      {edit &&(
        <div className='company-add'>
        <h5>Edit Invoice</h5>
        <div className='company-add-main'>
          <div className='company-row1'>Account Number  </div>
          <input onChange={(e)=>{setaccountnumber(e.target.value)}} type='text'></input>
          <div className='company-row1'>account  </div>
          <input type='email' onChange={(e)=>{setaccount(e.target.value)}}  ></input>
          <div className='company-row1'>amount</div>
          <input type='number' onChange={(e)=>{setamount(e.target.value)}} ></input>
          <div className='company-row1'>Invoice Date</div>
          <input type='date'  onChange={(e)=>{setinvoicedate(e.target.value)}}></input>
          <div className='company-row1'>Due Date</div>
          <input type='date' onChange={(e)=>{setduedate(e.target.value)}}></input>
          <div className='company-row1'>Type</div>
          <input type='text'  onChange={(e)=>{settype(e.target.value)}}></input>
          <div className='company-row1'>status</div>
          <input type='text'  onChange={(e)=>{setstatus(e.target.value)}}></input>
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

export default Invoice