import React from 'react';
import { Doughnut } from 'react-chartjs-2';

function ChartDonut(){
    return (
      <div className="chart-container">
        <Doughnut 
            data={{
            labels: ['Staking - ALCX/ETH SLP', 'Bonds - CVX', 'Staking - tALCX', 'alAssets - alUSD3CRV',
            'Staking - ALCX', 'Bonds - ALCX/ETH SLP',  'alAssets - alETHCRV', 'Bonds - Toke', 'Fantom - Beethoven X alUSD/USDC',
            'alAssets - d3pool', 'alAssets - Saddle alETH', 'Fantom - Spooky gALCX/FTM', 'Fantom - Spirit gALCX/FTM'],
            datasets: [{
              label: '',
              data: [20, 17.5, 12, 11, 10, 10, 9, 2.5, 2.5, 2, 2, 0.83, 0.66],
              backgroundColor: [ 
                '#0052bd',
                '#0a8c24',
                '#106feb',
                '#b5b331',
                '#3483eb',
                '#14b835',
                '#d6d456',
                '#2bd64d',
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