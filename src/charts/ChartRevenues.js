import React from 'react';
import { Chart } from 'react-chartjs-2';

export default class ChartRevenues extends React.Component {

  render(){  
    
  let currentMonth = new Date();
  let monthlength = 1000 * 60 * 60 * 24 * 30;
  let monthArray = [];
  for(let i=0;i<12;i++){
    let tempDate = new Date(currentMonth.getTime() - monthlength*i); 
    monthArray[i] = tempDate.getFullYear() + "/" + (tempDate.getMonth()+1);
  }
  monthArray.reverse();
  let inverseTreasury = this.props.revenue.treasury.slice(0,12);
  inverseTreasury.reverse();
  let inverseElixir = this.props.revenue.elixir.slice(0,12);
  inverseElixir.reverse();
  let inverseHarvests = this.props.revenue.harvest.slice(0,12);
  inverseHarvests.reverse();

  return (
      <div className="chart-container-3">
        <Chart 
          type='bar'
          data={{
            labels: monthArray,
            datasets: [{
              label: 'Harvests',
              data: inverseHarvests,
              backgroundColor: 'rgba(161,175,255,0.8)',
              borderColor: 'rgba(240,238,129,1)',
              borderWidth: 1,
              pointRadius: 0,
              pointBorderColor: '#ffffff',
              fill: true,
            },
            {
              label: 'Treasury',
              data: inverseTreasury,
              backgroundColor: 'rgba(49,204,75,0.5)',
              borderColor: 'rgba(240,238,129,1)',
              borderWidth: 1,
              pointRadius: 0,
              pointBorderColor: '#ffffff',
              fill: true,
            },
            {
              label: 'Elixirs',
              data: inverseElixir,
              backgroundColor: 'rgba(255,204,75,0.7)',
              borderColor: 'rgba(240,238,129,1)',
              borderWidth: 1,
              pointRadius: 0,
              pointBorderColor: '#ffffff',
              fill: true,
            }]
          }}
            options={{
              hover: {
                mode: 'index',
                intersect: false,
              },
              plugins: {
                tooltip: {
                  enabled: true,
                  intersect: false,
                  mode: 'index',
                  cornerRadius: 1,
                  caretPadding: 5,
                  caretSize: 10,
                  position: 'nearest',
                  displayColors: false,
                },
                legend: {
                  display: true,
                  position: 'top',
                  labels: {
                    color: '#F5C09A',
                    usePointStyle: true,
                    pointStyle: 'circle'
                  }
                }
              },
              responsive: true,
              maintainAspectRatio: false,
              
              scales: {
                xAxes: {
                    grid: {
                      color: 'rgba(0, 0, 0, 0.0)',
                      tickMarkLength: 10,
                    },
                    ticks: {
                      maxTicksLimit: 10,
                    },
                    stacked: true
                  },
                yAxes: {
                    grid: {
                      color: 'rgba(0, 0, 0, 0.0)',
                      tickMarkLength: 10,
                    },
                    beginAtZero: true,
                    stacked: true
                  }
              }
            }}
        />
      </div>
    );
  }
}