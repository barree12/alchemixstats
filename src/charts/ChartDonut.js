import React from 'react';
import { Chart } from 'react-chartjs-2';

function ChartDonut(){
  
    return (
      <div className="chart-container">
        <Chart
            type='doughnut' 
            data={{
            labels: ['alAssets - FraxBP Curve', 'Staking - ALCX/ETH BPT', 'Staking - gALCX', 'alAssets - alUSD3CRV'],
            datasets: [{
              label: '',
              data: [31, 20, 13, 5],
              backgroundColor: [ 
                '#f0ee81',
                '#0052bd',
                '#3483eb',
                '#b5b331'
              ],
              borderColor: [
                '#F5C09A'
              ],
              borderWidth: 1
          }]
            }}
            options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: true,
                position: 'right',
                labels: {
                  color: '#F5C09A',
                  usePointStyle: true,
                  pointStyle: 'circle'
                }
              },
              tooltip: {
                callbacks: {
                  label: function(context) {
                      let label = context.label || '';
                      if (context.parsed.y !== null) {
                        label += ': ' + context.parsed + '%';
                      }
                      return label;
                  }
                }
              }
            }
          }}
        />
      </div>
    )
}

export default ChartDonut;