import React, { Component } from 'react';

export default class EarnTokemak extends Component {

  constructor(props) {
    super(props);

    this.state = {
      aprLoading: true,
      apr: 0
    }
  }

  componentDidMount(){
    this.getData();
  }
    
  parseResult(result){
    let alUsdReactor = "0x7211508d283353e77b9a7ed2f22334c219ad4b4c";
    for(let i=0;i<result.chains[0].pools.length;i++){
      if(result.chains[0].pools[i].address === alUsdReactor) {
        this.setState({ aprLoading: false, apr: result.chains[0].pools[i].liquidityProviderApr })
      }
    }
  }

  getData() {

    fetch("https://auto-rewards-prod-bucket-pool-stats-api-tokemakxyz.s3.amazonaws.com/current.json")
      .then(res => res.json())
      .then(
        (result) => {
          this.parseResult(result)
        },
        (error) => {
          console.log(error)
        }
      )
    }

  render() {
    return (
      <div>
        <div className="earn-yield-protocol-name">
          <img src={ require('../logos/tokemak.png').default } alt="Tokemak logo" className="image" />
          Tokemak
        </div>

        <div className="earn-yield-row">
          <div className="earn-yield-strat">
            alUSD reactor
          </div>
          <div className="earn-yield-chain">
            <img src={ require('../logos/eth.png').default } alt="ETH logo" className="image" />
          </div>
          
          <div className="earn-yield-alasset">
            <img src={ require('../logos/alusd.png').default } alt="alUSD logo" className="image" />
          </div>
          <div className="earn-yield-reward">
          <img src={ require('../logos/tokemak.png').default } alt="TOKE logo" className="image" />
          </div>
          <div className="earn-yield-yield">
            {this.state.aprLoading ? "0" : Math.round(this.state.apr*10000)/100}%
          </div>
        </div>
      </div>);
  }
}