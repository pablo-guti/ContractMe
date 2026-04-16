# ContractMe

## Compile and deploy contracts

First, install Truffle globally

npm install -g truffle

You also need to install Ganache from this link https://archive.trufflesuite.com/ganache/


To compile and deploy the contract, run


truffle compile
truffle migrate

To be able to interact with the contract, Ganache GUI must be running on the same port indicated in the `/truffle-config.js` file.

**Note:** The following error will appear when migrating the contract to the network:

This version of µWS is not compatible with your Node.js build:

Error: Cannot find module '../binaries/uws_win32_x64_120.node'''

This error is not relevant, simply ignore it


- Once the contract has been compiled, a `.json` file will be generated in `/build/contracts`. Take that file and paste it into the path `/Front-End-ContractMe/contracts`. **This step is very important**




## To preview and run the project on your device:

1. Open the project folder in **Visual Studio Code**, in this case you need to go to the `/Front-End-Contractme` folder.
2. Run `npm install` in the terminal. Keep in mind that the Node version I am using is 21.7.1
3. Install Expo Go on your Android/iOS device. **Very important**: Install version 50 of Expo Go from its official website https://expo.dev/go
4. Run `npx expo start` in the terminal and from Expo Go scan the QR code that appears
