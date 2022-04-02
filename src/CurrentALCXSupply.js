import React from 'react';

export default class CurrentALCXSupply extends React.Component {
  
    constructor(props) {
      super(props);
  
      this.state = {
        currentSupply: 0,
        price: 0,
        marketcap: 0,
        isLoading: true
      };
    }
  
    componentDidMount() {
      this.getData();
    }

    calculateArrays(result){
        let burnAmount = 478612;
        this.setState({ 
          currentSupply: Math.round(result[0].TOTAL-burnAmount), 
          price: Math.round(result[0].PRICE*100)/100, 
          marketcap: Math.round((result[0].TOTAL-burnAmount)*result[0].PRICE/10000)/100,
          isLoading: false 
        });
      }

    getData() {
        fetch("https://api.flipsidecrypto.com/api/v2/queries/b678a8e7-ea8b-4080-bb37-00c6ca93c760/data/latest")
          .then(res => res.json())
          .then(
            (result) => {
              this.calculateArrays(result)
            },
            (error) => {
              console.log(error)
            }
          )
      }

    render(){
        return (
            <span>
                {this.state.isLoading === true ? "Loading..." : 
                <span>
                  On-chain data - <img src={ require('./logos/alcx_logo.png').default } alt="ALCX" className="image2" />ALCX price: <span className="important">${this.state.price}</span> <img src={ require('./logos/alcx_logo.png').default } alt="ALCX" className="image2" />ALCX supply (incl. treasury assets): <span className="important">{this.state.currentSupply}</span> Total Marketcap: <span className="important">${this.state.marketcap}M</span>
                </span>
                }
            </span>
        );
    }
}