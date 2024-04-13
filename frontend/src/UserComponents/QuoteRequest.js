import React, { useState } from "react";
import Axios from "axios";
import { FcServices } from "react-icons/fc";
import quote from './usercom_pictures/requestquote.jpg'

const QuoteRequest = () => {
  const [serviseUser, setServiceUser] = useState("");
  const [serviceEmail, setServiceEmail] = useState("");
  const [serviceContact, setserviceContact] = useState("");
  const [serviceCompany, setserviceCompany] = useState("");
  const [serviceMessage, setServiceMessage] = useState("");
  const [typesofservices, setTypesofservices] = useState("");

  const submitservice = () => {
    if(serviseUser === "" || serviceEmail === "" ||  serviceContact ==="" || serviceCompany ==="" || serviceMessage ==="" || typesofservices===""){
      alert("Please Fill All the fields")
    }
    else{
      Axios.post("http://localhost:3002/submitservice", {
      serviseUser: serviseUser,
      serviceEmail: serviceEmail,
      serviceContact: serviceContact,
      serviceCompany: serviceCompany,
      serviceMessage: serviceMessage,
      typesofservices: typesofservices,
    })
      .then((res) => {
        alert("you will receive upadated message shortly");
      })
      .catch((err) => {
        alert("error occured");
      });
    }
  };
  return (
    <>
      <div className="quote">
        <div className="Quote1">
          <h2>Choose Type Of Service Needed</h2>
        </div>
        <hr style={{margin: '0rem 0'}}></hr>
        <div className="Quote-container">
          <div className="quote-contents">
            Name:
            <input
              className="quote-name"
              placeholder="Name"
              type="text"
              onChange={(e) => {
                setServiceUser(e.target.value);
              }}
            ></input>
          </div>
          <div className="quote-contents">
            Email:
            <input
              className="quote-email"
              placeholder="Email"
              type="email"
              onChange={(e) => {
                setServiceEmail(e.target.value);
              }}
            ></input>
          </div>
          <div className="quote-contents">
            Contact Number:
            <input
              className="quote-number"
              placeholder="Contact Number"
              type="number"
              onChange={(e) => {
                setserviceContact(e.target.value);
              }}
            ></input>
          </div>
          <div className="quote-contents">
            Company:
            <input
              className="qoute-company"
              placeholder="Company Name"
              type="text"
              onChange={(e) => {
                setserviceCompany(e.target.value);
              }}
            ></input>
          </div>
          <div className="quote-contents">
            Message
            <textarea className="text-area-quote"
              onChange={(e) => {
                setServiceMessage(e.target.value);
              }}
            ></textarea>
          </div>
          <div className="quote-services">
            <h4>Select Service Required <span><FcServices /></span> </h4>
            <ul>
              <li>
                <select
                  onChange={(e) => {
                    setTypesofservices(e.target.value);
                  }}
                >
                  <option>Select service</option>
                  <option>Service/Support Needed 101</option>
                  <option>Service/Support Needed 102</option>
                  <option>Service/Support Needed 103</option>
                  <option>Service/Support Needed 104</option>
                  <option>Service/Support Needed 105</option>
                  <option>Service/Support Needed 106</option>
                </select>
              </li>
            </ul>
            <button onClick={submitservice}>Submit</button>
          </div>
        </div>
        <img className="quote-iamge" src={quote} alt="quote image"></img>
      </div>
    </>
  );
};

export default QuoteRequest;
