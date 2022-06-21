import React from 'react';
import { Doughnut } from 'react-chartjs-2';

function ChartDonut(){
    return (
      <div className="chart-container">
        <Doughnut 
            data={{
            labels: ['Redirected to Treasury', 'Staking - ALCX/ETH SLP', 'Staking - gALCX', 
            'alAssets - alUSD3CRV', 'alAssets - alETHCRV', 'Fantom - Beethoven X alUSD/USDC',
            'alAssets - d3pool', 'alAssets - Saddle alETH', 'Fantom - Spooky gALCX/FTM', 'Fantom - Spirit gALCX/FTM'],
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
            legend: {
              display: true,
              position: 'right',
              labels: {
                fontColor: '#F5C09A',
                usePointStyle: true,
                pointStyle: 'circle'
              }
            },
            tooltips: {
              callbacks: {
                label: function(tooltipItem, data) {
                  return data.labels[tooltipItem.index] + ': ' + data.datasets[0].data[tooltipItem.index] + '%';
                },
              },
            }
            }}
        />
      </div>
    )
}

export default ChartDonut;