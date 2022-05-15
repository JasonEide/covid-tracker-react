import React, {useState, useEffect} from 'react';
import {fetchDailyData} from '../../api';
import {Line, Bar} from 'react-chartjs-2';
import styles from './chart.module.css';
import { Chart as ChartJS, registerables } from 'chart.js';
ChartJS.register(...registerables);


export default function Charts({data: {confirmed, recovered, deaths}, country}) {
  const [dailyData, setDailyData] = useState([]);
  
  useEffect(() => {
    const fetchAPI = async () => {
      setDailyData(await fetchDailyData());
    }
    fetchAPI();
  }, []);
  
  const lineChart = (
    dailyData.length
    ? (
        <Line
        data={{
          labels: dailyData.map(({date}) => date),
          datasets: [{
            data: dailyData.map(({confirmed: {total}}) => total),
            label: 'Infected',
            borderColor: '#3333ff',
            fill: true
          }, {
            data: dailyData.map(({deaths: {total}}) => total),
            label: 'Deaths',
            borderColor: 'rgba(255, 0, 0, 0.5)',
            fill: true
          }]
        }} 
        />
      ) : null
  );

  const barChart = (
    confirmed 
    ? (
      <Bar 
        data={{
          labels: ['Infected', 'Recovered', 'Deaths'],
          datasets: [{
            data: [confirmed.value, recovered.value, deaths.value],
            label: 'People', 
            backgroundColor: [
              'rgba(0, 0, 255, 0.5)',
              'rgba(0, 255, 0, 0.5)',
              'rgba(255, 0, 0, 0.5)'
            ]
          }]
        }}
        options={{
          legend: {display: false},
          title: {display: true, text:`Current state in ${country}`}
        }}
      />
    ) : null
  )
  
  return (
    <div className={styles.container}>
      {country ? barChart : lineChart}
    </div>
  )
}
