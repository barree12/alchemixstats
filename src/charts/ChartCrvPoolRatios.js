import React from 'react';
import { Chart } from 'react-chartjs-2';

export default class ChartCrvPoolRatios extends React.Component {

  render(){  
  let alUsd3CrvRatio = (this.props.multifarmData.alUsdCrvInTreasury + this.props.multifarmData.alUsdCrvInElixir) / this.props.alAssetCrvSupply.alUsd3Crv;
  let alEthCrvRatio = (this.props.multifarmData.alEthCrvInTreasury + this.props.multifarmData.alEthCrvInElixir) / this.props.alEthCrvTotalValue;
  let alUsdFraxBpCrvRatio = this.props.multifarmData.alUsdFraxBpInElixir / this.props.alAssetCrvSupply.alUsdFraxBp;
  const helperPointer = this;

  return (
      <div className="chart-container-3">
        <Chart
          type='bar' 
          data={{
            labels: ["alUSDFRAXBP", "alUSD3CRV", "alETH Curve"],
            datasets: [{
              label: 'Owned',
              data: [
                Math.round(alUsdFraxBpCrvRatio*10000)/100,
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
                Math.round((1-alUsdFraxBpCrvRatio)*10000)/100,
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
                            ((context.dataset.label === 'Owned' && context.label === 'alUSDFRAXBP') ? (Math.round(helperPointer.props.multifarmData.alUsdFraxBpInElixir/10000)/100 + "M") : "") +
                            ((context.dataset.label === 'External' && context.label === 'alUSDFRAXBP') ? (Math.round((helperPointer.props.alAssetCrvSupply.alUsdFraxBp - helperPointer.props.multifarmData.alUsdFraxBpInElixir)/10000)/100 + "M") : "") +
                            ((context.dataset.label === 'Owned' && context.label === 'alUSD3CRV') ? (Math.round((helperPointer.props.multifarmData.alUsdCrvInTreasury + helperPointer.props.multifarmData.alUsdCrvInElixir)/10000)/100 + "M") : "") +
                            ((context.dataset.label === 'External' && context.label === 'alUSD3CRV') ? (Math.round((helperPointer.props.alAssetCrvSupply.alUsd3Crv - helperPointer.props.multifarmData.alUsdCrvInTreasury - helperPointer.props.multifarmData.alUsdCrvInElixir)/10000)/100 + "M") : "") +
                            ((context.dataset.label === 'Owned' && context.label === "alETH Curve") ? (Math.round((helperPointer.props.multifarmData.alEthCrvInTreasury + helperPointer.props.multifarmData.alEthCrvInElixir)/10000)/100 + "M") : "") +
                            ((context.dataset.label === 'External' && context.label === "alETH Curve") ? (Math.round((helperPointer.props.alEthCrvTotalValue - helperPointer.props.multifarmData.alEthCrvInTreasury - helperPointer.props.multifarmData.alEthCrvInElixir)/10000)/100 + "M") : "")
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