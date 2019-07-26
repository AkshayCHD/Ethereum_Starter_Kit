import React, { Component } from 'react';
import logo from '../logo.png';
import '../App.css';
import getWeb3 from '../utils/getWeb3';
import StorageContract from '../blockchain/build/contracts/Storage.json' 
var contract = require('truffle-contract');

let contractInstance = null;
class Home extends Component {
    constructor(props) {
      super(props);    
      this.state = {
        rating: 0,
        web3: null,
        successful: false,
      }
    }
    componentWillMount() {
      getWeb3.then((results) => {
        console.log(results)
        this.setState({
          web3: results.web3,
          metamask: true,
        });
        this.instantiateContract();
      }).catch(() => {
        this.setState({ metamask: false });
        console.log('Error finding web3. Please make sure MetaMask is installed.');
      });
    }

    instantiateContract() {
      const instance = this;
      this.state.web3.eth.getAccounts( (error, result) => {
        if (error) {
          console.log('Could not get accounts');
          console.log(error)
        } else {
          [instance.state.web3.eth.defaultAccount] = result;
          const auctionContract = contract(StorageContract);
          auctionContract.setProvider(instance.state.web3.currentProvider);
          auctionContract.deployed().then((cinstance) => {
            contractInstance = cinstance;
          });
        }
      });
    }
    render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default Home;