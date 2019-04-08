import actions from './actions';
import mutations from './mutations';
import getters from './getters';

const state = {
  linkSent: false,
  authParams: null,
  otpEmail: null,
  accounts: [],
  balance: null,
  settings: null,
  recoveryIdentifier: null,
  isAuthorized: false,
  demoData: null,
};

export default {
  state,
  actions,
  mutations,
  getters,
};
