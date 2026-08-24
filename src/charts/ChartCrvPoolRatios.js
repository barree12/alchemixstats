import React from 'react';
import { Chart } from 'react-chartjs-2';
import { saveAs } from 'file-saver'; 

export default class ChartCrvPoolRatios extends React.Component {

  saveCanvas() {
       //save to png
       const canvasSave = document.getElementById('poolRatios');
       canvasSave.toBlob(function (blob) {
           saveAs(blob, "pool_ratios.png")
       })
   }


  render(){  
  let alEthFrxEthRatio = this.props.debankData.alEthFrxEthInElixir / this.props.alEthFrxEthTotalValue;
  let alUsdFrxUsdCrvRatio = this.props.debankData.alUsdFrxUsdInElixir / this.props.alAssetCrvSupply.alUsdFrxUsd;
  let alUsdSdolaRatio = this.props.debankData.alUsdSdolaInElixir / this.props.alAssetCrvSupply.alUsdSdola;
  let veloAlEthRatio = this.props.debankData.alEthWethVeloInElixir / this.props.debankData.veloAlEthWethPool;
  let veloAlEthPxEthRatio = this.props.debankData.alEthPxEthVeloInElixir / this.props.debankData.veloAlEthPxEthPool;
  let veloAlUsdRatio = this.props.debankData.alUsdUsdcVeloInElixir / this.props.debankData.veloAlUsdUsdcPool;
  let arbiAlEthRatio = this.props.debankData.alEthWethArbiInElixir / this.props.alEthWethArbiTotalValue;
  let arbiAlUsdRatio = this.props.debankData.alUsdUsdcArbiInElixir / this.props.alAssetCrvSupply.arbiAlUsdUsdc;

  const helperPointer = this;

  return (
      <div className="chart-container-3">
        <div onClick={() => {this.saveCanvas()}}><img src={ require('../logos/download_button.png').default } alt="download logo" className="image-menu" /></div>
        <Chart
          type='bar'
          id='poolRatios'
          data={{
            labels: ["alUSD-frxUSD", "alETH-frxETH", "alUSD-sDOLA", "Velo alUSD-USDC", "Velo alETH-WETH",  "Velo alETH-pxETH", "Arbi alUSD-USDC", "Arbi alETH-WETH"],
            datasets: [{
              label: 'Owned',
              data: [
                Math.round(alUsdFrxUsdCrvRatio*10000)/100,
                Math.round(alEthFrxEthRatio*10000)/100,
                Math.round(alUsdSdolaRatio*10000)/100,
                Math.round(veloAlUsdRatio*10000)/100,
                Math.round(veloAlEthRatio*10000)/100,
                Math.round(veloAlEthPxEthRatio*10000)/100,
                Math.round(arbiAlUsdRatio*10000)/100,
                Math.round(arbiAlEthRatio*10000)/100      
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
                Math.round((1-alUsdFrxUsdCrvRatio)*10000)/100,
                Math.round((1-alEthFrxEthRatio)*10000)/100,
                Math.round((1-alUsdSdolaRatio)*10000)/100,
                Math.round((1-veloAlUsdRatio)*10000)/100,
                Math.round((1-veloAlEthRatio)*10000)/100,
                Math.round((1-veloAlEthPxEthRatio)*10000)/100,
                Math.round((1-arbiAlUsdRatio)*10000)/100,
                Math.round((1-arbiAlEthRatio)*10000)/100
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
                            ((context.dataset.label === 'Owned' && context.label === 'alUSD-frxUSD') ? (Math.round(helperPointer.props.debankData.alUsdFrxUsdInElixir/10000)/100 + "M") : "") +
                            ((context.dataset.label === 'External' && context.label === 'alUSD-frxUSD') ? (Math.round((helperPointer.props.alAssetCrvSupply.alUsdFrxUsd - helperPointer.props.debankData.alUsdFrxUsdInElixir)/10000)/100 + "M") : "") +
                            ((context.dataset.label === 'Owned' && context.label === "alETH-frxETH") ? (Math.round(helperPointer.props.debankData.alEthFrxEthInElixir/10000)/100 + "M") : "") +
                            ((context.dataset.label === 'External' && context.label === "alETH-frxETH") ? (Math.round((helperPointer.props.alEthFrxEthTotalValue - helperPointer.props.debankData.alEthFrxEthInElixir)/10000)/100 + "M") : "") +
                            ((context.dataset.label === 'Owned' && context.label === "Velo alETH-WETH") ? (Math.round(helperPointer.props.debankData.alEthWethVeloInElixir/10000)/100 + "M") : "") +
                            ((context.dataset.label === 'External' && context.label === "Velo alETH-WETH") ? (Math.round((helperPointer.props.debankData.veloAlEthWethPool - helperPointer.props.debankData.alEthWethVeloInElixir)/10000)/100 + "M") : "") +
                            ((context.dataset.label === 'Owned' && context.label === "alUSD-sDOLA") ? (Math.round(helperPointer.props.debankData.alUsdSdolaInElixir/10000)/100 + "M") : "") +
                            ((context.dataset.label === 'External' && context.label === "alUSD-sDOLA") ? (Math.round((helperPointer.props.alAssetCrvSupply.alUsdSdola - helperPointer.props.debankData.alUsdSdolaInElixir)/10000)/100 + "M") : "") +
                            ((context.dataset.label === 'Owned' && context.label === "Velo alETH-pxETH") ? (Math.round(helperPointer.props.debankData.alEthPxEthVeloInElixir/10000)/100 + "M") : "") +
                            ((context.dataset.label === 'External' && context.label === "Velo alETH-pxETH") ? (Math.round((helperPointer.props.debankData.veloAlEthPxEthPool - helperPointer.props.debankData.alEthPxEthVeloInElixir)/10000)/100 + "M") : "") +
                            ((context.dataset.label === 'Owned' && context.label === "Velo alUSD-USDC") ? (Math.round(helperPointer.props.debankData.alUsdUsdcVeloInElixir/10000)/100 + "M") : "") +
                            ((context.dataset.label === 'External' && context.label === "Velo alUSD-USDC") ? (Math.round((helperPointer.props.debankData.veloAlUsdUsdcPool - helperPointer.props.debankData.alUsdUsdcVeloInElixir)/10000)/100 + "M") : "") +
                            ((context.dataset.label === 'Owned' && context.label === "Arbi alETH-WETH") ? (Math.round(helperPointer.props.debankData.alEthWethArbiInElixir/10000)/100 + "M") : "") +
                            ((context.dataset.label === 'External' && context.label === "Arbi alETH-WETH") ? (Math.round((helperPointer.props.alEthWethArbiTotalValue - helperPointer.props.debankData.alEthWethArbiInElixir)/10000)/100 + "M") : "") +
                            ((context.dataset.label === 'Owned' && context.label === "Arbi alUSD-USDC") ? (Math.round(helperPointer.props.debankData.alUsdUsdcArbiInElixir/10000)/100 + "M") : "") +
                            ((context.dataset.label === 'External' && context.label === "Arbi alUSD-USDC") ? (Math.round((helperPointer.props.alAssetCrvSupply.arbiAlUsdUsdc - helperPointer.props.debankData.alUsdUsdcArbiInElixir)/10000)/100 + "M") : "")
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