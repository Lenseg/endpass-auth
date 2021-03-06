import { parseUrl } from '@/util/dom';

export const METHODS = {
  SIGN: 'SIGN',
  ACCOUNT: 'ACCOUNT',
  RECOVER: 'RECOVER',
  GET_SETTINGS: 'GET_SETTINGS',
  AUTH: 'AUTH',
  LOGOUT: 'LOGOUT',
  INITIATE: 'INITIATE',
  READY_STATE_BRIDGE: 'READY_STATE_BRIDGE',
  EXCHANGE_TOKEN_REQUEST: 'EXCHANGE_TOKEN_REQUEST',
  // Dialog-level messages
  DIALOG_RESIZE: 'DIALOG_RESIZE',
  DIALOG_OPEN: 'DIALOG_OPEN',
  DIALOG_CLOSE: 'DIALOG_CLOSE',
  // Widget-level messages
  WIDGET_OPEN: 'WIDGET_OPEN',
  WIDGET_CLOSE: 'WIDGET_CLOSE',
  WIDGET_FIT: 'WIDGET_FIT',
  WIDGET_UNMOUNT: 'WIDGET_UNMOUNT',
  WIDGET_LOGOUT: 'WIDGET_LOGOUT',
  WIDGET_GET_SETTING: 'WIDGET_GET_SETTING',
  WIDGET_CHANGE_SETTINGS: 'WIDGET_CHANGE_SETTINGS',
  // Broadcast-level messages
  LOGOUT_REQUEST: 'LOGOUT_REQUEST',
  LOGOUT_RESPONSE: 'LOGOUT_RESPONSE',
  CHANGE_SETTINGS_REQUEST: 'CHANGE_SETTINGS_REQUEST',
  CHANGE_SETTINGS_RESPONSE: 'CHANGE_SETTINGS_RESPONSE',
};

export const LS_SETTINGS = 'endpass-connect:settings';

export const IDENTITY_MODE = Object.freeze({
  DEFAULT: 'default',
  CUSTOM: 'custom',
  LOCAL: 'local',
});

export const DIRECTION = Object.freeze({
  AUTH: 'auth',
  WIDGET: 'widget',
  CONNECT: 'connect',
});

export const ORIGIN_HOST = parseUrl(document.referrer).origin;

export const WIDGET_RESIZE_DURATION = 300;

export const ENCRYPT_OPTIONS = {
  kdf: ENV.VUE_APP_KDF_PARAMS_KDF,
  n: ENV.VUE_APP_KDF_PARAMS_N,
};

export const DEFAULT_RATE_LIMIT_TIMEOUT = 59; // 1 minute

// TODO: merge with WALLET_TYPE from core/class
export const WALLET_TYPES = {
  HD_MAIN: 'HDMainAccount',
};
