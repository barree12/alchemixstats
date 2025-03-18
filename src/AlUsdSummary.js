import React from 'react';
import { Link } from "react-router-dom";
import { styleNumber } from './Functions';

export default class AlUsdSummary extends React.Component {

    render(){
      const totalAlUsd3Crv = Math.round(this.props.lps.alUsdIn3Crv/10000+this.props.lps.crv3In3Crv/10000)/100;
      const totalAlUsdVelodrome = Math.round(this.props.lps.alUsdInVelodrome/10000+this.props.lps.usdcInVelodrome/10000)/100;
      const totalCurveFBP = Math.round(this.props.lps.alUsdInCurveFBP/10000+this.props.lps.fbpInCurveFBP/10000)/100;
      const totalDolaVelodrome = Math.round(this.props.lps.alUsdInVeloDolaAlUsd/10000+this.props.lps.dolaInVeloDolaAlUsd/10000)/100;
      const totalDolaCurve = Math.round(this.props.lps.alUsdInCurveDola/10000+this.props.lps.sdolaInCurveDola/10000)/100;
      const totalRamsesFrax = Math.round(this.props.lps.alUsdInRamsesFrax/10000+this.props.lps.fraxInRamsesFrax/10000)/100;
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
                    <div className="tokens"><img src={ require('./logos/frax.png').default } alt="frax token" className="image" />FRAX</div>
                </div>
                The protocol assumes every alUSD is worth $1 and the transmuter exchanges alUSD for $1 worth of any collateral asset.<br/>
                Thus it is an important goal of the protocol to maintain a price that is reasonably close to $1 for alUSD.<br/>
                <br/>
                <span>To see the current APR of each pool, head over to the <Link to="/earn">Earn subpage</Link></span>
                <h3>Backing surplus</h3>
                <span>Mainnet backing surplus: <b>{styleNumber(Math.round(this.props.surplus.alUsdMainnet))} alUSD</b></span>
                <br/>
                <span>(+) Elixir held alUSD backing in LPs: <b>{styleNumber(Math.round(this.props.surplus.alUsdBackingTokensInElixir))}</b></span>
                <span>(+) Stablecoins in Transmuters: <b>{styleNumber(Math.round(this.props.surplus.stablesInTransmuterBuffer))}</b></span>
                <span>(+) Protocol-owned stablecoins in V1 contracts: <b>{styleNumber(Math.round(this.props.surplus.alUsdInV1))}</b></span>
                <span>(+) Elixir held idle alUSD: <b>{styleNumber(Math.round(this.props.surplus.alUsdInElixir))}</b></span>
                <span>Mainnet alUSD supply: <b>{styleNumber(Math.round(this.props.surplus.alUsdSupply))}</b></span>                
                <span>(-)Mainnet V2 total debt: <b>{styleNumber(Math.round(this.props.surplus.alUsdDebt))}</b></span>
                <span>(-)Mainnet V1 total debt: <b>{styleNumber(Math.round(this.props.surplus.alUsdDebtV1))}</b></span>
                <br/>
                Surplus -&gt; alUSD_supply - total_debt &gt; protocol_held_funds
                <br/><br/>
                {/*<span>Optimism backing surplus: <b>{styleNumber(Math.round(this.props.surplus.alUsdOptimism))} alUSD</b></span>*/}
                <h3>Liquidity pools</h3>
                <div className="small-table-3">
                  
                  <div className="small-table-inner-4">
                    <span className="small-table-cell-title">
                      <img src={ require('./logos/frax_crv.png').default } alt="Curve FraxBP pool logo" className="image" />
                      <span className="table-text-title">FraxBP Curve</span>
                    </span>
                    <span className="small-table-cell">
                      <span className="table-text-bold-2">alUSD</span>
                      <span className="important-2">${Math.round(this.props.lps.alUsdInCurveFBP/10000)/100}M</span>
                    </span>
                    <span className="small-table-cell">
                      <span className="table-text-bold-2">FraxBP</span>
                      <span className="important-2">${Math.round(this.props.lps.fbpInCurveFBP/10000)/100}M</span>
                    </span>
                    <span className="small-table-cell-disappear">
                      <span></span>
                      <span></span>
                    </span>
                    <span className="small-table-cell-disappear">
                      <span></span>
                      <span></span>
                    </span>
                    <span className="small-table-cell">
                      <span className="table-text-bold-2">Total</span>
                      <span className="important-2">${totalCurveFBP}M</span>
                    </span>
                  </div>

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
                    <span className="small-table-cell-disappear">
                      <span></span>
                      <span></span>
                    </span>
                    <span className="small-table-cell-disappear">
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
                      <img src={ require('./logos/alusd_usdc.png').default } alt="alUSD-USDC logo" className="image" />
                      <span className="table-text-title">alUSD Velodrome</span>
                    </span>
                    <span className="small-table-cell">
                      <span className="table-text-bold-2">alUSD</span>
                      <span className="important-2">${Math.round(this.props.lps.alUsdInVelodrome/10000)/100}M</span>
                    </span>
                    <span className="small-table-cell">
                      <span className="table-text-bold-2">USDC</span>
                      <span className="important-2">${Math.round(this.props.lps.usdcInVelodrome/10000)/100}M</span>
                    </span>
                    <span className="small-table-cell-disappear">
                      <span></span>
                      <span></span>
                    </span>
                    <span className="small-table-cell-disappear">
                      <span></span>
                      <span></span>
                    </span>
                    <span className="small-table-cell">
                      <span className="table-text-bold-2">Total</span>
                      <span className="important-2">${totalAlUsdVelodrome}M</span>
                    </span>
                  </div>
                  
                </div>
                <div className="small-table-3">

                  <div className="small-table-inner-11">
                    <span className="small-table-cell-title">
                      <img src={ require('./logos/alusd_frax.png').default } alt="alUSD-FRAX logo" className="image" />
                      <span className="table-text-title">DOLA Velodrome</span>
                    </span>
                    <span className="small-table-cell">
                      <span className="table-text-bold-2">alUSD</span>
                      <span className="important-2">${Math.round(this.props.lps.alUsdInVeloDolaAlUsd/10000)/100}M</span>
                    </span>
                    <span className="small-table-cell">
                      <span className="table-text-bold-2">DOLA</span>
                      <span className="important-2">${Math.round(this.props.lps.dolaInVeloDolaAlUsd/10000)/100}M</span>
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
                      <span className="important-2">${totalDolaVelodrome}M</span>
                    </span>
                  </div>

                  <div className="small-table-inner-11">
                    <span className="small-table-cell-title">
                      <img src={ require('./logos/alusd_mai.png').default } alt="alUSD-MAI logo" className="image" />
                      <span className="table-text-title">Curve sDOLA</span>
                    </span>
                    <span className="small-table-cell">
                      <span className="table-text-bold-2">alUSD</span>
                      <span className="important-2">${Math.round(this.props.lps.alUsdInCurveDola/10000)/100}M</span>
                    </span>
                    <span className="small-table-cell">
                      <span className="table-text-bold-2">sDOLA</span>
                      <span className="important-2">${Math.round(this.props.lps.sdolaInCurveDola/10000)/100}M</span>
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
                      <span className="important-2">${totalDolaCurve}M</span>
                    </span>
                  </div>

                  <div className="small-table-inner-11">
                    <span className="small-table-cell-title">
                      <img src={ require('./logos/alusd_mai.png').default } alt="alUSD-MAI logo" className="image" />
                      <span className="table-text-title">Ramses FRAX</span>
                    </span>
                    <span className="small-table-cell">
                      <span className="table-text-bold-2">alUSD</span>
                      <span className="important-2">${Math.round(this.props.lps.alUsdInRamsesFrax/10000)/100}M</span>
                    </span>
                    <span className="small-table-cell">
                      <span className="table-text-bold-2">FRAX</span>
                      <span className="important-2">${Math.round(this.props.lps.fraxInRamsesFrax/10000)/100}M</span>
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
                      <span className="important-2">${totalRamsesFrax}M</span>
                    </span>
                  </div>

                  </div>
          </div>
        );
    }
}