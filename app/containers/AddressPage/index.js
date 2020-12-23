/**
 *
 * AddressPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import {makeSelectAddressPage} from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import Input from './Input';

import Style from './Style';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import './react-tabs.css';

import Toggle from 'react-toggle'
import "react-toggle/style.css"

import {
  changeNkey,
  changeMkey,
  generateMultiSigAddress,
  generateSingleSigAddress,
  generateSingleSigAddressCustom,
  changeSeedSingleCustom,
  changeSeedSingleNonce,
  changeCustomPubkeyStatus,
  changePubkeyValue,
} from '../AddressPage/actions';

export function AddressPage({
  onChangeMkey,
  onChangeNkey,
  addressPage,
  onGenerateSingleSigAddress,
  onGenerateSingleSigAddressCustom,
  onChangeSeedSingleCustom,
  onChangeSeedSingleNonce,
  onGenerateMultiSigAddress,
  onChangeCustomPubkeyStatus,
  onChangePubkeyValue,
}) {
  useInjectReducer({ key: 'addressPage', reducer });
  useInjectSaga({ key: 'addressPage', saga });
  
  
  const hdSingleAddresses = addressPage.addressSingleArray.map((address, index) =>
    <div key={index}>
      <div>
        {index} - {address}
      </div>
    </div>
  );
  
  const multiAddresses = addressPage.addressMultiArray.map((addr, index) =>
    <div key={index}>
      <div>
        {index} - {addr}
      </div>
    </div>
  );
  
  const multiPubKey = addressPage.pubkeyMultiArray.map((pubkey, index) =>
    <div key={index}>
      <div>
        {index} - {pubkey}
      </div>
    </div>
  );
  

  return (
    <Style>
      <div className="section">
        <h3>
          Segwit HD Address Generator
        </h3>
        <Tabs>
          <TabList>
            <Tab>Generate randomly</Tab>
            <Tab>Generate with parameters </Tab>
          </TabList>

          <TabPanel>
            <div>
              <button onClick={() => onGenerateSingleSigAddress()}>
                Generate
              </button>
            </div>
            <div className="singleSeed">
              <div className="title">
                Seed:
              </div>
              <div>
                {addressPage.seedSingle}
              </div>
            </div>
            <div className="singleAddresses">
              <div className="title">
                Derivation Path Address:
              </div>
              {hdSingleAddresses}
            </div>
          </TabPanel>

          <TabPanel>
            <div className={(addressPage.seedSingleCustom == "") ? "disabled" : ""}>
              <button onClick={() => onGenerateSingleSigAddressCustom()}>
                Generate
              </button>
            </div>
            <div className="singleSeed">
              <div className="title">
                Seed:
              </div>
              <div>
                <Input
                  id="seedSingleCustom"
                  type="text"
                  value={addressPage.seedSingleCustom}
                  onChange={onChangeSeedSingleCustom}
                />
              </div>
            </div>
            <div className="singleSeed">
              <div className="title">
                Nonce:
              </div>
              <div>
                <Input
                  id="seedSingleNonce"
                  type="number"
                  min="0"
                  value={addressPage.seedSingleCustomNonce}
                  onChange={onChangeSeedSingleNonce}
                />
              </div>
            </div>
            <div className="singleAddresses">
              <div className="title">
                Address:
              </div>
              <div>
                {addressPage.seedSingleCustomAddress}
              </div>
            </div>
          </TabPanel>
        </Tabs>
      </div>
      <div className="section">
        <h3>
          Multisig P2SH Address Generator
        </h3>
        <Tabs>
          <TabList>
            <Tab>Generate by N of M Keys</Tab>
          </TabList>

          <TabPanel>
            <div className="sectionSub">
              <div className="title">
                Multisig Configuration:
              </div>
              <div>
                <div className="span">
                  <Input
                    id="nKey"
                    type="number"
                    min="1"
                    value={addressPage.nKey}
                    onChange={onChangeNkey}
                  />
                </div>
                <div className="span spanOf">
                  of
                </div>
                <div className="span">
                  <Input
                    id="mKey"
                    type="number"
                    min="2"
                    max="10"
                    value={addressPage.mKey}
                    onChange={onChangeMkey}
                  />
                </div>
                <div className="clear"></div>
              </div>
            </div>
            <div className="sectionSub">
              <div className="title">
                Define Custom Public Keys:
              </div>
              
              <div>
                <label>
                  <Toggle
                    defaultChecked={addressPage.customPubkeyStatus}
                    onChange={onChangeCustomPubkeyStatus} />
                </label>
              </div>
              
              <div className={(addressPage.customPubkeyStatus) ? "" : "hide"}>
                {[...Array(parseInt(addressPage.mKey))].map((elementInArray, index) => ( 
                  <div key={index}>
                    <div>
                      Pub Key {index}:
                    </div>
                    <div>
                      <Input
                        id={index}
                        type="text"
                        value={addressPage.customPubkeyArray[index]}
                        onChange={onChangePubkeyValue}
                      />
                    </div>
                  </div>
                  ) 
                )}
              </div>
            </div>
            
            <div className="sectionSub">
              <button onClick={() => onGenerateMultiSigAddress()}>
                Generate
              </button>
            </div>
            <div className={(addressPage.customPubkeyStatus) ? "hide" : "multiSeed"}>
              <div className="title">
                Addresses:
              </div>
              
              {multiAddresses}
            </div>
            
            <div className={(addressPage.customPubkeyStatus) ? "hide" : "multiPubkey"}>
              <div className="title">
                PubKey:
              </div>
              
              {multiPubKey}
            </div>
            
            <div className="multiAddress">
              <div className="title">
                Multisig Address:
              </div>
              <div>
                {addressPage.addressMulti}
              </div>
            </div>
          </TabPanel>
        </Tabs>
      </div>
    </Style>
  );
}

AddressPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  addressPage: makeSelectAddressPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onChangeNkey: evt => dispatch(changeNkey(evt.target.value)),
    onChangeMkey: evt => dispatch(changeMkey(evt.target.value)),
    onGenerateSingleSigAddress: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(generateSingleSigAddress(evt));
    },
    onGenerateSingleSigAddressCustom: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(generateSingleSigAddressCustom(evt));
    },
    onChangeSeedSingleCustom: evt => dispatch(changeSeedSingleCustom(evt.target.value)),
    onChangeSeedSingleNonce: evt => dispatch(changeSeedSingleNonce(evt.target.value)),
    onChangeCustomPubkeyStatus: evt => dispatch(changeCustomPubkeyStatus(evt.target.value)),
    onChangePubkeyValue: evt => dispatch(changePubkeyValue(evt.target.id, evt.target.value)),
    onGenerateMultiSigAddress: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(generateMultiSigAddress(evt));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(AddressPage);
