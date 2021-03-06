Simple Bitcoin Wallet Generator
=====================================
PoC for generating bitcoin addresses

Features
----------------
- generate segwit address
- generate p2sh multisig address

To do
----------------
- BIP38 - Passphrase-protected private keys
- BIP39 - Mnemonic generation for deterministic keys
- BIP68 - Relative lock-time encoding library
- Multisig
- testnet selection
- PSBT


## Instructions

Install NPM modules on fresh deployment:

```bash
$ npm install
```

To run in development mode:

```bash
$ npm start
```

To prepare production ready build:

```bash
$ npm run build
```

To run in production mode:

```bash
$ npm run start:prod
```

To generate new react container / component:

```bash
$ npm run generate
```
