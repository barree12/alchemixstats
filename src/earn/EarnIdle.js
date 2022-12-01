import React, { Component } from 'react';

const seniorTranche = '0x790e38d85a364dd03f682f5ecdc88f8ff7299908';
const juniorTranche = '0xa0e8c9088afb3fa0f40ecdf8b551071c34aa1aa4';

export default class EarnIdle extends Component {

  constructor(props) {
    super(props);

    this.state = {
      aprLoading: true,
      seniorApr: 0,
      juniorApr: 0
    }
  }

  componentDidMount(){
    this.getData();
  }

  calculateAprs(subgraphResponse){
    let juniorApr = 0;
    let seniorApr = 0;
    for(let i=0;i<subgraphResponse.length;i++){
      if(subgraphResponse[i].id.split("_")[0] === seniorTranche) {
        seniorApr = Math.round(subgraphResponse[i].apr/Math.pow(10, 16))/100;
        break;
      } 
    }
    for(let i=0;i<subgraphResponse.length;i++){
      if(subgraphResponse[i].id.split("_")[0] === juniorTranche) {
        juniorApr = Math.round(subgraphResponse[i].apr/Math.pow(10, 16))/100;
        break;
      } 
    }
    this.setState({ aprLoading: false, seniorApr: seniorApr, juniorApr: juniorApr })
  }

  getSubgraphRequestOptions(query){
    return {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: query })
    }
  }
    
  getData() {
    let querySenior=`{
      trancheInfos(
        orderBy: timeStamp
        orderDirection: desc
      ) {
        id
        apr
        totalSupply
        contractValue
      }
    }`

    fetch("https://api.thegraph.com/subgraphs/name/samster91/idle-tranches", this.getSubgraphRequestOptions(querySenior)).then(res => res.json())
      .then(
        (result) => { this.calculateAprs(result.data.trancheInfos) },
        (error) => { console.log(error) })
  }

  render() {
    return (
      <div>
        <div className="earn-yield-protocol-name">
            <img src={ require('../logos/idle_round.png').default } alt="Idle logo" className="image" /> Idle Finance
          </div>

          <div className="earn-yield-row">
            
            <div className="earn-yield-strat">
              alUSD3Crv Senior Tranche
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
              {this.state.aprLoading ? "0" : this.state.seniorApr}%
            </div>
            <div className="earn-yield-link">
              <a href="https://app.idle.finance/#/tranches/senior/convex/ALUSD3CRV" target="_blank" rel="noreferrer">Deposit</a>
            </div>
          </div>
          
          <div className="earn-yield-row">
            
            <div className="earn-yield-strat">
              alUSD3Crv Junior Tranche
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
              {this.state.aprLoading ? "0" : this.state.juniorApr}%
            </div>
            <div className="earn-yield-link">
              <a href="https://app.idle.finance/#/tranches/junior/convex/ALUSD3CRV" target="_blank" rel="noreferrer">Deposit</a>
            </div>
          </div>
      </div>);
  }
}