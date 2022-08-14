import React from 'react';
import { Chart } from 'react-chartjs-2';
import { calculateEmissionScheduleChart, createDateArray } from '../Functions';


function ChartEmissions(){
  
    return (
      <div className="chart-container-2">
        <Chart
          type='line' 
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
                },
                legend: {
                  display: true,
                  position: 'top',
                  labels: {
                    color: '#F5C09A',
                    usePointStyle: true,
                    pointStyle: 'circle'
                  }
                }
              },
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                emissions: {
                  position: 'left',
                  type: 'linear',
                  grid: {
                    color: 'rgba(0, 0, 0, 0.0)',
                    tickMarkLength: 10,
                  }
                },
                supply: {
                  position: 'right',
                  type: 'linear',
                  grid: {
                    color: 'rgba(0, 0, 0, 0.0)',
                    tickMarkLength: 10,
                  }
                },
                xScale: {
                  axis: 'x',
                  grid: {
                    color: 'rgba(0, 0, 0, 0.0)',
                    tickMarkLength: 10,
                  },
                  ticks: {
                    maxTicksLimit: 10
                  }
                }
              }
            }}

        />
      </div>
    )
}

export default ChartEmissions;