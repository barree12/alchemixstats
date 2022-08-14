import React from 'react';
import { Chart } from 'react-chartjs-2';

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
        <Chart
          type='line' 
          data={{
            labels: this.props.ethTVLDates,
            datasets: [{
              label: 'Alchemist ETH',
              data: this.props.toggle ? this.props.ethAlchemistTVL : this.state.alchemistUsdTVL,
              backgroundColor: 'rgba(161,175,255,0.8)',
              borderColor: 'rgba(240,238,129,1)',
              borderWidth: 1,
              pointRadius: 0,
              pointBorderColor: '#ffffff',
              fill: true,
            },
            {
              label: 'Transmuter ETH',
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
                          if(helperPointer.props.toggle) label += ': ' + context.parsed.y + ' ETH';
                          else label += ': $' + context.parsed.y + 'M';
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
        /> }
      </div>
    );
  }
}