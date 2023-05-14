import React from 'react';
import { Chart } from 'react-chartjs-2';

export default class ChartV2AlchemistTVL extends React.Component {

  render(){  
  let totalOther = [];
  for(let i=0;i<this.props.alchemistTvl.yvUsdt.length;i++){
    totalOther[i] = Math.round((this.props.alchemistTvl.yvUsdt[i] + this.props.alchemistTvl.aUsdc[i] +
      this.props.alchemistTvl.aDai[i] + this.props.alchemistTvl.vaDai[i] + this.props.alchemistTvl.vaFrax[i] +
      this.props.alchemistTvl.aFrax[i])*100)/100;
  }

  return (
      <div className="chart-container-3">
        <Chart
          type='line' 
          data={{
            labels: this.props.alchemistTvl.date,
            datasets: [{
              label: 'yvDAI',
              data: this.props.alchemistTvl.yvDai,
              backgroundColor: 'rgba(35,148,54,0.8)',
              borderColor: 'rgba(240,238,129,1)',
              borderWidth: 1,
              pointRadius: 0,
              pointBorderColor: '#ffffff',
              fill: true,
            },
            {
              label: 'yvUSDC',
              data: this.props.alchemistTvl.yvUsdc,
              backgroundColor: 'rgba(255,204,75,0.7)',
              borderColor: 'rgba(240,238,129,1)',
              borderWidth: 1,
              pointRadius: 0,
              pointBorderColor: '#ffffff',
              fill: true,
            },
            {
              label: 'vaUSDC',
              data: this.props.alchemistTvl.vaUsdc,
              backgroundColor: 'rgba(115,136,255,0.8)',
              borderColor: 'rgba(240,238,129,1)',
              borderWidth: 1,
              pointRadius: 0,
              pointBorderColor: '#ffffff',
              fill: true,
            },
            {
              label: 'Others',
              data: totalOther,
              backgroundColor: 'rgba(102,102,102,0.8)',
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
                          label += ': $' + context.parsed.y + 'M';
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