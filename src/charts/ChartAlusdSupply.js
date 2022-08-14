import React from 'react';
import { Chart } from 'react-chartjs-2';

export default class ChartAlusdSupply extends React.Component {

  render(){  

  return (
      <div className="chart-container-3">
        <Chart
          type='line' 
          data={{
            labels: this.props.marketcapDates,
            datasets: [{
              label: '',
              data: this.props.marketcaps,
              backgroundColor: 'rgba(49,204,75,0.5)',
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
                          label = 'alUSD supply: ' + Math.round(context.parsed.y*100)/100 + 'M';
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
                    beginAtZero: true,
                  }
              }
            }}
        />
      </div>
    );
  }
}