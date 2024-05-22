import React, { Component } from 'react';

export default class EarnConvex extends Component {

  constructor(props) {
    super(props);

    this.state = {
      aprLoading: true,
      apr3Crv: 0,
      aprFrax: 0,
      aprAlEth: 0,
      aprFrxEth: 0,
      aprRgUsd: 0
    }
  }

  componentDidMount(){
    this.getData();
  }
    
  parseResult(result){
    console.log(result)
    let apr3Crv = result.apys["37"].baseApy + result.apys["37"].crvApy;
    let aprAlEth = result.apys["factory-stable-ng-36"].baseApy + result.apys["factory-stable-ng-36"].crvApy;
    let aprFrax = result.apys["factory-v2-147"].baseApy + result.apys["factory-v2-147"].crvApy;
    let aprFrxEth = result.apys["factory-v2-253"].baseApy + result.apys["factory-v2-253"].crvApy;
    let aprRgUsd = result.apys["factory-stable-ng-122"].baseApy + result.apys["factory-stable-ng-122"].crvApy;
    this.setState({ aprLoading: false, 
      apr3Crv: apr3Crv, 
      aprAlEth: aprAlEth, 
      aprFrax: aprFrax,
      aprFrxEth: aprFrxEth,
      aprRgUsd: aprRgUsd
    });
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
            <img src={ require('../logos/cvx.png').default } alt="Convex logo" className="image" /> Convex
          </div>

          <div className="earn-yield-row">
            
            <div className="earn-yield-strat">
              alUSD-3CRV
            </div>
            <div className="earn-yield-chain">
              <img src={ require('../logos/eth.png').default } alt="ETH logo" className="image" />
            </div>
            
            <div className="earn-yield-alasset">
              <img src={ require('../logos/alusd.svg').default } alt="alUSD logo" className="image" />
            </div>
            <div className="earn-yield-reward">
              <img src={ require('../logos/crv.png').default } alt="Curve logo" className="image" />
              <img src={ require('../logos/cvx.png').default } alt="Convex logo" className="image" />
            </div>
            <div className="earn-yield-yield">
              {this.state.aprLoading ? "0" : Math.round(this.state.apr3Crv*100)/100}%
            </div>
            <div className="earn-yield-link">
              <a href="https://curve.fi/#/ethereum/pools/alusd/deposit" target="_blank" rel="noreferrer">Deposit</a>
            </div>
          </div>

          <div className="earn-yield-row">
            
            <div className="earn-yield-strat">
              alUSD-FRAXBP
            </div>
            <div className="earn-yield-chain">
              <img src={ require('../logos/eth.png').default } alt="ETH logo" className="image" />
            </div>
            
            <div className="earn-yield-alasset">
              <img src={ require('../logos/alusd.svg').default } alt="alUSD logo" className="image" />
            </div>
            <div className="earn-yield-reward">
              <img src={ require('../logos/crv.png').default } alt="Curve logo" className="image" />
              <img src={ require('../logos/cvx.png').default } alt="Convex logo" className="image" />
            </div>
            <div className="earn-yield-yield">
              {this.state.aprLoading ? "0" : Math.round(this.state.aprFrax*100)/100}%
            </div>
            <div className="earn-yield-link">
              <a href="https://curve.fi/#/ethereum/pools/factory-v2-147/deposit" target="_blank" rel="noreferrer">Deposit</a>
            </div>
          </div>

          <div className="earn-yield-row">
            
            <div className="earn-yield-strat">
              alUSD-rgUSD
            </div>
            <div className="earn-yield-chain">
              <img src={ require('../logos/eth.png').default } alt="ETH logo" className="image" />
            </div>
            
            <div className="earn-yield-alasset">
              <img src={ require('../logos/alusd.svg').default } alt="alUSD logo" className="image" />
            </div>
            <div className="earn-yield-reward">
              <img src={ require('../logos/crv.png').default } alt="Curve logo" className="image" />
              <img src={ require('../logos/cvx.png').default } alt="Convex logo" className="image" />
            </div>
            <div className="earn-yield-yield">
              {this.state.aprLoading ? "0" : Math.round(this.state.aprRgUsd*100)/100}%
            </div>
            <div className="earn-yield-link">
              <a href="https://curve.fi/#/ethereum/pools/factory-stable-ng-122/deposit" target="_blank" rel="noreferrer">Deposit</a>
            </div>
          </div>
          
          <div className="earn-yield-row">
            
            <div className="earn-yield-strat">
              alETH-WETH
            </div>
            <div className="earn-yield-chain">
              <img src={ require('../logos/eth.png').default } alt="ETH logo" className="image" />
            </div>
            
            <div className="earn-yield-alasset">
              <img src={ require('../logos/aleth_blue.svg').default } alt="alETH logo" className="image" />
            </div>
            <div className="earn-yield-reward">
              <img src={ require('../logos/crv.png').default } alt="Curve logo" className="image" />
              <img src={ require('../logos/cvx.png').default } alt="Convex logo" className="image" />
            </div>
            <div className="earn-yield-yield">
              {this.state.aprLoading ? "0" : Math.round(this.state.aprAlEth*100)/100}%
            </div>
            <div className="earn-yield-link">
              <a href="https://curve.fi/#/ethereum/pools/factory-stable-ng-36/deposit" target="_blank" rel="noreferrer">Deposit</a>
            </div>
          </div>

          <div className="earn-yield-row">
            
            <div className="earn-yield-strat">
              alETH-frxETH
            </div>
            <div className="earn-yield-chain">
              <img src={ require('../logos/eth.png').default } alt="ETH logo" className="image" />
            </div>
            
            <div className="earn-yield-alasset">
              <img src={ require('../logos/aleth_blue.svg').default } alt="alETH logo" className="image" />
            </div>
            <div className="earn-yield-reward">
              <img src={ require('../logos/crv.png').default } alt="Curve logo" className="image" />
              <img src={ require('../logos/cvx.png').default } alt="Convex logo" className="image" />
            </div>
            <div className="earn-yield-yield">
              {this.state.aprLoading ? "0" : Math.round(this.state.aprFrxEth*100)/100}%
            </div>
            <div className="earn-yield-link">
              <a href="https://curve.fi/#/ethereum/pools/factory-v2-253/deposit" target="_blank" rel="noreferrer">Deposit</a>
            </div>
          </div>
      </div>);
  }
}