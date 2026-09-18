import React from 'react';
import { Chart } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';

export default class ChartAlEthConvexRates extends React.Component {

  render(){  
 
  return (
      <div className="chart-container-3">
        <Chart 
          type='line'
          data={{
            labels: this.props.convexRates.date,
            datasets: [{
              label: 'alUSD-frxUSD',
              data: this.props.convexRates.alUsdFrxUsd,
              backgroundColor: 'rgba(54, 181, 195, 0.8)',
              borderColor: 'rgba(54, 181, 195,1)',
              borderWidth: 1,
              pointRadius: 0,
              pointBorderColor: '#ffffff',
              fill: false,
            },
            {
              label: 'alUSD-sDola',
              data: this.props.convexRates.alUsdSdola,
              backgroundColor: 'rgba(240,238,129,0.8)',
              borderColor: 'rgba(240,238,129,1)',
              borderWidth: 1,
              pointRadius: 0,
              pointBorderColor: '#ffffff',
              fill: false,
            },
            {
              label: 'alUSD-USDC',
              data: this.props.convexRates.alUsdUsdc,
              backgroundColor: 'rgba(229, 129, 240, 0.8)',
              borderColor: 'rgba(229, 129, 240, 1)',
              borderWidth: 1,
              pointRadius: 0,
              pointBorderColor: '#ffffff',
              fill: false,
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
                  callbacks: {
                    label: function(context) {
                        let label = context.dataset.label || '';

                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed.y !== null) {
                            label += Math.round(context.parsed.y*10000)/10000 + "%";
                        }
                        return label;
                    }
                }
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
                    stacked: false
                  }
              }
            }}
        />
      </div>
    );
  }
}