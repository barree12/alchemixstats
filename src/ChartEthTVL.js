import React from 'react';
import { Line } from 'react-chartjs-2';

export default class ChartEthTVL extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      chartLoading: true,
      transmuterUsdTVL: [],
      alchemistUsdTVL: []
    }

  }

  componentDidMount() {
    this.calculateUsdTVL();
  }

  calculateUsdTVL(){
      let alchemistUsdTVL = [];
      let transmuterUsdTVL = [];
      for(let i=0;i<this.props.ethAlchemistTVL.length;i++){
        alchemistUsdTVL[i] = Math.round(this.props.ethAlchemistTVL[i]*this.props.ethPricesForTVL[i]/10000)/100;
      }
      for(let i=0;i<this.props.ethTransmuterTVL.length;i++){
        transmuterUsdTVL[i] = Math.round(this.props.ethTransmuterTVL[i]*this.props.ethPricesForTVL[i]/10000)/100;
      }
      this.setState({ alchemistUsdTVL: alchemistUsdTVL, transmuterUsdTVL: transmuterUsdTVL, chartLoading: false });
  }

  render(){  
  
const helperPointer = this;

  return (
      <div className="chart-container-3">
        {this.state.chartLoading ? "Loading..." :
        <Line 
          data={{
            labels: this.props.ethTVLDates,
            datasets: [{
              label: 'Alchemist ETH TVL',
              data: this.props.toggle ? this.props.ethAlchemistTVL : this.state.alchemistUsdTVL,
              backgroundColor: 'rgba(161,175,255,0.8)',
              borderColor: 'rgba(240,238,129,1)',
              borderWidth: 1,
              pointRadius: 0,
              pointBorderColor: '#ffffff',
              fill: true,
            },
            {
              label: 'Transmuter ETH TVL',
              data: this.props.toggle ? this.props.ethTransmuterTVL : this.state.transmuterUsdTVL,
              backgroundColor: 'rgba(115,136,255,0.8)',
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
                    if(helperPointer.props.toggle) return data.datasets[tooltipItem.datasetIndex].label + ': ' + tooltipItem.value + ' ETH';
                    else return data.datasets[tooltipItem.datasetIndex].label + ': $' + tooltipItem.value + 'M';
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
        /> }
      </div>
    );
  }
}