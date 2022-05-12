import React from 'react';
import { Line } from 'react-chartjs-2';

export default class ChartAlEthPrice extends React.Component {

  render(){  
  let dates = [...this.props.data.date];
  let values = [...this.props.data.peg];
  let valuesPerc = [...this.props.data.pegPerc];
  let values5k = [...this.props.data.peg5k];
  let values5kPerc = [...this.props.data.peg5kPerc];
  const helperPointer = this;
  return (
      <div className="chart-container-3">
        <Line 
          data={{
            labels: dates,
            datasets: [{
              label: '500 ETH trade',
              data: this.props.toggle ? valuesPerc : values,
              backgroundColor: 'rgba(240,238,129,0.8)',
              borderColor: 'rgba(240,238,129,1)',
              borderWidth: 1,
              pointRadius: 0,
              pointBorderColor: '#ffffff',
              fill: false,
            },
            {
              label: '5000 ETH trade',
              data: this.props.toggle ? values5kPerc : values5k,
              backgroundColor: 'rgba(255,255,255,0.8)',
              borderColor: 'rgba(255,255,255,1)',
              borderWidth: 1,
              pointRadius: 0,
              pointBorderColor: '#ffffff',
              fill: false,
              hidden: true
            }]
          }}
            options={{
              hover: {
                mode: 'index',
                intersect: false,
              },
              tooltips: {
                enabled: true,
                intersect: false,
                mode: 'index',
                cornerRadius: 1,
                caretPadding: 5,
                caretSize: 10,
                position: 'nearest',
                displayColors: false,
                /*callbacks: {
                  label: function(tooltipItem, data) {
                    if(helperPointer.props.toggle) return (Math.round(tooltipItem.value*10000)/10000) + '%';
                    else return '$' + Math.round(tooltipItem.value*10000)/10000;
                  },
                },*/
                callbacks: {
                  label: function(tooltipItem, data) {
                    if(helperPointer.props.toggle) return data.datasets[tooltipItem.datasetIndex].label + ': ' + (Math.round(tooltipItem.value*10000)/10000) + '%';
                    else return data.datasets[tooltipItem.datasetIndex].label + ': ' + Math.round(tooltipItem.value*10000)/10000 + ' ETH';
                  },
                },
              },
              responsive: true,
              maintainAspectRatio: false,
              legend: {
                display: true,
                position: 'top',
                labels: {
                  fontColor: '#F5C09A',
                  usePointStyle: true,
                  pointStyle: 'circle'
                }
              },
              scales: {
                xAxes: [
                  {
                    gridLines: {
                      color: 'rgba(0, 0, 0, 0.0)',
                      tickMarkLength: 10,
                    },
                    ticks: {
                      maxTicksLimit: 10,
                    },
                  },
                ],
                yAxes: [
                  {
                    gridLines: {
                      color: 'rgba(0, 0, 0, 0.0)',
                      tickMarkLength: 10,
                    },
                    ticks: {
                      beginAtZero: false,
                    },
                  }
                ],
              }
            }}
        />
      </div>
    );
  }
}