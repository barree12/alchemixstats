import React from 'react';
import { Chart } from 'react-chartjs-2';
import { saveAs } from 'file-saver'; 

export default class ChartMainnetTransmuterEth extends React.Component {

  saveCanvas() {
       //save to png
       const canvasSave = document.getElementById('mainnetEthTransmuter');
       canvasSave.toBlob(function (blob) {
           saveAs(blob, "mainnet_transmuter_eth.png")
       })
   }

  render(){  
    
  return (
      <div className="chart-container-3">
        <div onClick={() => {this.saveCanvas()}}><img src={ require('../logos/download_button.png').default } alt="download logo" className="image-menu" /></div>
        <Chart
          type='line' 
          id='mainnetEthTransmuter'
          data={{
            labels: this.props.transmuterStats.date,
            datasets: [{
              label: 'MYT Deposits',
              data: this.props.transmuterStats.ethMainnet,
              backgroundColor: 'rgba(35,148,54,0.8)',
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
                  callbacks: {
                    label: function(context) {
                        let label = context.dataset.label || '';
                        if (context.parsed.y !== null) {
                          label += ': ' + context.parsed.y + ' ETH';
                        }
                        return label;
                    }
                  },
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