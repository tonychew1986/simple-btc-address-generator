/*
 *
 * AddressPage reducer
 *
 */
import produce from 'immer';
import { 
  CHANGE_N_KEY,
  CHANGE_M_KEY, 
  GENERATE_SINGLE_SIG_ADDRESS,
  GENERATE_SINGLE_SIG_ADDRESS_SUCCESS,
  GENERATE_MULTI_SIG_ADDRESS,
  GENERATE_MULTI_SIG_ADDRESS_SUCCESS,
  
  GENERATE_SINGLE_SIG_ADDRESS_CUSTOM,
  GENERATE_SINGLE_SIG_ADDRESS_CUSTOM_SUCCESS,
  GENERATE_SINGLE_SIG_ADDRESS_CUSTOM_ERROR,
  CHANGE_SEED_SINGLE_CUSTOM,
  CHANGE_SEED_SINGLE_NONCE,
  
  CHANGE_CUSTOM_PUB_KEY_STATUS,
  CHANGE_PUB_KEY_VALUE,
} from './constants';

export const initialState = {
  nKey: 1,
  mKey: 2,
  seedSingle: "-",
  addressSingleArray: [],
  addressMultiArray: [],
  pubkeyMultiArray: [],
  addressMulti: "",
  seedSingleCustom: "",
  seedSingleCustomNonce: 0,
  seedSingleCustomAddress: "",
  customPubkeyStatus: false,
  customPubkeyArray: [],
};

/* eslint-disable default-case, no-param-reassign */
const addressPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CHANGE_N_KEY:
        draft.nKey = action.amount;
      
        break;
        
      case CHANGE_M_KEY:
        draft.mKey = action.amount;
      
        break;
        
      case CHANGE_SEED_SINGLE_CUSTOM:
        draft.seedSingleCustom = action.seed;
      
        break;
        
      case CHANGE_SEED_SINGLE_NONCE:
        draft.seedSingleCustomNonce = action.nonce;
      
        break;
        
      case GENERATE_SINGLE_SIG_ADDRESS_SUCCESS:
        draft.seedSingle = action.seed;
        draft.addressSingleArray = action.addresses;
      
        break;
        
      case GENERATE_SINGLE_SIG_ADDRESS_CUSTOM_SUCCESS:
        draft.seedSingleCustomAddress = action.address;
      
        break;
        
      case GENERATE_MULTI_SIG_ADDRESS_SUCCESS:
        draft.addressMultiArray = action.addressArray;
        draft.pubkeyMultiArray = action.pubkeys;
        draft.addressMulti = action.address;
        console.log("action.address", action.address);
      
        break;
        
      case CHANGE_CUSTOM_PUB_KEY_STATUS:
        draft.customPubkeyStatus = !draft.customPubkeyStatus;
      
        break;
        
      case CHANGE_PUB_KEY_VALUE:
        console.log("CHANGE_PUB_KEY_VALUE", action);
        draft.customPubkeyArray[parseInt(action.index)] = action.pubkey;
      
        break;
        
        
    }
  });

export default addressPageReducer;
