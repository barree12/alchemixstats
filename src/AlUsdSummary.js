import React from 'react';

export default class AlUsdSummary extends React.Component {

    render(){
      const totalAlUsd3Crv = Math.round(this.props.lps.alUsdIn3Crv/10000+this.props.lps.crv3In3Crv/10000)/100;
      const totalD3 = Math.round(this.props.lps.alUsdInD3/10000+this.props.lps.fraxInD3/10000+this.props.lps.feiInD3/10000)/100;
      const totalD4 = Math.round(this.props.lps.alUsdInD4/10000+this.props.lps.fraxInD4/10000+this.props.lps.feiInD4/10000+this.props.lps.lUsdInD4/10000)/100;
      const totalAlUsdVelodrome = Math.round(this.props.lps.alUsdInVelodrome/10000+this.props.lps.usdcInVelodrome/10000)/100;
      const totalAlUsdBeets = Math.round(this.props.lps.alUsdInBeets/10000+this.props.lps.usdcInBeets/10000+this.props.lps.daiInBeets/10000)/100;
        return (
            <div className="summary">
                alUSD supply grows when people deposit collateral assets and borrow alUSD against them.<br/>
                The supply contracts when people repay their outstanding debt using alUSD or when they use the transmuter to exchange alUSD for collateral assets.<br/>
                In these cases the protocol burns the alUSD tokens and the total supply decreases.<br/><br/>
                Since the launch of Alchemix V2, the following collateral types are supported:<br/>
                <div className="small-table-2">
                    <div className="tokens"><img src={ require('./logos/dai.png').default } alt="dai token" className="image" />DAI</div>
                    <div className="tokens"><img src={ require('./logos/usdt.png').default } alt="usdt token" className="image" />USDT</div>
                    <div className="tokens"><img src={ require('./logos/usdc.png').default } alt="usdc token" className="image" />USDC</div>
                </div>
                The protocol deploys collateral assets into one of the supported yield strategies. Currently supported yield options:
                <div className="small-table-2">
                    <div className="tokens"><img src={ require('./logos/yearn_dai.png').default } alt="yearn dai token" className="image" /><a target="_blank" rel="noreferrer" href="https://yearn.finance/#/vault/0xdA816459F1AB5631232FE5e97a05BBBb94970c95">Yearn DAI</a></div>
                    <div className="tokens"><img src={ require('./logos/yearn_usdt.png').default } alt="yearn usdt token" className="image" /><a target="_blank" rel="noreferrer" href="https://yearn.finance/#/vault/0x7Da96a3891Add058AdA2E826306D812C638D87a7">Yearn USDT</a></div>
                    <div className="tokens"><img src={ require('./logos/yearn_usdc.png').default } alt="yearn usdc token" className="image" /><a target="_blank" rel="noreferrer" href="https://yearn.finance/#/vault/0xa354F35829Ae975e850e23e9615b11Da1B3dC4DE">Yearn USDC</a></div>
                </div>
                The protocol assumes every alUSD is worth $1 and the transmuter exchanges alUSD for $1 worth of any collateral asset.<br/>
                Thus it is the primary goal of the protocol to maintain the peg ($1 value) for alUSD.<br/>
                <h3>Liquidity pools</h3>
                <div className="small-table-3">
                  <div className="small-table-inner-4">
                    <span className="small-table-cell-title">
                      <img src={ require('./logos/alusd_crv.png').default } alt="alUsd logo" className="image" />
                      <span className="table-text-title">alUSD3Crv</span>
                    </span>
                    <span className="small-table-cell">
                      <span className="table-text-bold-2">alUSD</span>
                      <span className="important-2">${Math.round(this.props.lps.alUsdIn3Crv/10000)/100}M</span>
                    </span> 
                    <span className="small-table-cell">
                      <span className="table-text-bold-2">3CRV</span>
                      <span className="important-2">${Math.round(this.props.lps.crv3In3Crv/10000)/100}M</span>
                    </span>  
                    <span className="small-table-cell">
                      <span></span>
                      <span></span>
                    </span>
                    <span className="small-table-cell">
                      <span></span>
                      <span></span>
                    </span>
                    <span className="small-table-cell">
                      <span className="table-text-bold-2">Total</span>
                      <span className="important-2">${totalAlUsd3Crv}M</span>
                    </span>
                  </div>
                  <div className="small-table-inner-4">
                    <span className="small-table-cell-title">
                      <img src={ require('./logos/d3pool.png').default } alt="D3 Cruve pool logo" className="image" />
                      <span className="table-text-title">d3 Curve</span>
                    </span>
                    <span className="small-table-cell">
                      <span className="table-text-bold-2">alUSD</span>
                      <span className="important-2">${Math.round(this.props.lps.alUsdInD3/10000)/100}M</span>
                    </span>
                    <span className="small-table-cell">
                      <span className="table-text-bold-2">FRAX</span>
                      <span className="important-2">${Math.round(this.props.lps.fraxInD3/10000)/100}M</span>
                    </span>
                    <span className="small-table-cell">
                      <span className="table-text-bold-2">FEI</span>
                      <span className="important-2">${Math.round(this.props.lps.feiInD3/10000)/100}M</span>
                    </span>
                    <span className="small-table-cell">
                      <span></span>
                      <span></span>
                    </span>
                    <span className="small-table-cell">
                      <span className="table-text-bold-2">Total</span>
                      <span className="important-2">${totalD3}M</span>
                    </span>
                  </div>
                  <div className="small-table-inner-4">
                    <span className="small-table-cell-title">
                      <img src={ require('./logos/saddle4pool.png').default } alt="Saddle 4pool logo" className="image" />
                      <span className="table-text-title">Saddle d4</span>
                    </span>
                    <span className="small-table-cell">
                      <span className="table-text-bold-2">alUSD</span>
                      <span className="important-2">${Math.round(this.props.lps.alUsdInD4/10000)/100}M</span>
                    </span>
                    <span className="small-table-cell">
                      <span className="table-text-bold-2">FRAX</span>
                      <span className="important-2">${Math.round(this.props.lps.fraxInD4/10000)/100}M</span>
                    </span>
                    <span className="small-table-cell">
                      <span className="table-text-bold-2">FEI</span>
                      <span className="important-2">${Math.round(this.props.lps.feiInD4/10000)/100}M</span>
                    </span>
                    <span className="small-table-cell">
                      <span className="table-text-bold-2">LUSD</span>
                      <span className="important-2">${Math.round(this.props.lps.lUsdInD4/10000)/100}M</span>
                    </span>
                    <span className="small-table-cell">
                      <span className="table-text-bold-2">Total</span>
                      <span className="important-2">${totalD4}M</span>
                    </span>
                  </div>
                  <div className="small-table-inner-4">
                    <span className="small-table-cell-title">
                      <img src={ require('./logos/alusd_beets.png').default } alt="alUsd beets logo" className="image" />
                      <span className="table-text-title">Fantom Beets</span>
                    </span>
                    <span className="small-table-cell">
                      <span className="table-text-bold-2">alUSD</span>
                      <span className="important-2">${Math.round(this.props.lps.alUsdInBeets/10000)/100}M</span>
                    </span>
                    <span className="small-table-cell">
                      <span className="table-text-bold-2">USDC</span>
                      <span className="important-2">${Math.round(this.props.lps.usdcInBeets/10000)/100}M</span>
                    </span>
                    <span className="small-table-cell">
                      <span className="table-text-bold-2">DAI</span>
                      <span className="important-2">${Math.round(this.props.lps.daiInBeets/10000)/100}M</span>
                    </span>
                    <span className="small-table-cell">
                      <span></span>
                      <span></span>
                    </span>
                    <span className="small-table-cell">
                      <span className="table-text-bold-2">Total</span>
                      <span className="important-2">${totalAlUsdBeets}M</span>
                    </span>
                  </div>
                  <div className="small-table-inner-4">
                    <span className="small-table-cell-title">
                      <img src={ require('./logos/alusd_usdc.png').default } alt="alUSD-USDC logo" className="image" />
                      <span className="table-text-title">Optimism Velodrome</span>
                    </span>
                    <span className="small-table-cell">
                      <span className="table-text-bold-2">alUSD</span>
                      <span className="important-2">${Math.round(this.props.lps.alUsdInVelodrome/10000)/100}M</span>
                    </span>
                    <span className="small-table-cell">
                      <span className="table-text-bold-2">USDC</span>
                      <span className="important-2">${Math.round(this.props.lps.usdcInVelodrome/10000)/100}M</span>
                    </span>
                    <span className="small-table-cell">
                      <span></span>
                      <span></span>
                    </span>
                    <span className="small-table-cell">
                      <span></span>
                      <span></span>
                    </span>
                    <span className="small-table-cell">
                      <span className="table-text-bold-2">Total</span>
                      <span className="important-2">${totalAlUsdVelodrome}M</span>
                    </span>
                  </div>
                </div>
          </div>
        );
    }
}