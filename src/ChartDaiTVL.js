import React from 'react';
import { Line } from 'react-chartjs-2';

export default class ChartDaiTVL extends React.Component {

  render(){  
  
  return (
      <div className="chart-container-3">
        <Line 
          data={{
            labels: this.props.tvlDates,
            datasets: [{
              label: 'Alchemist DAI TVL',
              data: this.props.daiAlchemistTVL,
              backgroundColor: 'rgba(35,148,54,0.8)',
              borderColor: 'rgba(240,238,129,1)',
              borderWidth: 1,
              pointRadius: 0,
              pointBorderColor: '#ffffff',
              fill: true,
            },
            {
              label: 'Transmuter DAI TVL',
              data: this.props.daiTransmuterTVL,
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
                mode: 'nearest',
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
                callbacks: {
                  label: function(tooltipItem, data) {
                    return data.datasets[tooltipItem.datasetIndex].label + ': $' + tooltipItem.value + 'M';
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
                      beginAtZero: true,
                    },
                    stacked: true
                  }
                ],
              }
            }}
        />
      </div>
    );
  }
}