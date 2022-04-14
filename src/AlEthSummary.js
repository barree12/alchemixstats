import React from 'react';

export default class AlEthSummary extends React.Component {

    render(){
        return (
            <div className="summary">
                alETH supply grows when people deposit collateral assets and borrow alETH against them.<br/>
                The supply contracts when people repay their outstanding debt using alETH or when they use the transmuter to exchange alETH for collateral assets.<br/>
                In these cases the protocol burns the alETH tokens and the total supply decreases.<br></br>
                Currently, the following collateral types are supported:<br/>
                <div className="small-table-2">
                <div className="tokens"><img src={ require('./logos/eth.png').default } alt="eth token" className="image" />ETH</div>
                <div className="tokens"><img src={ require('./logos/weth.png').default } alt="weth token" className="image" />WETH</div>
                <div className="tokens"><img src={ require('./logos/steth.png').default } alt="wstETH token" className="image" />wstETH</div>
                <div className="tokens"><img src={ require('./logos/reth.png').default } alt="reth token" className="image" />rETH</div>
                </div>
                The protocol deploys collateral assets into one of the supported yield strategies.<br/>
                In the case of rETH, it is only possible to deposit rETH, which is the yield strategy itself.<br/>
                Currently supported general yield options:
                <div className="small-table-2">
                <div className="tokens"><img src={ require('./logos/yearn_weth.png').default } alt="yearn weth token" className="image" /><a target="_blank" rel="noreferrer" href="https://yearn.finance/#/vault/0xa258C4606Ca8206D8aA700cE2143D7db854D168c">Yearn WETH</a></div>
                <div className="tokens"><img src={ require('./logos/steth.png').default } alt="wstETH token" className="image" /><a target="_blank" rel="noreferrer" href="https://lido.fi/ethereum">wstETH</a></div>
                </div>
                The transmuter always exchanges 1 alETH for 1 ETH<br/>
                Thus it is the primary goal of the protocol to maintain the peg (a value of 1 ETH) for alETH.
            </div>
        );
    }
}