import React from 'react';
import { Chart } from 'react-chartjs-2';

export default class ChartCrvPoolRatios extends React.Component {

  render(){  
  let alUsd3CrvRatio = (this.props.alUsd3CrvTreasury + this.props.alUsd3CrvElixir) / this.props.alAssetCrvSupply.alUsd3Crv;
  let alEthCrvRatio = (this.props.alEthCrvTreasury + this.props.alEthCrvElixir) / this.props.alEthCrvTotalValue;
  const helperPointer = this;

  return (
      <div className="chart-container-3">
        <Chart
          type='bar' 
          data={{
            labels: ["alUsd3Crv", "alEthCrv"],
            datasets: [{
              label: 'Owned',
              data: [
                Math.round(alUsd3CrvRatio*10000)/100,
                Math.round(alEthCrvRatio*10000)/100
              ],
              backgroundColor: 'rgba(115,136,255,0.8)',
              borderColor: 'rgba(255,204,75,1)',
              borderWidth: 1,
              pointRadius: 0,
              pointBorderColor: '#ffffff',
              fill: true,
            },
            {
              label: 'External',
              data: [
                Math.round((1-alUsd3CrvRatio)*10000)/100,
                Math.round((1-alEthCrvRatio)*10000)/100
              ],
              backgroundColor: 'rgba(255,204,75,0.7)',
              borderColor: 'rgba(255,204,75,1)',
              borderWidth: 1,
              pointRadius: 0,
              pointBorderColor: '#ffffff',
              fill: true,
            }]
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
                        if (context.parsed.y !== null) {
                            label += ': ' + context.parsed.y + '% - $';
                            label +=
                            ((context.dataset.label === 'Owned' && context.label === 'alUsd3Crv') ? (Math.round((helperPointer.props.alUsd3CrvTreasury + helperPointer.props.alUsd3CrvElixir)/10000)/100 + "M") : "") +
                            ((context.dataset.label === 'External' && context.label === 'alUsd3Crv') ? (Math.round((helperPointer.props.alAssetCrvSupply.alUsd3Crv - helperPointer.props.alUsd3CrvTreasury - helperPointer.props.alUsd3CrvElixir)/10000)/100 + "M") : "") +
                            ((context.dataset.label === 'Owned' && context.label === "alEthCrv") ? (Math.round((helperPointer.props.alEthCrvTreasury + helperPointer.props.alEthCrvElixir)/10000)/100 + "M") : "") +
                            ((context.dataset.label === 'External' && context.label === "alEthCrv") ? (Math.round((helperPointer.props.alEthCrvTotalValue - helperPointer.props.alEthCrvTreasury - helperPointer.props.alEthCrvElixir)/10000)/100 + "M") : "")
                          }
                        return label;
                    }
                  }
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
                xAxes: {
                    grid: {
                      color: 'rgba(0, 0, 0, 0.0)',
                      tickMarkLength: 10,
                    },
                    ticks: {
                      maxTicksLimit: 10,
                    },
                    stacked: true
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