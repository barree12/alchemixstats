import React from 'react';
import { Line } from 'react-chartjs-2';
import { calculateEmissionScheduleChart, createDateArray } from './Functions'

function createLabels() {
  let labels = [];
  for(let i=0;i<350;i++) labels[i]=i;
  return labels;
}

function ChartEmissions(){
    return (
      <div className="chart-container-2">
        <Line 
          data={{
            labels: createDateArray(),
            datasets: [{
              label: 'Weekly Emissions',
              data: calculateEmissionScheduleChart().emissionArray,
              backgroundColor: 'rgba(52,131,235,0.5)',
              borderColor: 'rgba(52,131,235,1)',
              borderWidth: 1,
              fill: true,
              //cubicInterpolationMode: 'monotone',
              //borderJoinStyle: 'round',
              //pointBorderWidth: 0,
              pointRadius: 0,
              pointBorderColor: '#ffffff',
              yAxisID: 'emissions',
            },
            {
              label: 'Total Supply',
              data: calculateEmissionScheduleChart().supplyArray,
              backgroundColor: 'rgba(240,238,129,0.5)',
              borderColor: 'rgba(240,238,129,1)',
              borderWidth: 1,
              pointRadius: 0,
              pointBorderColor: '#ffffff',
              fill: true,
              yAxisID: 'supply',
            }]
          }}
            options={{
              hover: {
                mode: 'nearest',
                intersect: false,
              },
              tooltips: {
                enabled: true,
                intersect: false,
                mode: 'nearest',
                cornerRadius: 1,
                caretPadding: 5,
                caretSize: 10,
                position: 'nearest',
                displayColors: false
              },
              responsive: true,
              legend: {
                display: true,
                position: 'top',
                labels: {
                  fontColor: '#F5C09A',
                  usePointStyle: true,
                  pointStyle: 'circle'
                }
              },
              scales: {
                xAxes: [
                  {
                    gridLines: {
                      color: 'rgba(0, 0, 0, 0.0)',
                      tickMarkLength: 10,
                    },
                    ticks: {
                      maxTicksLimit: 10,
                    },
                  },
                ],
                yAxes: [
                  {
                    position: 'left',
                    id: 'supply',
                    gridLines: {
                      color: 'rgba(0, 0, 0, 0.0)',
                      tickMarkLength: 10,
                    },
                    ticks: {
                      beginAtZero: true,
                    },
                    scaleLabel: {
                      display: true,
                      labelString: 'Total Supply',
                    },
                  },
                  {
                    position: 'right',
                    id: 'emissions',
                    gridLines: {
                      color: 'rgba(0, 0, 0, 0.0)',
                    },
                    ticks: {
                      beginAtZero: true,
                    },
                    scaleLabel: {
                      display: true,
                      labelString: 'Weekly Emissions',
                    },
                  },
                ],
              },
            }}
            height={500}
            width={1000}
        />
      </div>
    )
}

export default ChartEmissions;