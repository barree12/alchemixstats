import React from 'react';
import { Chart } from 'react-chartjs-2';

export default class ChartV2AlchemistEthTVL extends React.Component {

  render(){  
    
  return (
      <div className="chart-container-3">
        <Chart
          type='line' 
          data={{
            labels: this.props.alchemistTvl.date,
            datasets: [{
              label: 'yvWETH',
              data: this.props.alchemistTvl.yvWeth,
              backgroundColor: 'rgba(35,148,54,0.8)',
              borderColor: 'rgba(240,238,129,1)',
              borderWidth: 1,
              pointRadius: 0,
              pointBorderColor: '#ffffff',
              fill: true,
            },
            {
              label: 'aWETH',
              data: this.props.alchemistTvl.aWeth,
              backgroundColor: 'rgba(115,136,255,0.9)',
              borderColor: 'rgba(240,238,129,1)',
              borderWidth: 1,
              pointRadius: 0,
              pointBorderColor: '#ffffff',
              fill: true,
            },
            {
              label: 'wstETH',
              data: this.props.alchemistTvl.wstEth,
              backgroundColor: 'rgba(255,204,75,0.7)',
              borderColor: 'rgba(240,238,129,1)',
              borderWidth: 1,
              pointRadius: 0,
              pointBorderColor: '#ffffff',
              fill: true,
            },
            {
              label: 'rETH',
              data: this.props.alchemistTvl.rEth,
              backgroundColor: 'rgba(161,175,255,1)',
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
                },
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