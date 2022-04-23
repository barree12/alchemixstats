import React from 'react';
import { Bar } from 'react-chartjs-2';

export default class ChartCrvPoolRatios extends React.Component {

  render(){  
  let alUsd3CrvRatio = (this.props.alUsd3CrvTreasury + this.props.alUsd3CrvElixir) / this.props.alAssetCrvSupply.alUsd3Crv;
  let alEthCrvRatio = (this.props.alEthCrvTreasury + this.props.alEthCrvElixir) / this.props.alEthCrvTotalValue;
  const helperPointer = this;

  return (
      <div className="chart-container-3">
        <Bar 
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
              tooltips: {
                enabled: true,
                intersect: false,
                mode: 'index',
                cornerRadius: 1,
                caretPadding: 5,
                caretSize: 10,
                position: 'nearest',
                displayColors: false,
                callbacks: {
                  label: function(tooltipItem, data) {
                    return data.datasets[tooltipItem.datasetIndex].label + ': ' + tooltipItem.value + '% - $' +
                    ((tooltipItem.datasetIndex === 0 && tooltipItem.label === "alUsd3Crv") ? (Math.round((helperPointer.props.alUsd3CrvTreasury + helperPointer.props.alUsd3CrvElixir)/10000)/100 + "M") : "") +
                    ((tooltipItem.datasetIndex === 1 && tooltipItem.label === "alUsd3Crv") ? (Math.round((helperPointer.props.alAssetCrvSupply.alUsd3Crv - helperPointer.props.alUsd3CrvTreasury - helperPointer.props.alUsd3CrvElixir)/10000)/100 + "M") : "") +
                    ((tooltipItem.datasetIndex === 0 && tooltipItem.label === "alEthCrv") ? (Math.round((helperPointer.props.alEthCrvTreasury + helperPointer.props.alEthCrvElixir)/10000)/100 + "M") : "") +
                    ((tooltipItem.datasetIndex === 1 && tooltipItem.label === "alEthCrv") ? (Math.round((helperPointer.props.alEthCrvTotalValue - helperPointer.props.alEthCrvTreasury - helperPointer.props.alEthCrvElixir)/10000)/100 + "M") : "")
                  },
                },
              },
              responsive: true,
              maintainAspectRatio: false,
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
                    stacked: true
                  },
                ],
                yAxes: [
                  {
                    gridLines: {
                      color: 'rgba(0, 0, 0, 0.0)',
                      tickMarkLength: 10,
                    },
                    ticks: {
                      beginAtZero: true,
                    },
                    stacked: true
                  }
                ],
              }
            }}
        />
      </div>
    );
  }
}