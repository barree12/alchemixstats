import React from 'react';
import { Chart } from 'react-chartjs-2';

import 'chartjs-adapter-date-fns';

export default class ChartAlusdPrice extends React.Component {

  render(){  
  //let dates = this.props.active.dai ? [...this.props.data.dai.date] : (this.props.active.usdc ? [...this.props.data.usdc.date] : [...this.props.data.usdt.date]);
  let dates = [...this.props.data.usdc.date];
  let values = [...this.props.data.usdc.peg];
  let valuesPerc = [...this.props.data.usdc.pegPerc];
  //let values10m = this.props.active.dai ? [...this.props.data.dai.peg10m] : (this.props.active.usdc ? [...this.props.data.usdc.peg10m] : [...this.props.data.usdt.peg10m]);
  //let values10mPerc = this.props.active.dai ? [...this.props.data.dai.peg10mPerc] : (this.props.active.usdc ? [...this.props.data.usdc.peg10mPerc] : [...this.props.data.usdt.peg10mPerc]);
  //console.log(values)
  const helperPointer = this;
  
  return (
      <div className="chart-container-3">
        <Chart
          type='line' 
          data={{
            labels: dates,
            datasets: [{
              label: '1m trade',
              data: this.props.toggle ? valuesPerc : values,
              backgroundColor: 'rgba(240,238,129,0.8)',
              borderColor: 'rgba(240,238,129,1)',
              borderWidth: 1,
              pointRadius: 0,
              pointBorderColor: '#ffffff',
              fill: false,
            }
            /*{
              label: '10m trade',
              data: this.props.toggle ? values10mPerc : values10m,
              backgroundColor: 'rgba(255,255,255,0.8)',
              borderColor: 'rgba(255,255,255,1)',
              borderWidth: 1,
              pointRadius: 0,
              pointBorderColor: '#ffffff',
              fill: false,
              hidden: true
            }*/]
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
                callbacks: {
                  label: function(context) {
                      let label = context.dataset.label || '';
                      if (context.parsed.y !== null) {
                          if(helperPointer.props.toggle) label += ': ' + Math.round(context.parsed.y*10000)/10000 + '%';
                          else label += ': $' + Math.round(context.parsed.y*10000)/10000;
                      }
                      return label;
                  }
                }
              },
              legend: {
                display: false,
                position: 'top',
                labels: {
                  color: '#F5C09A',
                  usePointStyle: true,
                  pointStyle: 'circle'
                }
              },
            },
            
            responsive: true,
            maintainAspectRatio: false,
            
            scales: {
              xAxes: {
                  type: 'time',
                  time: {
                    tooltipFormat: "yyyy-MM-dd",
                  },
                  grid: {
                    color: 'rgba(0, 0, 0, 0.0)',
                    tickMarkLength: 10,
                  },
                  ticks: {
                    maxTicksLimit: 10,
                  },
              },
              yAxes: {
                  grid: {
                    color: 'rgba(0, 0, 0, 0.0)',
                    tickMarkLength: 10,
                  },
                  beginAtZero: false,
                }
            }
          }}
        />
      </div>
    );
  }
}