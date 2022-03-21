import React from 'react';
import { Line } from 'react-chartjs-2';

export default class ChartAlusdSupply extends React.Component {

  render(){  
  
  return (
      <div className="chart-container-3">
        <Line 
          data={{
            labels: this.props.marketcapDates,
            datasets: [{
              label: '',
              data: this.props.marketcaps,
              backgroundColor: 'rgba(49,204,75,0.5)',
              borderColor: 'rgba(240,238,129,1)',
              borderWidth: 1,
              pointRadius: 0,
              pointBorderColor: '#ffffff',
              fill: true,
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
                    return 'alUSD supply: $' + Math.round(tooltipItem.value*100)/100 + 'M';
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
                      beginAtZero: true,
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