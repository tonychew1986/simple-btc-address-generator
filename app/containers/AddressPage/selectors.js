import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the addressPage state domain
 */

const selectAddressPageDomain = state => state.addressPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by AddressPage
 */

const makeSelectAddressPage = () =>
  createSelector(
    selectAddressPageDomain,
    substate => substate,
  );

// export default makeSelectAddressPage;
export { 
  selectAddressPageDomain,
  makeSelectAddressPage
};
