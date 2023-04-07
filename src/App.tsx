import * as DappUI from '@multiversx/sdk-dapp/UI';
import { DappProvider } from '@multiversx/sdk-dapp/wrappers';
import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Layout from './components/Layout';
import { network, walletConnectDeepLink } from './config';
import { ContextProvider } from './context';
import PageNotFound from './pages/PageNotFound';
import Unlock from './pages/Unlock';
import { routeNames } from './routes';
import routes from './routes';

const App = () => (
  <Router>
    <DappProvider
      environment={network.id}
      customNetworkConfig={{
        ...network,
        walletConnectDeepLink
      }}
    >
      <ContextProvider>
        <Layout>
          <DappUI.TransactionsToastList />
          <DappUI.SignTransactionsModals />
          <DappUI.NotificationModal />
          <Routes>
            <Route path={routeNames.unlock} element={<Unlock />} />

            {routes.map((route: any, index: number) => (
              <Route
                path={route.path}
                key={'route-key-' + index}
                element={<route.component />}
              />
            ))}
            <Route element={<PageNotFound></PageNotFound>} />
          </Routes>
        </Layout>
      </ContextProvider>
    </DappProvider>
  </Router>
);

export default App;
