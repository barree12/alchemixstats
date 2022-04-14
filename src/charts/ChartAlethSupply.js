import React from 'react';
import { Line } from 'react-chartjs-2';

export default class ChartAlethSupply extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      dates: [],
      values: [],
      isLoading: true
    };
  }

  componentDidMount() {
    this.getData();
  }

  calculateArrays(result){
    let dates = [];
    let values = [];
    for(let i=0;i<result.length;i++){
      dates[i] = result[i].BALANCE_DATE;
      values[i] = result[i].TOTAL;
    }
    this.setState({ dates: dates, values: values, isLoading: false });
  }

  getData() {
    fetch("https://api.flipsidecrypto.com/api/v2/queries/99e8751d-c54b-42d0-bf9e-520dc3ce2562/data/latest")
      .then(res => res.json())
      .then(
        (result) => {
          this.calculateArrays(result)
        },
        (error) => {
          console.log(error)
        }
      )
  }

  render(){  
  
  return (
      <div className="chart-container-3">
        {this.state.isLoading === true ? "Loading..." :
        <Line 
          data={{
            labels: this.state.dates,
            datasets: [{
              label: 'Inflation',
              data: this.state.values,
              backgroundColor: 'rgba(115,136,255,0.5)',
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
                mode: 'nearest',
                cornerRadius: 1,
                caretPadding: 5,
                caretSize: 10,
                position: 'nearest',
                displayColors: false,
                callbacks: {
                  label: function(tooltipItem, data) {
                    return 'alETH supply: ' + Math.round(tooltipItem.value*100)/100;
                  },
                },
              },
              responsive: true,
              maintainAspectRatio: false,
              legend: {
                display: false,
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
                  }
                ],
              }
            }}
        /> }
      </div>
    );
  }
}