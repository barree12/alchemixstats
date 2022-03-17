import React from 'react';
import { Doughnut } from 'react-chartjs-2';



function ChartDonut(){
    return (
      <div className="chart-container">
        <Doughnut 
            data={{
            labels: ['Staking - ALCX/ETH SLP', 'Bonds - CVX', 'Staking - tALCX', 'Staking - ALCX',
            'Bonds - ALCX/ETH SLP', 'alAssets - alUSD3CRV', 'Bonds - ETH', 'Bonds - DAI', 
             'alAssets - alETHCRV', 'Bonds - Toke', 'alAssets - d3pool', 'alAssets - alETHSaddle'],
            datasets: [{
              label: '',
              data: [20, 17.5, 12, 10, 10, 10, 5, 5, 5, 2.5, 2, 2],
              backgroundColor: [ 
                '#0052bd',
                '#0a8c24',
                '#106feb',
                '#3483eb',
                '#14b835',
                '#b5b331', 
                '#2bd64d',
                '#51ed70',
                '#d6d456',
                '#74f28d',
                '#f0ee81',
                '#fffda1'
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