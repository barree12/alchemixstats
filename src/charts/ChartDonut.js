import React from 'react';
import { Chart } from 'react-chartjs-2';

function ChartDonut(){
  
    return (
      <div className="chart-container">
        <Chart
            type='doughnut' 
            data={{
            labels: ['alAssets - alETH Curve', 'alAssets - FraxBP Curve', 'Staking - ALCX/ETH SLP', 'Staking - gALCX', 
            'alAssets - alUSD3CRV', 'alAssets - Saddle alETH', 'Arbitrum - Saddle L2D4', 'Fantom - Beets alUSD/USDC',
             'Fantom - Spooky gALCX/FTM'],
            datasets: [{
              label: '',
              data: [29, 29, 20, 13, 4.5, 2, 1, 1, 0.5],
              backgroundColor: [ 
                '#d6d456',
                '#f0ee81',
                '#0052bd',
                '#3483eb',
                '#b5b331',
                '#fffda1',
                '#1f1f1f',               
                '#4d4d4d',
                '#666666'
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