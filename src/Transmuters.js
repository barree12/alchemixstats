import React from 'react';
import LoadingComponent from './LoadingComponent';

export default class Transmuters extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
          transmuters: {},
          transmutersLoading: false,
        };
      }

    componentDidMount() {
      this.getTransmuterYields();
    }

    getTransmuterYields(){
      
      Promise.all([fetch("https://api.dune.com/api/v1/query/3849355/results?api_key=VirLip4gHVafKLfK4VBzK8E9SaUaskGE").then(res => res.json()),
        fetch("https://api.dune.com/api/v1/query/3861243/results?api_key=VirLip4gHVafKLfK4VBzK8E9SaUaskGE").then(res => res.json()),
        fetch("https://api.dune.com/api/v1/query/3862748/results?api_key=VirLip4gHVafKLfK4VBzK8E9SaUaskGE").then(res => res.json())
        ])
        .then(([mainnetEth, mainnetUsdc, optiEth]) => {
          let transmuters = { 
            mainnetEth: mainnetEth.result.rows[0].projected_yield_rate,
            mainnetUsdc: mainnetUsdc.result.rows[0].projected_yield_rate,
            optiEth: optiEth.result.rows[0].projected_yield_rate,
          }
          console.log(transmuters)
          this.setState({ transmuters: transmuters })
        })
      .catch(function(err) {
        console.log(err.message);
      });
      
    }

    render(){
        return (
            <>
                <div className="section-header">
                    <img src={ require('./logos/other_logo.png').default } alt="other logo" className="image3" />
                    <h2>Other</h2>
                </div>
                <div className="summary">
                  The table below shows the current expected yield of alAssets deposited in the transmuters.<br/>
                  Please note, that this does not take into account self-liquidations,<br/>only the repayments taking place as a result of yield accrued in the Alchemix vaults,<br/>so the actual yield is always expected to be higher than the values displayed here.
                 
                    <div className="small-table">
                    <h3>Transmuter yield</h3>
                    {this.state.transmutersLoading ? <LoadingComponent /> :
                    <div className="small-table-inner-9">
                        <span className="small-table-row"></span><span></span><span className="table-text-title">APR</span>
                        <span className="small-table-row"></span><span className="table-text-title">Mainnet ETH</span><span className="table-text-bold">{Math.round(this.state.transmuters.mainnetEth*100)/100}%</span>
                        <span className="small-table-row"></span><span className="table-text-title">Mainnet USDC</span><span className="table-text-bold">{Math.round(this.state.transmuters.mainnetUsdc*100)/100}%</span>
                        <span className="small-table-row"></span><span className="table-text-title">Optimism ETH</span><span className="table-text-bold">{Math.round(this.state.transmuters.optiEth*100)/100}%</span>
                    </div>}
                    </div>
                </div>
            </>
        );
    }
}