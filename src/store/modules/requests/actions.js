import { signChannel } from '@/class/singleton/channels';
import { Answer } from '@/class';
import signerService from '@/service/signer';

const sendResponse = async ({ commit }, payload) => {
  signChannel.put(Answer.createOk(payload));
  commit('changeLoadingStatus', false);
};

const processRequest = async (
  { state, commit, dispatch, getters },
  password,
) => {
  commit('changeLoadingStatus', true);

  const { address, request, net } = state.request;
  const { demoData } = getters;

  let v3KeyStore;

  if (demoData) {
    // eslint-disable-next-line
    v3KeyStore = demoData.v3KeyStore;
  } else {
    v3KeyStore = await dispatch('getAccount', address);
  }

  try {
    const signResult = await signerService.getSignedRequest({
      v3KeyStore,
      request,
      password,
      net,
    });

    dispatch('sendResponse', {
      id: request.id,
      result: signResult,
      jsonrpc: request.jsonrpc,
    });
  } catch (err) {
    console.log(err.message);

    if (err.message.includes('message authentication code mismatch')) {
      commit('changeLoadingStatus', false);

      throw new Error('You have enter incorrect password');
    } else {
      dispatch('sendResponse', {
        id: request.id,
        result: [],
        error: err,
        jsonrpc: request.jsonrpc,
      });
    }
  } finally {
    commit('changeLoadingStatus', false);
  }
};

const recoverMessage = async ({ dispatch }, payload) => {
  const { address, request, net } = payload;

  try {
    const account = await dispatch('getAccount', address);
    const res = await signerService.recoverMessage({ account, request, net });

    return {
      id: request.id,
      result: res,
      jsonrpc: request.jsonrpc,
    };
  } catch (err) {
    return {
      id: request.id,
      result: null,
      error: err,
      jsonrpc: request.jsonrpc,
    };
  }
};

const cancelRequest = ({ state, dispatch }) => {
  const { request } = state.request;

  dispatch('sendResponse', {
    id: request.id,
    error: 'canceled',
    result: [],
  });
};

export default {
  processRequest,
  recoverMessage,
  sendResponse,
  cancelRequest,
};
