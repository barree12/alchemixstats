import React from 'react';
import { Chart } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';

export default class ChartAlEthPrice extends React.Component {

  render(){  
  let dates = [...this.props.alEthPeg.date];
  let values = [...this.props.alEthPeg.peg];
  let valuesPerc = [...this.props.alEthPeg.pegPerc];
  //let values5k = [...this.props.alEthPeg.peg5k];
  //let values5kPerc = [...this.props.alEthPeg.peg5kPerc];
  const helperPointer = this;
  return (
      <div className="chart-container-3">
        <Chart 
          type='line'
          data={{
            labels: dates,
            datasets: [{
              label: '500 ETH trade',
              data: this.props.toggle ? valuesPerc : values,
              backgroundColor: 'rgba(240,238,129,0.8)',
              borderColor: 'rgba(240,238,129,1)',
              borderWidth: 1,
              pointRadius: 0,
              pointBorderColor: '#ffffff',
              fill: false,
            }
            /*{
              label: '5000 ETH trade',
              data: this.props.toggle ? values5kPerc : values5k,
              backgroundColor: 'rgba(255,255,255,0.8)',
              borderColor: 'rgba(255,255,255,1)',
              borderWidth: 1,
              pointRadius: 0,
              pointBorderColor: '#ffffff',
              fill: false,
              hidden: true
            }*/]
          }}
            options={{
              hover: {
                mode: 'index',
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

                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed.y !== null) {
                            label += Math.round(context.parsed.y*10000)/10000;
                            if(helperPointer.props.toggle) label += '%';
                            else label += ' ETH';
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
                    type: 'time',
                    time: {
                      tooltipFormat: "yyyy-MM-dd",
                    },
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
                    beginAtZero: false,
                  }
              }
            }}
        />
      </div>
    );
  }
}