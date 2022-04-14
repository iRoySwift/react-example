let API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';
let CHAIN_TYPE = process.env.REACT_APP_CHAIN_TYPE || 'mainnet';
let MAINNET_URL = process.env.REACT_APP_MAINNET_URL || 'http://localhost:3000';
let TESTNET_NAME = process.env.REACT_APP_TESTNET_NAME || 'testnet';

export { API_URL, CHAIN_TYPE, MAINNET_URL, TESTNET_NAME };
