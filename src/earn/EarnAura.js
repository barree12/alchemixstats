import React, { Component } from 'react';

export default class EarnAura extends Component {
  
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

  getSubgraphRequestOptions(query){
    return {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: query })
    }
  }
    
  getData() {
    let query=`{
        pool(chainId: 1, id: "74") {
          aprs {
            total
            breakdown {
              value
              name
            }
          }
        } 
    }`

    fetch("https://data.aura.finance/graphql", this.getSubgraphRequestOptions(query))
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result)
          this.setState({ aprLoading: false, apr: result.data.pool.aprs.total })
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
          <img src={ require('../logos/aura.png').default } alt="Aura logo" className="image" /> Aura
        </div>

        <div className="earn-yield-row">
          
          <div className="earn-yield-strat">
            ALCX-ETH 80/20
          </div>
          <div className="earn-yield-chain">
              <img src={ require('../logos/eth.png').default } alt="ETH logo" className="image" />
            </div>
          
          <div className="earn-yield-alasset">
            <img src={ require('../logos/alcx_logo.png').default } alt="ALCX logo" className="image" />
          </div>
          <div className="earn-yield-reward">
          <img src={ require('../logos/aura.png').default } alt="Aura logo" className="image" />
          <img src={ require('../logos/balancer.png').default } alt="Balancer logo" className="image" />
          </div>
          <div className="earn-yield-yield">
            {this.state.aprLoading ? "0" : Math.round(this.state.apr*100)/100}%
          </div>
          <div className="earn-yield-link">
              <a href="https://app.aura.finance/#/1/pool/74" target="_blank" rel="noreferrer">Deposit</a>
          </div>
        </div>
      </div>);
  }
}