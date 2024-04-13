import React, { useEffect, useRef } from 'react'
import { useState } from 'react';
import { FaProjectDiagram } from "react-icons/fa";
import { LuFileBadge2 } from "react-icons/lu";
import { IoTimer } from "react-icons/io5";
import {Bar} from 'react-chartjs-2'
import {Chart,LinearScale,CategoryScale,BarElement,Legend,Title,Tooltip,registerables} from 'chart.js'
Chart.register(
  LinearScale,CategoryScale,BarElement,Legend,Title,Tooltip
)
Chart.register(...registerables);



const labels=['jan','fib','mar','april','may','june','july','august','sept','oct','nov','dec']

const options ={
  plugins:{
    legend:{
      position:'top'
    },
    title:{
      display:true,
      text:"Projects OverView"
    }
  }
}

const data ={
  labels,
  datasets : [
    {
      label:'2020 Expences',
      data:[34,65,45,68,49,61,42,43,78,62,63,67],
      backgroundColor:'blue'
    },
    {
      label:'2022 Expences',
      data:[5,12,11,17,21,11,5,9,7,29,12,35],
      backgroundColor:'green'

    }
  ]
}








const Projects = () => {

  const chartRef = useRef(null);
  const chartInstance = useRef(null)

  useEffect(()=>{
    const myChartRef = chartRef.current.getContext("2d");

    if (chartInstance.current){
      chartInstance.current.destroy();
    }

    chartInstance.current = new Chart(myChartRef,{
      type:'doughnut',
      data:{
        labels:['completed','Inprogress','Yet to complete'],
        datasets:[{
          data:[30,45,25],
          backgroundColor:[
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'],
        }]
      }
    })
    return()=>{
      if (chartInstance.current){
        chartInstance.current.destroy();
      }
    }
  },[])
  ///calnderr
// Define an array of month names
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// State variables for current month and year
const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

// Function to check if a year is a leap year
const isLeapYear = (year) => {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};

// Function to get the number of days in February for a given year
const getFebDays = (year) => {
  return isLeapYear(year) ? 29 : 28;
};

// Function to generate the calendar for a given month and year
const generateCalendar = () => {
  const daysInMonth = [31, getFebDays(currentYear), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();

  const days = [];
  for (let i = 0; i < firstDay; i++) {
    days.push(<div key={`empty-${i}`} className="empty-day"></div>);
  }

  for (let i = 1; i <= daysInMonth[currentMonth]; i++) {
    days.push(
      <div key={i} className="calendar-day">
        {i}
      </div>
    );
  }

  return days;
};

// Handle previous year click
const handlePrevYearClick = () => {
  setCurrentYear((prevYear) => prevYear - 1);
};

// Handle next year click
const handleNextYearClick = () => {
  setCurrentYear((prevYear) => prevYear + 1);
};

// Handle month selection
const handleMonthSelect = (monthIndex) => {
  setCurrentMonth(monthIndex);
  generateCalendar()
};

// Handle dark mode toggle

  return (
    <div className='project-container'>
      <div className='project-main'>
        <div className='project-details'>
          <div className='project-icon'><FaProjectDiagram className='FaProjectDiagram' /></div>
          <div className='project-card'>
            <p>Active Projects</p>
            <h5>835</h5><span>5.02%</span>
          </div>
          <p className='para1'>Projects This Month</p>
        </div>
        <div  className='project-details'>
        <div className='project-icon'><LuFileBadge2  className='FaProjectDiagram'/></div>
         <div className='project-card'>
            <p>New Leads</p>
            <h5>7,552</h5><span>3.58%</span>
          </div>
          <p className='para1'>Leads this Month</p>
        </div>
        <div className='project-details'>
        <div className='project-icon'><IoTimer   className='FaProjectDiagram'/></div>
        <div className='project-card'>
            <p>Total Hours</p>
            <h5>7,552</h5><span>3.58%</span>
          </div>
          <p className='para1'>Work This Month</p>
        </div>
      </div>
      <div className='graph-container'>
        <Bar options={options} data={data}/>
      </div>
      <div className="calendar">
        <h4>UP COMMING SHEDULES</h4>
      <div className="calendar-header">
        <span className="month-picker" onClick={() => handleMonthSelect(currentMonth)}>{monthNames[currentMonth]}</span>
        <div className="year-picker">
          <span className="year-change" onClick={handlePrevYearClick}>{"<"}</span>
          <span id="year">{currentYear}</span>
          <span className="year-change" onClick={handleNextYearClick}>{">"}</span>
        </div>
      </div>
      <div className="calendar-body">
        <div className="calendar-week-day">
          <div>Sun</div>
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
        </div>
        <div className="calendar-days">
          {generateCalendar()}
        </div>
      </div>
      <div className="calendar-footer">
      </div>
    </div>
    <div className='project-events'>
      <div className='events1'>
        <h4>Events:</h4>
        <ul>
          <li><span>09</span><p>Development planning</p></li>
          <li><span>12</span><p>Design New UI and Check Sales</p></li>
          <li><span>25</span><p>Weekely Catchup</p></li>
          <li><span>27</span><p>Client Meeting</p></li>
        </ul>
      </div>
    </div>
    <div className='Active-projects'>
      <div>
        <h4>Active Projects</h4>
        <table>
          <thead>
            <tr>
              <th>Project Name</th>
              <th>Project Lead</th>
              <th>Progress</th>
              <th>Status</th>
              <th>Due Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Brand Logo Design</td>
              <td>Ganesh</td>
              <td>53%</td>
              <td>In Progress</td>
              <td>06 sep 2021</td>
            </tr>
            <tr>
              <td>Redesign - Landing Page</td>
              <td>Vasanthi</td>
              <td>53%</td>
              <td>Completed</td>
              <td>21 sep 2021</td>
            </tr>
            <tr>
              <td>Multipurpose Template</td>
              <td>Ravi Kumer</td>
              <td>53%</td>
              <td>Inprogress</td>
              <td>21 sep 2021</td>
            </tr>
            <tr>
              <td> Template</td>
              <td>Nivas</td>
              <td>53%</td>
              <td>Inprogress</td>
              <td>21 sep 2021</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div className='canva1'>
      <canvas className='canva2' ref={chartRef}style={{width:"10px",height:"10px"}}></canvas>
    </div>
    </div>
  )
}

export default Projects



// <div className="calender">
//         <div className="image">
//             <h2>UP COMMING SHEDULES</h2>
//         </div>
//         <div className="date">
//             <div className="day">S</div>
//             <div className="day">M</div>
//             <div className="day">T</div>
//             <div className="day">W</div>
//             <div className="day">T</div>
//             <div className="day">F</div>
//             <div className="day">S</div>
//             <div className="number">1</div>
//             <div className="number">2</div>
//             <div className="number">3</div>
//             <div className="number">4</div>
//             <div className="number">5</div>
//             <div className="number">6</div>
//             <div className="number">7</div>
//             <div className="number">8</div>
//             <div className="number">9</div>
//             <div className="number">10</div>
//             <div className="number">11</div>
//             <div className="number">12</div>
//             <div className="number">13</div>
//             <div className="number">14</div>
//             <div className="number">15</div>
//             <div className="number">16</div>
//             <div className="number">17</div>
//             <div className="number">18</div>
//             <div className="number">19</div>
//             <div className="number">20</div>
//             <div className="number">21</div>
//             <div className="number">22</div>
//             <div className="number active">23</div>
//             <div className="number">24</div>
//             <div className="number">25</div>
//             <div className="number">26</div>
//             <div className="number">27</div>
//             <div className="number">28</div>
//             <div className="number">29</div>
//             <div className="number">30</div>
//         </div>
//     </div>