import React, { Component } from 'react';

export default class EarnVelo extends Component {

  constructor(props) {
    super(props);

    this.state = {
      aprLoading: true,
      aprStable: 0,
      aprEth: 0
    }
  }

  componentDidMount(){
    this.getData();
  }
    
  parseResult(result){
    let stablePool = "0xe75a3f4bf99882ad9f8aebab2115873315425d00";
    let ethPool = "0x6fd5bee1ddb4dbbb0b7368b080ab99b8ba765902";
    let stableApr = 0;
    let ethApr = 0;
    for(let i=0;i<result.data.length;i++){
      if(result.data[i].address === stablePool) stableApr = result.data[i].apr;
      if(result.data[i].address === ethPool) ethApr = result.data[i].apr;
    }
    this.setState({ aprLoading: false, aprStable: stableApr, aprEth: ethApr })
  }

  getData() {

    fetch("https://api.velodrome.finance/api/v1/pairs")
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
            <img src={ require('../logos/velo_round.png').default } alt="Velodrome logo" className="image" /> Velodrome
          </div>

          <div className="earn-yield-row">
            
            <div className="earn-yield-strat">
              alUSD-USDC LP
            </div>
            <div className="earn-yield-chain">
              <img src={ require('../logos/op.png').default } alt="Optimism logo" className="image" />
            </div>
            
            <div className="earn-yield-alasset">
              <img src={ require('../logos/alusd.png').default } alt="alUSD logo" className="image" />
            </div>
            <div className="earn-yield-reward">
              <img src={ require('../logos/velo_round.png').default } alt="Velodrome logo" className="image" />
            </div>
            <div className="earn-yield-yield">
              {this.state.aprLoading ? "0" : Math.round(this.state.aprStable*100)/100}%
            </div>
            <div className="earn-yield-link">
              <a href="https://app.velodrome.finance/liquidity/manage?address=0xe75a3f4bf99882ad9f8aebab2115873315425d00" target="_blank" rel="noreferrer">Deposit</a>
            </div>
          </div>
          
          <div className="earn-yield-row">
            
            <div className="earn-yield-strat">
              alETH-WETH LP
            </div>
            <div className="earn-yield-chain">
              <img src={ require('../logos/op.png').default } alt="Optimism logo" className="image" />
            </div>
            
            <div className="earn-yield-alasset">
              <img src={ require('../logos/aleth.png').default } alt="alETH logo" className="image" />
            </div>
            <div className="earn-yield-reward">
              <img src={ require('../logos/velo_round.png').default } alt="Velodrome logo" className="image" />
            </div>
            <div className="earn-yield-yield">
              {this.state.aprLoading ? "0" : Math.round(this.state.aprEth*100)/100}%
            </div>
            <div className="earn-yield-link">
              <a href="https://app.velodrome.finance/liquidity/manage?address=0x6fd5bee1ddb4dbbb0b7368b080ab99b8ba765902" target="_blank" rel="noreferrer">Deposit</a>
            </div>
          </div>
      </div>);
  }
}