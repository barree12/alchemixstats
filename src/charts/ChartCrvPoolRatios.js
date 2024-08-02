import React from 'react';
import { Chart } from 'react-chartjs-2';

export default class ChartCrvPoolRatios extends React.Component {

  render(){  
  let alEthFrxEthRatio = this.props.debankData.alEthFrxEthInElixir / this.props.alEthFrxEthTotalValue;
  let alUsdFraxBpCrvRatio = this.props.debankData.alUsdFraxBpInElixir / this.props.alAssetCrvSupply.alUsdFraxBp;
  let veloAlEthRatio = this.props.debankData.alEthWethVeloInElixir / this.props.debankData.veloAlEthWethPool;
  let veloAlUsdRatio = this.props.debankData.alUsdUsdcVeloInElixir / this.props.debankData.veloAlUsdUsdcPool;
  let ramsesAlEthRatio = this.props.debankData.alEthFrxEthRamsesInElixir / this.props.debankData.ramsesAlEthFrxEthPool;
  let ramsesAlUsdRatio = this.props.debankData.alUsdFraxRamsesInElixir / this.props.debankData.ramsesAlUsdFraxPool;
  //console.log(this.props.debankData.alEthWethVeloInElixir)

  const helperPointer = this;

  return (
      <div className="chart-container-3">
        <Chart
          type='bar' 
          data={{
            labels: ["alUSD-FRAXBP", "alETH-frxETH", "Velo alETH-WETH", "Velo alUSD-USDC", "Ramses alETH-frxETH", "Ramses alUSD-FRAX"],
            datasets: [{
              label: 'Owned',
              data: [
                Math.round(alUsdFraxBpCrvRatio*10000)/100,
                Math.round(alEthFrxEthRatio*10000)/100,
                Math.round(veloAlEthRatio*10000)/100,
                Math.round(veloAlUsdRatio*10000)/100,
                Math.round(ramsesAlEthRatio*10000)/100,
                Math.round(ramsesAlUsdRatio*10000)/100                
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
                Math.round((1-alEthFrxEthRatio)*10000)/100,
                Math.round((1-veloAlEthRatio)*10000)/100,
                Math.round((1-veloAlUsdRatio)*10000)/100,
                Math.round((1-ramsesAlEthRatio)*10000)/100,
                Math.round((1-ramsesAlUsdRatio)*10000)/100
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
                            ((context.dataset.label === 'Owned' && context.label === 'alUSD-FRAXBP') ? (Math.round(helperPointer.props.debankData.alUsdFraxBpInElixir/10000)/100 + "M") : "") +
                            ((context.dataset.label === 'External' && context.label === 'alUSD-FRAXBP') ? (Math.round((helperPointer.props.alAssetCrvSupply.alUsdFraxBp - helperPointer.props.debankData.alUsdFraxBpInElixir)/10000)/100 + "M") : "") +
                            ((context.dataset.label === 'Owned' && context.label === "alETH-frxETH") ? (Math.round(helperPointer.props.debankData.alEthFrxEthInElixir/10000)/100 + "M") : "") +
                            ((context.dataset.label === 'External' && context.label === "alETH-frxETH") ? (Math.round((helperPointer.props.alEthFrxEthTotalValue - helperPointer.props.debankData.alEthFrxEthInElixir)/10000)/100 + "M") : "") +
                            ((context.dataset.label === 'Owned' && context.label === "Velo alETH-WETH") ? (Math.round(helperPointer.props.debankData.alEthWethVeloInElixir/10000)/100 + "M") : "") +
                            ((context.dataset.label === 'External' && context.label === "Velo alETH-WETH") ? (Math.round((helperPointer.props.debankData.veloAlEthWethPool - helperPointer.props.debankData.alEthWethVeloInElixir)/10000)/100 + "M") : "") +
                            ((context.dataset.label === 'Owned' && context.label === "Velo alUSD-USDC") ? (Math.round(helperPointer.props.debankData.alUsdUsdcVeloInElixir/10000)/100 + "M") : "") +
                            ((context.dataset.label === 'External' && context.label === "Velo alUSD-USDC") ? (Math.round((helperPointer.props.debankData.veloAlUsdUsdcPool - helperPointer.props.debankData.alUsdUsdcVeloInElixir)/10000)/100 + "M") : "") +
                            ((context.dataset.label === 'Owned' && context.label === "Ramses alETH-frxETH") ? (Math.round(helperPointer.props.debankData.alEthFrxEthRamsesInElixir/10000)/100 + "M") : "") +
                            ((context.dataset.label === 'External' && context.label === "Ramses alETH-frxETH") ? (Math.round((helperPointer.props.debankData.ramsesAlEthFrxEthPool - helperPointer.props.debankData.alEthFrxEthRamsesInElixir)/10000)/100 + "M") : "") +
                            ((context.dataset.label === 'Owned' && context.label === "Ramses alUSD-FRAX") ? (Math.round(helperPointer.props.debankData.alUsdFraxRamsesInElixir/10000)/100 + "M") : "") +
                            ((context.dataset.label === 'External' && context.label === "Ramses alUSD-FRAX") ? (Math.round((helperPointer.props.debankData.ramsesAlUsdFraxPool - helperPointer.props.debankData.alUsdFraxRamsesInElixir)/10000)/100 + "M") : "")
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