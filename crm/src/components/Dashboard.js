// import React from 'react'
// import { useRef,useState,useEffect } from 'react';
// import {Bar} from 'react-chartjs-2'
// import { IoMdContacts } from "react-icons/io";
// import { FaArrowUp } from "react-icons/fa";
// import { IoIosArrowForward } from "react-icons/io";

// import {Chart,LinearScale,CategoryScale,BarElement,Legend,Title,Tooltip,registerables} from 'chart.js'
// Chart.register(
//   LinearScale,CategoryScale,BarElement,Legend,Title,Tooltip
// )
// Chart.register(...registerables);

// const AnimatedCounter = ({ value, duration }) => {
//   const [animatedValue, setAnimatedValue] = useState(0);

//   useEffect(() => {
//     let start = 0;
//     const end = parseInt(value, 10);
//     const range = end - start;
//     let current = start;
//     const increment = end > start ? 1 : -1;
//     const stepTime = Math.abs(Math.floor(duration / range));

//     const timer = setInterval(() => {
//       current += increment;
//       setAnimatedValue(current);
//       if (current === end) {
//         clearInterval(timer);
//       }
//     }, stepTime);

//     return () => clearInterval(timer);
//   }, [value, duration]);

//   return <h3>{animatedValue} K</h3>;
// };

// const labels=['jan','fib','mar','april','may','june','july','august','sept','oct','nov','dec']

// const options ={
//   plugins:{
//     legend:{
//       position:'top'
//     },
//     title:{
//       display:true,
//       text:"Coaaps Expencs Tracker"
//     }
//   }
// }

// const data ={
//   labels,
//   datasets : [
//     {
//       label:'Number of Projects',
//       data:[10000,11000,9000,8000,10200,8400,13000,14600,9000,34566,5674,87322],
//       backgroundColor:'pink'
//     },
//     {
//       label:'Active Projects',
//       data:[10000,2000,3000,4000,6000,3000,5000,1010,25000,90000,45000,3498],
//       backgroundColor:'grey'

//     }
//   ]
// }

// const Dashboard = () => {
//   const data1={
//     labels:['India','US','Chaina','Indonesia','Russia','Bangladesh','Canada','UK'],
//     datasets:[
//       {
//         label:'Sessions By Country',
//         data:[100,200,300,500,200,50,550,20],
//         backgroundColor:'#61DBFB',
//       }
//     ]
//   }
//   const options={
//     indexAxis:'y'
//   }

//   const chartRef = useRef(null);
//   const chartInstance = useRef(null)

//   useEffect(()=>{
//     const myChartRef = chartRef.current.getContext("2d");

//     if (chartInstance.current){
//       chartInstance.current.destroy();
//     }

//     chartInstance.current = new Chart(myChartRef,{
//       type:'doughnut',
//       data:{
//         labels:['completed','Inprogress','Yet to complete'],
//         datasets:[{
//           data:[30,45,25],
//           backgroundColor:[
//             'rgb(255, 99, 132)',
//             'rgb(54, 162, 235)',
//             'rgb(255, 205, 86)'],
//         }]
//       }
//     })
//     return()=>{
//       if (chartInstance.current){
//         chartInstance.current.destroy();
//       }
//     }
//   },[])
//   return (
//     <div className='dashboard-container'>
//       <h4>ANALYTICS</h4>
//       <p>Dashboard <IoIosArrowForward /> </p>
//       <hr className='hr-dashboard'></hr>
//       <div className='dashboard1'>
//           <div className='dashboard-items'>
//             <p>Users</p>
//             <div className='icons3' ><IoMdContacts style={{color:"green"}} className='icon4'/></div>
//             <div className='items4'>
//               <AnimatedCounter value={28.05} duration={2000} />
//               <p><span style={{color:"green"}}>16.24%</span>vs.Previous Month</p>
//             </div>
//           </div>
//           <div  className='dashboard-items'>
//             <p>Sessions</p>
//             <div className='icons3' ><IoMdContacts style={{color:"green"}} className='icon4'/></div>
//             <div className='items4'>
//             <AnimatedCounter value={97} duration={2000} />
//               <p><span style={{color:"green"}}>16.24%</span>vs.Previous Month</p>
//             </div>
//           </div>
//           <div  className='dashboard-items'>
//             <p>Avg. Visit Duration</p>
//             <div className='icons3' ><IoMdContacts style={{color:"green"}} className='icon4'/></div>
//             <div className='items4'>
//             <AnimatedCounter value={4} duration={2000} />
//               <p><span style={{color:"green"}}>16.24%</span>vs.Previous Month</p>
//             </div>
//           </div>
//           <div  className='dashboard-items'>
//             <p>Bounce Rate</p>
//             <div className='icons3' ><IoMdContacts style={{color:"green"}} className='icon4'/></div>
//             <div className='items4'>
//             <AnimatedCounter value={40} duration={2000} />
//               <p><span style={{color:"green"}}>16.24%</span>vs.Previous Month</p>
//             </div>
//           </div>

