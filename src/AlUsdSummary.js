import React from 'react';
import { Link } from "react-router-dom";

export default class AlUsdSummary extends React.Component {

    render(){
      const totalAlUsd3Crv = Math.round(this.props.lps.alUsdIn3Crv/10000+this.props.lps.crv3In3Crv/10000)/100;
      //const totalD4 = Math.round(this.props.lps.alUsdInD4/10000+this.props.lps.fraxInD4/10000+this.props.lps.feiInD4/10000+this.props.lps.lUsdInD4/10000)/100;
      const totalL2d4 = Math.round(this.props.lps.alUsdInL2d4/10000+this.props.lps.fraxInL2d4/10000+this.props.lps.usxInL2d4/10000+this.props.lps.usdsInL2d4/10000)/100;
      const totalAlUsdVelodrome = Math.round(this.props.lps.alUsdInVelodrome/10000+this.props.lps.usdcInVelodrome/10000)/100;
      //const totalAlUsdBeets = Math.round(this.props.lps.alUsdInBeets/10000+this.props.lps.usdcInBeets/10000+this.props.lps.daiInBeets/10000)/100;
      //const totalSaddleFBP = Math.round(this.props.lps.alUsdInSaddleFBP/10000+this.props.lps.fbpInSaddleFBP/10000)/100;
      const totalCurveFBP = Math.round(this.props.lps.alUsdInCurveFBP/10000+this.props.lps.fbpInCurveFBP/10000)/100;
      const totalMaiUsdVelodrome = Math.round(this.props.lps.alUsdInMaiVelodrome/10000+this.props.lps.maiInMaiVelodrome/10000)/100;
      const totalFraxVelodrome = Math.round(this.props.lps.alUsdInVeloFraxAlUsd/10000+this.props.lps.fraxInVeloFraxAlUsd/10000)/100;
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
                      <span className="table-text-title">FRAX Velodrome</span>
                    </span>
                    <span className="small-table-cell">
                      <span className="table-text-bold-2">alUSD</span>
                      <span className="important-2">${Math.round(this.props.lps.alUsdInVeloFraxAlUsd/10000)/100}M</span>
                    </span>
                    <span className="small-table-cell">
                      <span className="table-text-bold-2">FRAX</span>
                      <span className="important-2">${Math.round(this.props.lps.fraxInVeloFraxAlUsd/10000)/100}M</span>
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
                      <span className="important-2">${totalFraxVelodrome}M</span>
                    </span>
                  </div>

                  <div className="small-table-inner-11">
                    <span className="small-table-cell-title">
                      <img src={ require('./logos/alusd_mai.png').default } alt="alUSD-MAI logo" className="image" />
                      <span className="table-text-title">MAI Velodrome</span>
                    </span>
                    <span className="small-table-cell">
                      <span className="table-text-bold-2">alUSD</span>
                      <span className="important-2">${Math.round(this.props.lps.alUsdInMaiVelodrome/10000)/100}M</span>
                    </span>
                    <span className="small-table-cell">
                      <span className="table-text-bold-2">MAI</span>
                      <span className="important-2">${Math.round(this.props.lps.maiInMaiVelodrome/10000)/100}M</span>
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
                      <span className="important-2">${totalMaiUsdVelodrome}M</span>
                    </span>
                  </div>

                  <div className="small-table-inner-11">
                    <span className="small-table-cell-title">
                      <img src={ require('./logos/l2d4.png').default } alt="L2D4 logo" className="image" />
                      <span className="table-text-title">Saddle L2D4</span>
                    </span>
                    <span className="small-table-cell">
                      <span className="table-text-bold-2">alUSD</span>
                      <span className="important-2">${Math.round(this.props.lps.alUsdInL2d4/10000)/100}M</span>
                    </span>
                    <span className="small-table-cell">
                      <span className="table-text-bold-2">FRAX</span>
                      <span className="important-2">${Math.round(this.props.lps.fraxInL2d4/10000)/100}M</span>
                    </span>
                    <span className="small-table-cell">
                      <span className="table-text-bold-2">USX</span>
                      <span className="important-2">${Math.round(this.props.lps.usxInL2d4/10000)/100}M</span>
                    </span>
                    <span className="small-table-cell">
                      <span className="table-text-bold-2">USDs</span>
                      <span className="important-2">${Math.round(this.props.lps.usdsInL2d4/10000)/100}M</span>
                    </span>
                    <span className="small-table-cell">
                      <span className="table-text-bold-2">Total</span>
                      <span className="important-2">${totalL2d4}M</span>
                    </span>
                  </div>

                  {/*<div className="small-table-inner-11">
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
                  {/*<div className="small-table-inner-11">
                    <span className="small-table-cell-title">
                      <img src={ require('./logos/alusd_saddle_fbp.png').default } alt="alUSD-SaddleFBP logo" className="image" />
                      <span className="table-text-title">FraxBP Saddle</span>
                    </span>
                    <span className="small-table-cell">
                      <span className="table-text-bold-2">alUSD</span>
                      <span className="important-2">${Math.round(this.props.lps.alUsdInSaddleFBP/10000)/100}M</span>
                    </span>
                    <span className="small-table-cell">
                      <span className="table-text-bold-2">FraxBP</span>
                      <span className="important-2">${Math.round(this.props.lps.fbpInSaddleFBP/10000)/100}M</span>
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
                      <span className="important-2">${totalSaddleFBP}M</span>
                    </span>
        </div>*/}
                  
                </div>
          </div>
        );
    }
}