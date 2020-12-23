import { take, delay, call, put, select, takeLatest, takeEvery } from 'redux-saga/effects';

import {
  GENERATE_SINGLE_SIG_ADDRESS,
  GENERATE_MULTI_SIG_ADDRESS,
  GENERATE_SINGLE_SIG_ADDRESS_CUSTOM,
} from 'containers/AddressPage/constants';

import {
  generateMultiSigAddressSuccess,
  generateSingleSigAddressSuccess,
  generateSingleSigAddressCustomSuccess,
} from 'containers/AddressPage/actions';

import {
  makeSelectAddressPage
} from 'containers/AddressPage/selectors';


const bip32 = require('bip32');
const bip39 = require('bip39');
const bitcoin = require('bitcoinjs-lib');

// Individual exports for testing
export default function* addressPageSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(GENERATE_SINGLE_SIG_ADDRESS, _generateSingleSigAddress);
  yield takeLatest(GENERATE_SINGLE_SIG_ADDRESS_CUSTOM, _generateSingleSigAddressCustom);
  
  yield takeLatest(GENERATE_MULTI_SIG_ADDRESS, _generateMultiSigAddress);
  
}

export function* _generateSingleSigAddress() {
  let mnemonic = bip39.generateMnemonic();
  console.log("mnemonic", mnemonic);
  
	let path, param, seed, root;
  
  let addrArray = [];
  console.log("addrArray", addrArray);
  
	seed = yield call(bip39.mnemonicToSeed, mnemonic);
  console.log("seed", seed);
  
	root = bip32.fromSeed(seed);
  console.log("root", root);
  
  for(var i = 0; i < 10; i++){
  	path = root.derivePath("m/44'/0'/0'/0/"+i) //main net
  	// path = root.derivePath("m/44'/1'/0'/0/"+nonce) // test net
  	param = { pubkey: path.publicKey }
  	// param = { pubkey: path.publicKey, network: bitcoin.networks.testnet }// test net
    console.log("param", param)
    
  	let addr = bitcoin.payments.p2wpkh(param).address
    
    console.log("addr", addr)
    
    addrArray.push(addr);
  }



	console.log("addrArray", addrArray);
  
  yield put(generateSingleSigAddressSuccess(mnemonic, addrArray));
}

export function* _generateSingleSigAddressCustom() {
  let addressInfo = yield select(makeSelectAddressPage());
  let mnemonic = addressInfo["seedSingleCustom"];
  let nonce = addressInfo["seedSingleCustomNonce"];
  
  console.log("mnemonic", mnemonic);
  
	let path, param, seed, root;
  
	seed = yield call(bip39.mnemonicToSeed, mnemonic);
  console.log("seed", seed);
  
	root = bip32.fromSeed(seed);
  console.log("root", root);
  
	path = root.derivePath("m/44'/0'/0'/0/"+nonce) //main net
	// path = root.derivePath("m/44'/1'/0'/0/"+nonce) // test net
	param = { pubkey: path.publicKey }
	// param = { pubkey: path.publicKey, network: bitcoin.networks.testnet }// test net
  console.log("param", param)
  
	let addr = bitcoin.payments.p2wpkh(param).address
  
  console.log("addr", addr)

  
  yield put(generateSingleSigAddressCustomSuccess(addr));
}

export function* _generateMultiSigAddress() {

  let addressInfo = yield select(makeSelectAddressPage());
  let nKey = parseInt(addressInfo["nKey"]);
  let mKey = parseInt(addressInfo["mKey"]);
  let customPubkeyStatus = addressInfo["customPubkeyStatus"];
  let customPubkeyArray = addressInfo["customPubkeyArray"];
  
  console.log("nKey", nKey);
  console.log("mKey", mKey);
  console.log("customPubkeyStatus", customPubkeyStatus);
  console.log("customPubkeyArray", customPubkeyArray);
  
  let addressArray = [];
  let pubkeyArray = [];
  
  let pubkeys;
  
  if(customPubkeyStatus == false){
    for(var i = 0; i < mKey; i++){
      let keyPair = bitcoin.ECPair.makeRandom();
      let { address } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey });
      console.log("address " + address)
      
      addressArray.push(address);
      
      var publicKey = keyPair.publicKey.toString('hex')

      console.log("public key " + publicKey)
      
      // let mnemonic = bip39.generateMnemonic();
      // console.log("mnemonic", mnemonic);
      // 
      // mnemonicArray.push(mnemonic);
      // 
    	// let path, param, seed, root;
      // 
    	// seed = yield call(bip39.mnemonicToSeed, mnemonic);
      // console.log("seed", seed);
      // 
    	// root = bip32.fromSeed(seed);
      // console.log("root", root);
      // 
    	// path = root.derivePath("m/44'/0'/0'/0/"+"0") 
      // console.log("path", path);
      // 
  		// let xpubString = path.neutered().toBase58();
      // console.log("path.neutered()", path.neutered());
      // console.log("xpubString", xpubString);
      
    	// pubkey = path.publicKey;
      // 
      // pubkeyArray.push(pubkey);
      pubkeyArray.push(publicKey);
    }
    
    pubkeys = pubkeyArray.map(hex => Buffer.from(hex, 'hex'));
    
  }else{
  
    pubkeys = customPubkeyArray.map(hex => Buffer.from(hex, 'hex'));;
    
  }
  
  console.log("pubkeys", pubkeys)
  
  // pubkeys.map(hex => Buffer.from(hex, 'hex'));
  
  const multisigAddress = bitcoin.payments.p2sh({
    redeem: bitcoin.payments.p2ms({ m: nKey, pubkeys }),
  });
  
  yield put(generateMultiSigAddressSuccess(addressArray, pubkeyArray, multisigAddress.address));
}