//       </div>
//       <div className='bar1'>
//         <h3>Session By Country</h3>
//         <div className='bar1-span-container'>
//         <span className='bar1-span'>All</span>
//         <span className='bar1-span'>1M</span>
//         <span className='bar1-span'>6M</span>
//         <hr className='bar1-hr'></hr>
//         </div>

//       <Bar className='bar1-1' data={data1} options={options}></Bar>
//       </div>
//       <div className='canva3'>
//         <h3>Users By Device</h3>
//         <div className='bar1-span-container'>
//         <span className='bar1-span'>All</span>
//         <span className='bar1-span'>1M</span>
//         <span className='bar1-span'>6M</span>
//         <hr className='canva3-hr'></hr>
//         </div>
//       <canvas className='canva3-3' ref={chartRef}style={{width:"10px",height:"10px"}}></canvas>
//       <div>
//         <ul>
//           <li>Desktop users <span>30%</span></li>
//           <li>Mobile users <span>45%</span></li>
//           <li>Tablet users <span>25%</span></li>
//         </ul>
//       </div>
//     </div>
//     <div className='container-referals'>
//       <h3>Top Referels Pages<span>Export Report</span></h3>
//       <hr></hr>
//       <div className='referal-data'>
//         <p>TOTAL REFERELS..</p>
//         <h4>725,800</h4><br></br>
//         <p className='para5'><span><FaArrowUp /> 15.73 %</span>  vs Previsous Month</p>
//         <ul>
//           <li><span style={{color:"green"}}>*</span>www.google.com</li>
//           <li><span style={{color:"green"}}>*</span>www.youtube.com</li>
//           <li><span style={{color:"green"}}>*</span>www.meta.com</li>
//           <li><span style={{color:"green"}}>*</span>www.medium.com</li>
//           <li><span style={{color:"green"}}>*</span>others</li>
//         </ul>
//         <a>Show All</a>
//       </div>
//     </div>
//     </div>
//   )
// }

// export default Dashboard

