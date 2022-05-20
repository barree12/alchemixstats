import React from 'react';

export default class FtmSummary extends React.Component {

    render(){
        return (
          <div className="content-tab">
                <h3>Fantom deployment</h3>
                <div className="summary">
                  alUSD and gALCX are available on Fantom and only stablecoin strategies are deployed at the moment.<br/><br/>
                  Supported yield options:
                  <div className="small-table-2">
                      <div className="tokens"><img src={ require('./logos/yearn_dai.png').default } alt="yearn dai token" className="image" /><a target="_blank" rel="noreferrer" href="https://yearn.finance/#/vault/0x637eC617c86D24E421328e6CAEa1d92114892439">Yearn DAI</a></div>
                      <div className="tokens"><img src={ require('./logos/yearn_usdt.png').default } alt="yearn usdt token" className="image" /><a target="_blank" rel="noreferrer" href="https://yearn.finance/#/vault/0x148c05caf1Bb09B5670f00D511718f733C54bC4c">Yearn fUSDT</a></div>
                      <div className="tokens"><img src={ require('./logos/yearn_usdc.png').default } alt="yearn usdc token" className="image" /><a target="_blank" rel="noreferrer" href="https://yearn.finance/#/vault/0xEF0210eB96c7EB36AF8ed1c20306462764935607">Yearn USDC</a></div>
                  </div>
                  <div className="small-table">
                            <h3>Fantom Deposits and Deposit Caps</h3>
                            <div className="small-table-inner-2">
                            <span className="small-table-row"></span><span className="table-text-bold">TVL</span><span className="table-text-bold">Deposit cap</span>
                            <span className="small-table-row"><img src={ require('./logos/dai.png').default } alt="DAI logo" className="image" />yvDAI</span><span className="important-2">${this.props.ftmTvl.yvDai[this.props.ftmTvl.yvDai.length-1]}M</span><span className="table-text-bold">${Math.round(this.props.v2Caps.ftmDai/10000)/100}M</span>
                            <span className="small-table-row"><img src={ require('./logos/usdc.png').default } alt="USDC logo" className="image" />yvUSDC</span><span className="important-2">${this.props.ftmTvl.yvUsdc[this.props.ftmTvl.yvUsdc.length-1]}M</span><span className="table-text-bold">${Math.round(this.props.v2Caps.ftmUsdc/10000)/100}M</span>
                            <span className="small-table-row"><img src={ require('./logos/usdt.png').default } alt="USDT logo" className="image" />yvUSDT</span><span className="important-2">${this.props.ftmTvl.yvUsdt[this.props.ftmTvl.yvUsdt.length-1]}M</span><span className="table-text-bold">${Math.round(this.props.v2Caps.ftmUsdt/10000)/100}M</span>
                            <span className="small-table-row-2">TOTAL</span><span className="important-3">${Math.round((this.props.ftmTvl.yvDai[this.props.ftmTvl.yvDai.length-1] + this.props.ftmTvl.yvUsdc[this.props.ftmTvl.yvUsdc.length-1] + this.props.ftmTvl.yvUsdt[this.props.ftmTvl.yvUsdt.length-1])*100)/100}M</span>
                            </div>
                        </div>
                </div>
          </div>
        );
    }
}