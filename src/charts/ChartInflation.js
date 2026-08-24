import React from 'react';
import { Chart } from 'react-chartjs-2';
import { calculateEmissionScheduleChart, createDateArray } from '../Functions';
import { saveAs } from 'file-saver'; 

function saveCanvas() {
       //save to png
       const canvasSave = document.getElementById('inflation');
       canvasSave.toBlob(function (blob) {
           saveAs(blob, "inflation.png")
       })
   }

function ChartInflation(){

    return (
      <div className="chart-container-2">
          <a onClick={() => {saveCanvas()}}><img src={ require('../logos/download_button.png').default } alt="download logo" className="image-menu" /></a>
        <Chart 
          type='line'
          id='inflation'
          data={{
            labels: createDateArray(),
            datasets: [{
              label: 'Inflation',
              data: calculateEmissionScheduleChart().inflationArray,
              backgroundColor: 'rgba(240,238,129,0.5)',
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
                  mode: 'nearest',
                  cornerRadius: 1,
                  caretPadding: 5,
                  caretSize: 10,
                  position: 'nearest',
                  displayColors: false,
                  callbacks: {
                    label: function(context) {
                        let label = context.dataset.label || '';
                        if (context.parsed.y !== null) {
                          label = context.parsed.y + '%';
                        }
                        return label;
                    }
                  }
                },
                legend: {
                  display: false,
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
                    beginAtZero: true
                  }
              }
            }}
        />
      </div>
    )
}

export default ChartInflation;