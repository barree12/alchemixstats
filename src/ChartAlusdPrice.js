import React from 'react';
import { Line } from 'react-chartjs-2';

export default class ChartAlusdPrice extends React.Component {

  render(){  
  
  return (
      <div className="chart-container-3">
        <Line 
          data={{
            labels: this.props.dates,
            datasets: [{
              label: 'Inflation',
              data: this.props.prices,
              backgroundColor: 'rgba(240,238,129,0.5)',
              borderColor: 'rgba(240,238,129,1)',
              borderWidth: 1,
              pointRadius: 0,
              pointBorderColor: '#ffffff',
              fill: false,
            }]
          }}
            options={{
              hover: {
                mode: 'nearest',
                intersect: false,
              },
              tooltips: {
                enabled: true,
                intersect: false,
                mode: 'nearest',
                cornerRadius: 1,
                caretPadding: 5,
                caretSize: 10,
                position: 'nearest',
                displayColors: false,
                callbacks: {
                  label: function(tooltipItem, data) {
                    return '$' + Math.round(tooltipItem.value*10000)/10000;
                  },
                },
              },
              responsive: true,
              maintainAspectRatio: false,
              legend: {
                display: false,
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