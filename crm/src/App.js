
import  { MainPage } from "./MainPage";
import { BrowserRouter,Route, Routes } from 'react-router-dom';
import Dashboard from "./components/Dashboard";
import Tasks from "./components/Tasks";
import Contacts from "./components/Contacts";
import Companies from "./components/Companies";
import Leads from "./components/Leads";
import Projects from "./components/Projects";
import Reports from "./components/Reports";
import Activities from "./components/Activities";

import Invoice from "./components/Invoice";
import Mails from "./components/Mails";
import Login from "./Logins/Login";
import { useState } from "react";
import UserPanel from "./UserComponents/UserPanel";
import QuoteRequest from "./UserComponents/QuoteRequest";
import Createticket from "./UserComponents/Createticket";
import ViewTickets from "./UserComponents/ViewTickets";
import Profile from "./UserComponents/Profile";
import ChangePassword from "./UserComponents/ChangePassword";
import Crm from "./components/Crm";
import DealTickets from "./components/DealTickets";
import AdminQuote from "./components/AdminQuote";




function App() {
  const [userPanelData, setUserPanelData] = useState(false);
  const [adminPanelData,setAdminpanelData] = useState(false)

  return (
    <>
    <BrowserRouter>
    <Login path="/Login"  setAdminpanelData={setAdminpanelData} setUserPanelData={setUserPanelData}>
      {adminPanelData && (
    <MainPage>
      <Routes>
        <Route path="Dashboard" element={<Dashboard></Dashboard>}></Route>
        <Route path="Tasks"element={<Tasks></Tasks>}></Route>
        <Route path="Contacts" element={<Contacts></Contacts>}></Route>
        <Route path="Companies" element={<Companies></Companies>}></Route>
        <Route path="Leads" element={<Leads></Leads>}></Route>
        <Route path="Adminquote" element={<AdminQuote></AdminQuote>}></Route>
        <Route path="Projects" element={<Projects></Projects>}></Route>
        <Route path="Reports" element={<Reports></Reports>}></Route>
        <Route path="Activities" element={<Activities></Activities>}></Route>
        <Route path="Invoice" element={<Invoice></Invoice>}></Route>
        <Route path="Mails" element={<Mails></Mails>}></Route>
        <Route path="Dealtickets" element={<DealTickets></DealTickets>}></Route>
        <Route path="Crm" element={<Crm></Crm>}></Route>

      </Routes>
    </MainPage>
     )}

    {userPanelData &&(
      <UserPanel>
        <Routes>
          <Route path="Dashboard" element={<Dashboard></Dashboard>}></Route>
          <Route path="Quoterequest" element={<QuoteRequest></QuoteRequest>}></Route>
          <Route path="Createticket" element={<Createticket></Createticket>}></Route>
          <Route path="Viewtickets" element={<ViewTickets></ViewTickets>}></Route>
          <Route path="Profile" element={<Profile></Profile>}></Route>
          <Route path="Changepassword" element={<ChangePassword></ChangePassword>}></Route>
        </Routes>
      </UserPanel>
    )}  
    </Login>
    </BrowserRouter>
    </>
  );
}

export default App;








// import  { MainPage } from "./MainPage";
// import { BrowserRouter,Route, Routes } from 'react-router-dom';
// import Dashboard from "./components/Dashboard";
// import Tasks from "./components/Tasks";
// import Contacts from "./components/Contacts";
// import Companies from "./components/Companies";
// import Leads from "./components/Leads";
// import Deals from "./components/Deals";
// import Projects from "./components/Projects";
// import Reports from "./components/Reports";
// import Activities from "./components/Activities";
// import Blogs from "./components/Blogs";
// import Invoice from "./components/Invoice";
// import Mails from "./components/Mails";
// import Login from "./Logins/Login";
// import ManageTickets from "./components/ManageTickets";
// import UserPanel from "./UserComponents/UserPanel";
// import { useState } from "react";
// import QuoteRequest from "./UserComponents/QuoteRequest";
// import Createticket from "./UserComponents/Createticket";
// // import ViewTickets from "./UserComponents/ViewTickets";
// import Profile from "./UserComponents/Profile";
// import ChangePassword from "./UserComponents/ChangePassword";




// function App() {
//   const [userPanelData, setUserPanelData] = useState(false);
//   const [adminPanelData,setAdminpanelData] = useState(false)

//   return (
//     <>
//     <BrowserRouter>
//     <Login path="/Login"  setAdminpanelData={setAdminpanelData} setUserPanelData={setUserPanelData}>
//       {adminPanelData && (
//     <MainPage>
//       <Routes>
//         <Route path="Dashboard" element={<Dashboard></Dashboard>}></Route>
//         <Route path="Tasks"element={<Tasks></Tasks>}></Route>
//         <Route path="Contacts" element={<Contacts></Contacts>}></Route>
//         <Route path="Companies" element={<Companies></Companies>}></Route>
//         <Route path="Leads" element={<Leads></Leads>}></Route>
//         <Route path="Deals" element={<Deals></Deals>}></Route>
//         <Route path="Projects" element={<Projects></Projects>}></Route>
//         <Route path="Reports" element={<Reports></Reports>}></Route>
//         <Route path="Activities" element={<Activities></Activities>}></Route>
//         <Route path="Blogs" element={<Blogs></Blogs>}></Route>
//         <Route path="Invoice" element={<Invoice></Invoice>}></Route>
//         <Route path="Mails" element={<Mails></Mails>}></Route>
//         <Route path="Managetickets" element={<ManageTickets></ManageTickets>}></Route>
//         <Route path="UsersPanel" element={<UserPanel></UserPanel>}></Route>
//       </Routes>
//     </MainPage>
//     )}
//     {userPanelData &&(
//     <UserPanel>
//       <Routes>
//         <Route path="Dashboard" element={<Dashboard></Dashboard>}></Route>
//         <Route path="Quoterequest" element={<QuoteRequest></QuoteRequest>}></Route>
//         <Route path="Createticket" element={<Createticket></Createticket>}></Route>
//         {/* <Route path="Viewtickets" element={<ViewTickets></ViewTickets>}></Route> */}
//         <Route path="Profile" element={<Profile></Profile>}></Route>
//         <Route path="Changepassword" element={<ChangePassword></ChangePassword>}></Route>
//         <Route path="Leads" element={<Leads></Leads>}></Route>
//         <Route path="Projects" element={<Projects></Projects>}></Route>
//         <Route path="Reports" element={<Reports></Reports>}></Route>
//         <Route path="Invoice" element={<Invoice></Invoice>}></Route>
//         <Route path="Mails" element={<Mails></Mails>}></Route>
//         <Route path="UsersPanel" element={<UserPanel></UserPanel>}></Route>
//       </Routes>
//     </UserPanel>
//     )}
//     </Login>
    
  
//     </BrowserRouter>
//     </>
//   );
// }

// export default App;

















