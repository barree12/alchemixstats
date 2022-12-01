import React, { Component } from 'react';

export default class EarnBeets extends Component {
  
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
      pool (
        id: "0xa10285f445bcb521f1d623300dc4998b02f11c8f00000000000000000000043b"
      ) { 
        id name address totalLiquidity apr { 
          total 
        } 
      } 
    }`

    fetch("https://backend.beets-ftm-node.com/graphql", this.getSubgraphRequestOptions(query))
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({ aprLoading: false, apr: result.data.pool.apr.total })
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
          <img src={ require('../logos/beets_round.png').default } alt="Beets logo" className="image" /> Beethoven X
        </div>

        <div className="earn-yield-row">
          
          <div className="earn-yield-strat">
            Beets alUSD LP
          </div>
          <div className="earn-yield-chain">
              <img src={ require('../logos/ftm_small.png').default } alt="FTM logo" className="image" />
            </div>
          
          <div className="earn-yield-alasset">
            <img src={ require('../logos/alusd.svg').default } alt="alUSD logo" className="image" />
          </div>
          <div className="earn-yield-reward">
          <img src={ require('../logos/beets_round.png').default } alt="Beets logo" className="image" />
          <img src={ require('../logos/alcx_logo.png').default } alt="Alchemix logo" className="image" />
          </div>
          <div className="earn-yield-yield">
            {this.state.aprLoading ? "0" : Math.round(this.state.apr*10000)/100}%
          </div>
          <div className="earn-yield-link">
              <a href="https://beets.fi/pool/0xa10285f445bcb521f1d623300dc4998b02f11c8f00000000000000000000043b" target="_blank" rel="noreferrer">Deposit</a>
          </div>
        </div>
      </div>);
  }
}