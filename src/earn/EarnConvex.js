import React, { Component } from 'react';

export default class EarnConvex extends Component {

  constructor(props) {
    super(props);

    this.state = {
      aprLoading: true,
      apr3Crv: 0,
      aprFrax: 0,
      aprAlEth: 0
    }
  }

  componentDidMount(){
    this.getData();
  }
    
  parseResult(result){
    let apr3Crv = (result.apys.alusd.baseApy + result.apys.alusd.crvApy) * result.apys.alusd.crvPrice;
    let aprAlEth = (result.apys.aleth.baseApy + result.apys.aleth.crvApy) * result.apys.alusd.crvPrice;
    let aprFrax = (result.apys.alusdfraxbp.baseApy + result.apys.alusdfraxbp.crvApy) * result.apys.alusd.crvPrice;
    this.setState({ aprLoading: false, apr3Crv: apr3Crv, aprAlEth: aprAlEth, aprFrax: aprFrax });
  }

  getData() {

    fetch("https://www.convexfinance.com/api/curve-apys")
      .then(res => res.json())
      .then(
        (result) => {
          this.parseResult(result)
          //console.log(result)
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
            <img src={ require('../logos/cvx.png').default } alt="Convex logo" className="image" />Convex
          </div>

          <div className="earn-yield-row">
            
            <div className="earn-yield-strat">
              alUSD3Crv
            </div>
            <div className="earn-yield-chain">
              <img src={ require('../logos/eth.png').default } alt="ETH logo" className="image" />
            </div>
            
            <div className="earn-yield-alasset">
              <img src={ require('../logos/alusd.png').default } alt="alUSD logo" className="image" />
            </div>
            <div className="earn-yield-reward">
              <img src={ require('../logos/crv.png').default } alt="Curve logo" className="image" />
              <img src={ require('../logos/cvx.png').default } alt="Convex logo" className="image" />
            </div>
            <div className="earn-yield-yield">
              {this.state.aprLoading ? "0" : Math.round(this.state.apr3Crv*100)/100}%
            </div>
          </div>

          <div className="earn-yield-row">
            
            <div className="earn-yield-strat">
              alUSDFraxBPCrv
            </div>
            <div className="earn-yield-chain">
              <img src={ require('../logos/eth.png').default } alt="ETH logo" className="image" />
            </div>
            
            <div className="earn-yield-alasset">
              <img src={ require('../logos/alusd.png').default } alt="alUSD logo" className="image" />
            </div>
            <div className="earn-yield-reward">
              <img src={ require('../logos/crv.png').default } alt="Curve logo" className="image" />
              <img src={ require('../logos/cvx.png').default } alt="Convex logo" className="image" />
            </div>
            <div className="earn-yield-yield">
              {this.state.aprLoading ? "0" : Math.round(this.state.aprFrax*100)/100}%
            </div>
          </div>
          
          <div className="earn-yield-row">
            
            <div className="earn-yield-strat">
              alETHCrv
            </div>
            <div className="earn-yield-chain">
              <img src={ require('../logos/eth.png').default } alt="ETH logo" className="image" />
            </div>
            
            <div className="earn-yield-alasset">
              <img src={ require('../logos/aleth.png').default } alt="alETH logo" className="image" />
            </div>
            <div className="earn-yield-reward">
              <img src={ require('../logos/crv.png').default } alt="Curve logo" className="image" />
              <img src={ require('../logos/cvx.png').default } alt="Convex logo" className="image" />
            </div>
            <div className="earn-yield-yield">
              {this.state.aprLoading ? "0" : Math.round(this.state.aprAlEth*100)/100}%
            </div>
          </div>
      </div>);
  }
}