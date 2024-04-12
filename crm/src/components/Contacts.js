import React, { useEffect, useState } from "react";
import Axios from "axios";
import { PiFinnTheHumanFill } from "react-icons/pi";

const Contacts = () => {
  const [userData, setUserdata] = useState([]);
  const [edit, setEdit] = useState(false);

  const getUserdata = () => {
    Axios.get("http://localhost:3002/getuserdata", {}).then((res) => {
      setUserdata(res.data);
    });
  };

  useEffect(() => {
    getUserdata();
  }, []);

  const canceledit = () => {
    setEdit(false);
    setdelete1(false);
  };

  const [Username, setUserName] = useState();
  const [userEmail, setUserEmail] = useState();
  const [useAlterEmail, setUserAlterEmail] = useState();
  const [userMobile, setUserMobile] = useState();
  const [UserGender, setUserGender] = useState();
  const [userAddress, setUserAddress] = useState();
  const [userPassword, setUserPassword] = useState();

  const [Id, setUserId] = useState("");

  const editdata = (e) => {
    setUserId(e);
    setEdit(true);
  };
  const submiteditdata = () => {
    if (
      Username === "" ||
      userEmail === "" ||
      useAlterEmail === "" ||
      userMobile === "" ||
      UserGender === "" ||
      userAddress === "" ||
      userPassword === ""
    ) {
      alert("pleas fill all the fields");
    } else {
      Axios.post(`http://localhost:3002/submitedit/${Id}`, {
        Username: Username,
        userEmail: userEmail,
        useAlterEmail: useAlterEmail,
        userMobile: userMobile,
        UserGender: UserGender,
        userAddress: userAddress,
        userPassword: userPassword,
      })
        .then((response) => {
          setEdit(false);
          getUserdata();
          alert("data updated Success");
        })
        .catch((err) => {
          alert("Unable to add data");
        });
    }
  };

  const [delete1, setdelete1] = useState(false);
  const [Id1, setId1] = useState("");

  const deletedata = (id) => {
    setId1(id);
    setdelete1(true);
  };

  const submitdeletedata1 = () => {
    Axios.delete("http://localhost:3002/detetedata", {data:{Id1:Id1}}).then(
      (res) => {
        alert("Successfully deleted");
        getUserdata();
        setdelete1(false)
      }
    );
  };
  return (
    <div className="main-table">
      <div className="table-2">
        <h3>
          <PiFinnTheHumanFill />
          Customers Data
        </h3>
        <table className="table-container">
          <thead className="table-td">
            <tr className="table-tr">
              <th>id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Alternate Email</th>
              <th>Password</th>
              <th>Mobile</th>
              <th>Gender</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
          </thead>

          {userData.map((e) => {
            return (
              <>
                <tbody className="table-body">
                  <tr>
                    <td>{e.id}</td>
                    <td>{e.name}</td>
                    <td>{e.email}</td>
                    <td>{e.alt_email}</td>
                    <td>{e.password}</td>
                    <td>{e.mobile}</td>
                    <td>{e.gender}</td>
                    <td>{e.address}</td>
                    <button onClick={() => editdata(e.id)}>Edit</button>
                    <button
                      style={{ backgroundColor: "orange" }}
                      onClick={() => deletedata(e.id)}
                    >
                      Delete
                    </button>
                  </tr>
                </tbody>
              </>
            );
          })}
        </table>
      </div>
      {edit && (
        <>
          <div className="edit-list">
            <h5>Edit Customer Data of userID:{Id}</h5>
            <ul>
              <li>
                Your Name:
                <input
                  type="text"
                  placeholder="Enter Name"
                  className="profile-name"
                  onChange={(e) => {
                    setUserName(e.target.value);
                  }}
                ></input>
              </li>
              <li>
                Email_ID:{" "}
                <input
                  type="email"
                  placeholder="Enter Email"
                  className="profile-email"
                  onChange={(e) => {
                    setUserEmail(e.target.value);
                  }}
                ></input>
              </li>
              <li>
                Alternate Email Email_ID:{" "}
                <input
                  placeholder="Enter Alternate emil"
                  type="email"
                  className="profile-altemail"
                  onChange={(e) => {
                    setUserAlterEmail(e.target.value);
                  }}
                ></input>
              </li>
              <li>
                Mobile Number:{" "}
                <input
                  type="number"
                  placeholder="Enter Mobile number"
                  className="profile-mobile"
                  onChange={(e) => {
                    setUserMobile(e.target.value);
                  }}
                ></input>
              </li>
              <li>
                Gender:{" "}
                <select
                  className="profile-gender"
                  onChange={(e) => {
                    setUserGender(e.target.value);
                  }}
                >
                  <option>Select Ganeder</option>
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </li>
              <li>
                Address:{" "}
                <input
                  type="text"
                  placeholder="Enter Address"
                  className="profile-address"
                  onChange={(e) => {
                    setUserAddress(e.target.value);
                  }}
                ></input>
              </li>
              <li>
                Password:{" "}
                <input
                  type="password"
                  placeholder="Enter Password"
                  className="profile-password"
                  onChange={(e) => setUserPassword(e.target.value)}
                ></input>
              </li>
              <button onClick={submiteditdata}>SUBMIT YOUR EDITED DATA</button>
              <button className="edit-button" onClick={canceledit}>
                Cancel
              </button>
            </ul>
          </div>
        </>
      )}
      {delete1 &&(
                    <div className='company-add1'>
                    <h5 className='company-add-delete'>Are You Shure want to delete data</h5>
                    <div className='company-add-main'>
                      <div className='company-row1'></div>
                      <div><button onClick={submitdeletedata1}>YES</button></div>
                      <div><button className='cancel-btn2' onClick={canceledit}>cancel</button></div>
                    </div>
                  </div>
          )}
    </div>
  );
};

export default Contacts;