import React from "react";
import { useRef, useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { IoMdContacts } from "react-icons/io";
import { FaArrowUp } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { GiDuration } from "react-icons/gi";
import { RxTokens } from "react-icons/rx";
import { HiOutlineUserGroup } from "react-icons/hi2";




import {
  Chart,
  LinearScale,
  CategoryScale,
  BarElement,
  Legend,
  Title,
  Tooltip,
  registerables,
} from "chart.js";
Chart.register(LinearScale, CategoryScale, BarElement, Legend, Title, Tooltip);
Chart.register(...registerables);

const AnimatedCounter = ({ value, duration }) => {
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseInt(value, 10);
    const range = end - start;
    let current = start;
    const increment = end > start ? 1 : -1;
    const stepTime = Math.abs(Math.floor(duration / range));

    const timer = setInterval(() => {
      current += increment;
      setAnimatedValue(current);
      if (current === end) {
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [value, duration]);

  return <h3>{animatedValue} K</h3>;
};

const labels = [
  "jan",
  "fib",
  "mar",
  "april",
  "may",
  "june",
  "july",
  "august",
  "sept",
  "oct",
  "nov",
  "dec",
];

const options = {
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Coaaps Expencs Tracker",
    },
  },
};

const data = {
  labels,
  datasets: [
    {
      label: "Number of Projects",
      data: [
        10000, 11000, 9000, 8000, 10200, 8400, 13000, 14600, 9000, 34566, 5674,
        87322,
      ],
      backgroundColor: "pink",
    },
    {
      label: "Active Projects",
      data: [
        10000, 2000, 3000, 4000, 6000, 3000, 5000, 1010, 25000, 90000, 45000,
        3498,
      ],
      backgroundColor: "grey",
    },
  ],
};

const Dashboard = () => {
  const data1 = {
    labels: [
      "India",
      "US",
      "Chaina",
      "Indonesia",
      "Russia",
      "Bangladesh",
      "Canada",
      "UK",
    ],
    datasets: [
      {
        label: "Sessions By Country",
        data: [100, 200, 300, 500, 200, 50, 550, 20],
        backgroundColor: "#61DBFB",
      },
    ],
  };
  const options = {
    indexAxis: "y",
  };

  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const myChartRef = chartRef.current.getContext("2d");

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new Chart(myChartRef, {
      type: "doughnut",
      data: {
        labels: ["Mobile", "Laptop", "Tabs"],
        datasets: [
          {
            data: [30, 45, 25],
            backgroundColor: [
              "rgb(255, 99, 132)",
              "rgb(54, 162, 235)",
              "rgb(255, 205, 86)",
            ],
          },
        ],
      },
    });
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);
  return (
    <div className="dashboard-container">
      <h4>ANALYTICS</h4>
      <p>
        Dashboard <IoIosArrowForward />{" "}
      </p>
      <hr className="hr-dashboard"></hr>
      <div className="dashboard1">
        <div className="dashboard-items">
          <p>Users</p>
          <div className="icons3">
            <IoMdContacts style={{ color: "green" }} className="icon4" />
          </div>
          <div className="items4">
            <AnimatedCounter value={28.05} duration={2000} />
            <p>
              <span style={{ color: "green" }}>16.24%</span>vs.Previous Month
            </p>
          </div>
        </div>
        <div className="dashboard-items">
          <p>Sessions</p>
          <div className="icons3">
            <RxTokens  style={{ color: "green" }} className="icon4" />
          </div>
          <div className="items4">
            <AnimatedCounter value={97} duration={2000} />
            <p>
              <span style={{ color: "green" }}>16.24%</span>vs.Previous Month
            </p>
          </div>
        </div>
        <div className="dashboard-items">
          <p>Avg. Visit Duration</p>
          <div className="icons3">
            <GiDuration style={{ color: "green" }} className="icon4" />
          </div>
          <div className="items4">
            <AnimatedCounter value={4} duration={2000} />
            <p>
              <span style={{ color: "green" }}>16.24%</span>vs.Previous Month
            </p>
          </div>
        </div>
        <div className="dashboard-items">
          <p>Bounce Rate</p>
          <div className="icons3">
            <HiOutlineUserGroup  style={{ color: "green" }} className="icon4" />
          </div>
          <div className="items4">
            <AnimatedCounter value={40} duration={2000} />
            <p>
              <span style={{ color: "green" }}>16.24%</span>vs.Previous Month
            </p>
          </div>
        </div>
        <div className="bar1">
          <h3>Session By Country</h3>
          <div className="bar1-span-container">
            <span className="bar1-span">All</span>
            <span className="bar1-span">1M</span>
            <span className="bar1-span">6M</span>
            <hr className="bar1-hr"></hr>
          </div>
          <Bar className="bar1-1" data={data1} options={options}></Bar>
        </div>
        <div className="canva3">
          <h3>Users By Device</h3>
          <div className="bar1-span-container">
            <span className="bar1-span">All</span>
            <span className="bar1-span">1M</span>
            <span className="bar1-span">6M</span>
            <hr className="canva3-hr"></hr>
          </div>
          <canvas
            className="canva3-3"
            ref={chartRef}
            style={{ width: "10px", height: "10px" }}
          ></canvas>
          <div>
            <ul>
              <li style={{backgroundColor:"lightgreen"}}>
                Desktop users <span style={{backgroundColor:"blue" ,color:"white"}}>30%</span>
              </li>
              <li style={{backgroundColor:"lightgreen"}} >
                Mobile users <span style={{backgroundColor:"blue" ,color:"white"}}>45%</span>
              </li>
              <li style={{backgroundColor:"lightgreen"}}>
                Tablet users <span style={{backgroundColor:"blue" ,color:"white"}}>25%</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="container-referals">
          <h3>
            Top Referels Pages<span>Export Report</span>
          </h3>
          <hr></hr>
          <div className="referal-data">
            <p>TOTAL REFERELS..</p>
            <h4>725,800</h4>
            <br></br>
            <p className="para5">
              <span>
                <FaArrowUp /> 15.73 %
              </span>{" "}
              vs Previsous Month
            </p>
            <ul>
              <li>
                <span style={{ color: "green" }}>*</span>www.google.com
              </li>
              <li>
                <span style={{ color: "green" }}>*</span>www.youtube.com
              </li>
              <li>
                <span style={{ color: "green" }}>*</span>www.meta.com
              </li>
              <li>
                <span style={{ color: "green" }}>*</span>www.medium.com
              </li>
              <li>
                <span style={{ color: "green" }}>*</span>others
              </li>
            </ul>
            <a>Show All</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
