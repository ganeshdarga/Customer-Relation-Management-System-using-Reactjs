import React from 'react'
import { useState,useEffect } from 'react';
import { MdCampaign } from "react-icons/md";
import { FaArrowUp } from "react-icons/fa";
import { TbReportMoney } from "react-icons/tb";
import { SiGoogleads } from "react-icons/si";
import { IoTrophySharp } from "react-icons/io5";
import { FaIdeal } from "react-icons/fa6";
import { MdKeyboardArrowRight } from "react-icons/md";
import {Bar} from 'react-chartjs-2'
import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis
  } from "recharts";
  


  const labels=['Revenu','predecting Forecast','Goal']

  const options ={
    plugins:{
      legend:{
        position:'top'
      },
      title:{
        display:true,
        text:"Sales Forecast"
      }
    }
  }
  
  const data1 ={
    labels,
    datasets : [
      {
        label:'2020 Expences',
        data:[110,90,45],
        backgroundColor:'pink'
      },
    ]
  }
  



const data = [
    {
      subject: "2016",
      A: 120,
      B: 110,
      fullMark: 150
    },
    {
      subject: "2017",
      A: 98,
      B: 130,
      fullMark: 150
    },
    {
      subject: "2018",
      A: 86,
      B: 130,
      fullMark: 150
    },
    {
      subject: "2019",
      A: 99,
      B: 100,
      fullMark: 150
    },
    {
      subject: "2020",
      A: 85,
      B: 90,
      fullMark: 150
    },
    {
      subject: "2024",
      A: 65,
      B: 85,
      fullMark: 150
    }
  ];
  

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
  
    return <div className='icon2-container'><MdCampaign className='icon2-2'/>{animatedValue}K</div>
  };
  

const Crm = () => {
  return (
    <div className='crm-container'>
        <h3>CRM</h3>
        <p>Dashboard<MdKeyboardArrowRight /></p>
        <div className='crm-main1'>
        <div className='crm-main'>
            <div>
                <p>CAMPAIGN SENT</p>
                <AnimatedCounter value={197} duration={2000} />
                <FaArrowUp className='icon2-3' />
            </div>
        </div>
        <div className='crm-main'>
        <div>
                <p>ANNUAL PROFIT</p>
                <AnimatedCounter value={489} duration={2000} />
                <FaArrowUp className='icon2-3' />
            </div>
        </div>
        <div className='crm-main'>
        <div>
                <p>LEAD COVERSATION</p>
                <AnimatedCounter value={32} duration={2000} />
                <FaArrowUp className='icon2-3' />
            </div>
        </div>
        <div className='crm-main'>
        <div>
                <p>DAILY AVERAGE INCOME</p>
                <AnimatedCounter value={150} duration={2000} />
                <FaArrowUp className='icon2-3' />
            </div>
        </div>
        <div className='crm-main'>
        <div>
                <p>ANNUAL DEALS</p>
                <AnimatedCounter value={200} duration={2000} />
                <FaArrowUp className='icon2-3' />
            </div>
        </div>
        </div>
        
        <div  className='deals-container' style={{display:"flex", width:'500px', flexWrap:'wrap'}}>
        <h3>Deals Status/ <span style={{color:"black", fontSize:"20px"}}>02 Nov 2023to 31 Dec 2024</span><span><select className='dates1'>
            <option>Current Year</option>
            <option>Last Month</option>
            <option>Last Week</option>
            <option>Today</option>
            </select></span></h3>
          <hr></hr>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Last Contacted	</th>
              <th>Sales Representative</th>
              <th>Status</th>
              <th>	Deal Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Absternet LLC</td>
              <td>Sep 20, 2021</td>
              <td>Donald Risher</td>
              <td>Deal Won</td>
              <td>$100.1K</td>
            </tr>
            <tr>
              <td>Raitech Soft</td>
              <td>Sep 23, 2021</td>
              <td> Sofia Cunha</td>
              <td>	Intro Call</td>
              <td>	$150K</td>
            </tr>
            <tr>
              <td>William PVT</td>
              <td>	Sep 27, 2021</td>
              <td> Luis Rocha</td>
              <td>Stuck</td>
              <td>	$78.18K</td>
            </tr>
            <tr>
              <td> Loiusee LLP</td>
              <td>Sep 30, 2021</td>
              <td> Vitoria Rodrigues%</td>
              <td>Deal Won</td>
              <td>	$180K</td>
            </tr>
          </tbody>
        </table>
            
        </div>
        <div className='apex-cart' style={{backgroundColor:"white"}}>
            <h3>Deal Type <span style={{color:"black"}}>Sort By:<select>
                <option>Monthly</option>
                <option>Yearly</option>
                </select></span></h3><br></br>
                <hr></hr>
        <RadarChart className='apex'
      cx={300}
      cy={250}
      outerRadius={150}
      width={500}
      height={500}
      data={data}
    >
      <PolarGrid />
      <PolarAngleAxis dataKey="subject" />
      <PolarRadiusAxis />
      <Radar
        name="Mike"
        dataKey="A"
        stroke="#8884d8"
        fill="#8884d8"
        fillOpacity={0.6}
      />
    </RadarChart>
        </div>
        <div className='bar2'>
          <h3>Sales Forecast</h3><br></br>
          <hr></hr>
          <Bar className='bar2-2' options={options} data={data1}/>
        </div>
    
    </div>
  )
}

export default Crm