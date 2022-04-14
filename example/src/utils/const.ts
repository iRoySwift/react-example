import { CHAIN_TYPE } from './config';

export const MAINNET_PRIMARY_THEME_COLOR = '#3cc68a';
export const MAINNET_SECONDARY_THEME_COLOR = '#3cc68a';
export const TESTNET_PRIMARY_THEME_COLOR = '#617bbd';
export const TESTNET_SECONDARY_THEME_COLOR = '#85A1EA';

export const RESIZE_LATENCY = 500;

export const AppCachedKeys = {
  AppLanguage: `${CHAIN_TYPE}-AppLanguage`,
  Version: `${CHAIN_TYPE}-Version`,
  MaintenanceAlert: `${CHAIN_TYPE}-MaintenanceAlert`
};
