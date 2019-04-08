const infura = {
  key: 'zU4GTAQ0LjJNKddbyztc',
};
const identity = {
  url: 'https://identity-dev.endpass.com',
};
const cryptodata = {
  url: 'https://cryptodata-dev.endpass.com/api/v1.1'
};
const wallet = {
  openUrl: 'https://wallet-dev.endpass.com/#/',
};

const hdKeyMnemonic = {
  // phrase: '', //BIP39 mnemonic
  // seed: '', //Derived from mnemonic phrase
  path: `m/44'/60'/0'/0`, // Derivation path
};

const googleClientId =
  '885568627115-2lu9inbk9n7o1hc0me6dip2ac5drprj0.apps.googleusercontent.com';

const gitClientId = '346108128ad51a5eccd1';

const isProduction = false;

module.exports = {
  wallet,
  infura,
  identity,
  cryptodata,
  hdKeyMnemonic,
  googleClientId,
  gitClientId,
  isProduction,
};
