import React, { Component } from 'react';
import Web3 from 'web3';
import { addresses, abis } from '../Constants';

export default class EarnArrakis extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      aprLoading: true,
      baseApr: 0,
      rewardApr: 0
    }
    
  }

  componentDidMount(){
    this.getData();
  }

  getSubgraphRequestOptions(query){
    return {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: query })
    }
  }
    
  getData() {
    let baseQuery=`{
      aprInfos(where: {
        id: "0xb06a77021a0041527a998ce4d6c95b256a906bca"
      }) {
        averageApr
      }
    }`
    let rewardQuery=`{
      rewards(where: {
        id: "0xdbdb4d16eda451d0503b854cf79d55697f90c8df-0x83c1aef2d4ce3b7c09930ad1cdda626839f93608"
      }) {
        amount
      }
    }`

    Promise.all([fetch("https://api.thegraph.com/subgraphs/name/arrakisfinance/vault-v1-mainnet", this.getSubgraphRequestOptions(baseQuery)).then(res => res.json()),
    fetch("https://api.thegraph.com/subgraphs/name/arrakisfinance/gauge-registry-mainnet", this.getSubgraphRequestOptions(rewardQuery)).then(res => res.json())
    ])
    .then(([baseApr, rewardApr]) => {
      this.setState({ aprLoading: false, baseApr: 0, rewardApr: 0 })

    })
    .catch(function(err) {
      console.log(err.message);
    });
  }
  
  render() {
    return (
      <div>
        <div className="earn-yield-protocol-name">
          <img src={ require('../logos/premia.png').default } alt="Premia logo" className="image" /> Premia Finance
          </div>

          <div className="earn-yield-row">
            
            <div className="earn-yield-strat">
              UniV3 alETH/alUSD
            </div>
            <div className="earn-yield-chain">
              <img src={ require('../logos/eth.png').default } alt="ETH logo" className="image" />
            </div>
            
            <div className="earn-yield-alasset">
              <img src={ require('../logos/aleth_blue.svg').default } alt="alETH logo" className="image" />
              <img src={ require('../logos/alusd.svg').default } alt="alUSD logo" className="image" />
            </div>
            <div className="earn-yield-reward">
            <img src={ require('../logos/alcx_logo.png').default } alt="ALCX logo" className="image" />
            </div>
            <div className="earn-yield-yield">
              {this.state.aprLoading ? "0" : Math.round(this.state.baseApr*100)/100}%
            </div>
            <div className="earn-yield-link">
              <a href="https://beta.arrakis.finance/vaults/1/0xB06a77021a0041527A998ce4d6C95b256a906Bca" target="_blank" rel="noreferrer">Deposit</a>
            </div>
          </div>
        </div>);
  }
}