import React from 'react';
import { Chart } from 'react-chartjs-2';

function ChartDonut(){
  
    return (
      <div className="chart-container">
        <Chart
            type='doughnut' 
            data={{
            labels: ['Redirected to Treasury', 'Staking - ALCX/ETH SLP', 'Staking - gALCX', 
            'alAssets - alUSD3CRV', 'alAssets - alETHCRV', 'Fantom - Beets alUSD/USDC',
            'alAssets - FraxBP Curve', 'alAssets - Saddle alETH', 'Fantom - Spooky gALCX/FTM', 'Fantom - Spirit gALCX/FTM'],
            datasets: [{
              label: '',
              data: [39, 20, 13, 11, 9, 2.5, 2, 2, 0.83, 0.66],
              backgroundColor: [ 
                '#0a8c24',
                '#0052bd',
                '#3483eb',
                '#b5b331',
                '#d6d456',
                '#1f1f1f',
                '#f0ee81',
                '#fffda1',
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