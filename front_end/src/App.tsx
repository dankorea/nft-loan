import React from 'react';
import { Mainnet, DAppProvider, Config, Goerli } from '@usedapp/core'
import { getDefaultProvider } from 'ethers'
import { Header } from "./components/Header"
import Container from '@mui/material/Container'
import { Main } from "./components/Main"

const config: Config = {
  networks: [Goerli],
  readOnlyChainId: Goerli.chainId,
  readOnlyUrls: {
    //[Mainnet.chainId]: getDefaultProvider('mainnet'),
    [Goerli.chainId]: 'https://goerli.infura.io/v3/04586e9cd0484ad18018ca61d9da4c76',
  },
  notifications: {
    expirationPeriod: 1000,
    checkInterval: 1000
  },
}

function App() {
  return (
    <DAppProvider config={config}>
      <Header />
      <Container maxWidth="md">
        <Main />
      </Container>
    </DAppProvider>

  );
}

export default App;
