import isEmpty from 'lodash/isEmpty';

const setAuthParams = (state, params) => {
  state.authParams = params;
};

const setAuthStatus = (state, status) => {
  state.isAuthorized = status;
};

const setOtpEmail = (state, email) => {
  state.otpEmail = email;
};

const setSentStatus = (state, status) => {
  state.linkSent = status;
};

const setBalance = (state, balance) => {
  console.log(balance, 'kek123');
  state.balance = balance;
};

const setAccounts = (state, accounts) => {
  state.accounts = isEmpty(accounts) ? [] : [...accounts];
};

const setSettings = (state, settings) => {
  state.settings = settings;
};

const setRecoveryIdentifier = (state, recoveryIdentifier) => {
  state.recoveryIdentifier = recoveryIdentifier;
};

const setDemoData = (state, demoData) => {
  state.demoData = demoData;
};

const logout = state => {
  state.otpEmail = null;
  state.authParams = null;
  state.isAuthorized = false;
  state.accounts = [];
  state.settings = null;
  state.recoveryIdentifier = null;
};

export default {
  logout,
  setDemoData,
  setAuthParams,
  setAuthStatus,
  setOtpEmail,
  setAccounts,
  setSentStatus,
  setSettings,
  setRecoveryIdentifier,
};
