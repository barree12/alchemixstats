import React, { Component } from 'react';

export default class EarnVelo extends Component {

  constructor(props) {
    super(props);

    this.state = {
      aprLoading: true,
      aprStable: 0,
      aprEth: 0,
      aprOpAlUsd: 0,
      aprOpAlEth: 0,
      aprMaiAlUsd: 0,
      aprFraxEth: 0,
      aprFraxUsd: 0
    }
  }

  componentDidMount(){
    this.getData();
  }
    
  parseResult(result){
    let stablePool = "0xe75a3f4bf99882ad9f8aebab2115873315425d00";
    let ethPool = "0x6fd5bee1ddb4dbbb0b7368b080ab99b8ba765902";
    let opAlUsd = "0x78fa29412998acedd7728b4cf5623ee5e2f8f589";
    let opAlEth = "0x49b5c691685aaeeaaaff57ab6ccef081a165f5bb";
    let maiAlUsd = "0x16e7e0960a74b0ea3e61118a0c0eae8f83d43d7c";
    let fraxEth = "0x87383ec35af6f0d58db242960898ac4d8c9f83a6";
    let fraxUsd = "0x27fcbf9832d9a23b595169d0c5a4a090ba55b634";
    let stableApr = 0;
    let ethApr = 0;
    let opAlUsdApr = 0;
    let opAlEthApr = 0;
    let maiAlUsdApr = 0;
    let fraxEthApr = 0;
    let fraxUsdApr = 0;
    for(let i=0;i<result.data.length;i++){
      if(result.data[i].address === stablePool) stableApr = result.data[i].apr;
      if(result.data[i].address === ethPool) ethApr = result.data[i].apr;
      if(result.data[i].address === opAlUsd) opAlUsdApr = result.data[i].apr;
      if(result.data[i].address === opAlEth) opAlEthApr = result.data[i].apr;
      if(result.data[i].address === maiAlUsd) maiAlUsdApr = result.data[i].apr;
      if(result.data[i].address === fraxEth) fraxEthApr = result.data[i].apr;
      if(result.data[i].address === fraxUsd) fraxUsdApr = result.data[i].apr;
    }
    this.setState({ aprLoading: false, aprStable: stableApr, aprEth: ethApr, aprOpAlUsd: opAlUsdApr, aprOpAlEth: opAlEthApr, aprMaiAlUsd: maiAlUsdApr, aprFraxEth: fraxEthApr, aprFraxUsd: fraxUsdApr })
    console.log(result)
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
              alUSD-USDC
            </div>
            <div className="earn-yield-chain">
              <img src={ require('../logos/op.png').default } alt="Optimism logo" className="image" />
            </div>
            
            <div className="earn-yield-alasset">
              <img src={ require('../logos/alusd.svg').default } alt="alUSD logo" className="image" />
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
              alUSD-FRAX
            </div>
            <div className="earn-yield-chain">
              <img src={ require('../logos/op.png').default } alt="Optimism logo" className="image" />
            </div>
            
            <div className="earn-yield-alasset">
              <img src={ require('../logos/alusd.svg').default } alt="alUSD logo" className="image" />
            </div>
            <div className="earn-yield-reward">
              <img src={ require('../logos/velo_round.png').default } alt="Velodrome logo" className="image" />
            </div>
            <div className="earn-yield-yield">
              {this.state.aprLoading ? "0" : Math.round(this.state.aprFraxUsd*100)/100}%
            </div>
            <div className="earn-yield-link">
              <a href="https://app.velodrome.finance/liquidity/manage?address=0x27fcbf9832d9a23b595169d0c5a4a090ba55b634" target="_blank" rel="noreferrer">Deposit</a>
            </div>
          </div>

          <div className="earn-yield-row">
            
            <div className="earn-yield-strat">
              alUSD-MAI
            </div>
            <div className="earn-yield-chain">
              <img src={ require('../logos/op.png').default } alt="Optimism logo" className="image" />
            </div>
            
            <div className="earn-yield-alasset">
              <img src={ require('../logos/alusd.svg').default } alt="alUSD logo" className="image" />
            </div>
            <div className="earn-yield-reward">
              <img src={ require('../logos/velo_round.png').default } alt="Velodrome logo" className="image" />
            </div>
            <div className="earn-yield-yield">
              {this.state.aprLoading ? "0" : Math.round(this.state.aprMaiAlUsd*100)/100}%
            </div>
            <div className="earn-yield-link">
              <a href="https://app.velodrome.finance/liquidity/manage?address=0x16e7e0960a74b0ea3e61118a0c0eae8f83d43d7c" target="_blank" rel="noreferrer">Deposit</a>
            </div>
          </div>
          
          <div className="earn-yield-row">
            
            <div className="earn-yield-strat">
              alUSD-OP
            </div>
            <div className="earn-yield-chain">
              <img src={ require('../logos/op.png').default } alt="Optimism logo" className="image" />
            </div>
            
            <div className="earn-yield-alasset">
              <img src={ require('../logos/alusd.svg').default } alt="alUSD logo" className="image" />
            </div>
            <div className="earn-yield-reward">
              <img src={ require('../logos/velo_round.png').default } alt="Velodrome logo" className="image" />
            </div>
            <div className="earn-yield-yield">
              {this.state.aprLoading ? "0" : Math.round(this.state.aprOpAlUsd*100)/100}%
            </div>
            <div className="earn-yield-link">
              <a href="https://app.velodrome.finance/liquidity/manage?address=0x78fa29412998acedd7728b4cf5623ee5e2f8f589" target="_blank" rel="noreferrer">Deposit</a>
            </div>
          </div>

          <div className="earn-yield-row">
            
            <div className="earn-yield-strat">
              alETH-WETH
            </div>
            <div className="earn-yield-chain">
              <img src={ require('../logos/op.png').default } alt="Optimism logo" className="image" />
            </div>
            
            <div className="earn-yield-alasset">
              <img src={ require('../logos/aleth_blue.svg').default } alt="alETH logo" className="image" />
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

          <div className="earn-yield-row">
            
            <div className="earn-yield-strat">
              alETH-frxETH
            </div>
            <div className="earn-yield-chain">
              <img src={ require('../logos/op.png').default } alt="Optimism logo" className="image" />
            </div>
            
            <div className="earn-yield-alasset">
              <img src={ require('../logos/aleth_blue.svg').default } alt="alETH logo" className="image" />
            </div>
            <div className="earn-yield-reward">
              <img src={ require('../logos/velo_round.png').default } alt="Velodrome logo" className="image" />
            </div>
            <div className="earn-yield-yield">
              {this.state.aprLoading ? "0" : Math.round(this.state.aprFraxEth*100)/100}%
            </div>
            <div className="earn-yield-link">
              <a href="https://app.velodrome.finance/liquidity/manage?address=0x87383ec35af6f0d58db242960898ac4d8c9f83a6" target="_blank" rel="noreferrer">Deposit</a>
            </div>
          </div>

          <div className="earn-yield-row">
            
            <div className="earn-yield-strat">
              alETH-OP
            </div>
            <div className="earn-yield-chain">
              <img src={ require('../logos/op.png').default } alt="Optimism logo" className="image" />
            </div>
            
            <div className="earn-yield-alasset">
              <img src={ require('../logos/aleth_blue.svg').default } alt="alETH logo" className="image" />
            </div>
            <div className="earn-yield-reward">
              <img src={ require('../logos/velo_round.png').default } alt="Velodrome logo" className="image" />
            </div>
            <div className="earn-yield-yield">
              {this.state.aprLoading ? "0" : Math.round(this.state.aprOpAlEth*100)/100}%
            </div>
            <div className="earn-yield-link">
              <a href="https://app.velodrome.finance/liquidity/manage?address=0x49b5c691685aaeeaaaff57ab6ccef081a165f5bb" target="_blank" rel="noreferrer">Deposit</a>
            </div>
          </div>
      </div>);
  }
}