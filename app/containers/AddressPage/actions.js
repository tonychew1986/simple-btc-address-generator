/*
 *
 * AddressPage actions
 *
 */

import { 
  CHANGE_N_KEY,
  CHANGE_M_KEY,
  GENERATE_SINGLE_SIG_ADDRESS,
  GENERATE_SINGLE_SIG_ADDRESS_SUCCESS,
  GENERATE_SINGLE_SIG_ADDRESS_ERROR,
  GENERATE_MULTI_SIG_ADDRESS,
  GENERATE_MULTI_SIG_ADDRESS_SUCCESS,
  GENERATE_MULTI_SIG_ADDRESS_ERROR,
  
  GENERATE_SINGLE_SIG_ADDRESS_CUSTOM,
  GENERATE_SINGLE_SIG_ADDRESS_CUSTOM_SUCCESS,
  GENERATE_SINGLE_SIG_ADDRESS_CUSTOM_ERROR,
  CHANGE_SEED_SINGLE_CUSTOM,
  CHANGE_SEED_SINGLE_NONCE,
  
  CHANGE_CUSTOM_PUB_KEY_STATUS,
  CHANGE_PUB_KEY_VALUE,
} from './constants';


export function changeNkey(amount) {
  return {
    type: CHANGE_N_KEY,
    amount
  };
}

export function changeMkey(amount) {
  return {
    type: CHANGE_M_KEY,
    amount
  };
}

export function generateMultiSigAddress() {
  return {
    type: GENERATE_MULTI_SIG_ADDRESS,
  };
}

export function generateMultiSigAddressSuccess(addressArray, pubkeys, address) {
  return {
    type: GENERATE_MULTI_SIG_ADDRESS_SUCCESS,
    addressArray,
    pubkeys,
    address
  };
}

export function generateMultiSigAddressError() {
  return {
    type: GENERATE_MULTI_SIG_ADDRESS_ERROR,
  };
}

export function generateSingleSigAddress() {
  return {
    type: GENERATE_SINGLE_SIG_ADDRESS,
  };
}

export function generateSingleSigAddressSuccess(seed, addresses) {
  return {
    type: GENERATE_SINGLE_SIG_ADDRESS_SUCCESS,
    seed,
    addresses
  };
}

export function generateSingleSigAddressError() {
  return {
    type: GENERATE_SINGLE_SIG_ADDRESS_ERROR,
  };
}


export function generateSingleSigAddressCustom() {
  return {
    type: GENERATE_SINGLE_SIG_ADDRESS_CUSTOM,
  };
}

export function generateSingleSigAddressCustomSuccess(address) {
  return {
    type: GENERATE_SINGLE_SIG_ADDRESS_CUSTOM_SUCCESS,
    address
  };
}

export function generateSingleSigAddressCustomError() {
  return {
    type: GENERATE_SINGLE_SIG_ADDRESS_CUSTOM_ERROR,
  };
}

export function changeSeedSingleCustom(seed) {
  return {
    type: CHANGE_SEED_SINGLE_CUSTOM,
    seed
  };
}

export function changeSeedSingleNonce(nonce) {
  return {
    type: CHANGE_SEED_SINGLE_NONCE,
    nonce
  };
}


export function changeCustomPubkeyStatus() {
  return {
    type: CHANGE_CUSTOM_PUB_KEY_STATUS,
  };
}


export function changePubkeyValue(index, pubkey) {
  console.log("changePubkeyValue", index, pubkey);
  return {
    type: CHANGE_PUB_KEY_VALUE,
    index,
    pubkey
  };
}

