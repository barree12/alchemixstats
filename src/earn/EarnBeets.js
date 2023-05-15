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
      poolGetPool (id: "0xff2753aaba51c9f84689b9bd0a21b3cf380a1cff00000000000000000000072e") { 
        id name dynamicData {
          apr { total }
        }
      } 
    }`

    fetch("https://backend-v2.beets-ftm-node.com", this.getSubgraphRequestOptions(query))
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({ aprLoading: false, apr: result.data.poolGetPool.dynamicData.apr.total })
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
            Beets alUSD
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
              <a href="https://beets.fi/pool/0xff2753aaba51c9f84689b9bd0a21b3cf380a1cff00000000000000000000072e" target="_blank" rel="noreferrer">Deposit</a>
          </div>
        </div>
      </div>);
  }
}