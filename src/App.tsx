import * as DappUI from '@multiversx/sdk-dapp/UI';
import { DappProvider } from '@multiversx/sdk-dapp/wrappers';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Layout from './components/Layout';
import { network } from './config';
import { ContextProvider } from './context';
import PageNotFound from './pages/PageNotFound';
import Unlock from './pages/Unlock';
import { routeNames } from './routes';
import routes from './routes';
import { TransactionsTracker } from 'components/TransactionsTracker/index.js';
import { AxiosInterceptorContext } from '@multiversx/sdk-dapp/wrappers/AxiosInterceptorContext/AxiosInterceptorContext';


const App = () => (

  <AxiosInterceptorContext.Provider>
    <AxiosInterceptorContext.Interceptor
      // todo: fix Domanis typo when new sdk-dapp is released
      authenticatedDomanis={[network.apiAddress,
      network.gatewayAddress,
        'https://internal-api.multiversx.com']}
    >
      <Router>
        <DappProvider
          environment={network.id}
          customNetworkConfig={{
            ...network
          }}
          dappConfig={{
            shouldUseWebViewProvider: true,
            logoutRoute: '/unlock'
          }}
          customComponents={{
            transactionTracker: {
              // uncomment this to use the custom transaction tracker
              component: TransactionsTracker,
              props: {
                onSuccess: (sessionId: string) => {
                  console.log(`Session ${sessionId} successfully completed`);
                },
                onFail: (sessionId: string, errorMessage: string) => {
                  console.log(`Session ${sessionId} failed. ${errorMessage ?? ''}`);
                }
              }
            }
          }}
        >

          <AxiosInterceptorContext.Listener>
            <ContextProvider>
              <Layout>
                <DappUI.TransactionsToastList />
                <DappUI.NotificationModal />
                <DappUI.SignTransactionsModals />
                <Routes>
                  <Route path={routeNames.unlock} element={<Unlock />} />

                  {routes.map((route: any, index: number) => (
                    <Route
                      path={route.path}
                      key={'route-key-' + index}
                      element={<route.component />}
                    />
                  ))}
                  <Route element={<PageNotFound />} />
                </Routes>
              </Layout>
            </ContextProvider>
          </AxiosInterceptorContext.Listener>
        </DappProvider>
      </Router>
    </AxiosInterceptorContext.Interceptor>
  </AxiosInterceptorContext.Provider>
);

export default App;
