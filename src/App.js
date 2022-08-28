import './App.scss';
import { Content, Theme } from '@carbon/react';
import HeaderNav from './components/Header';
import { Route, Switch } from 'react-router-dom';
import CustomerPage from './content/CustomerPage';
import LandingPage from './content/LandingPage';

function App() {
  return (
    <>
      <Theme theme="g100">
        <HeaderNav />
      </Theme>
      <Content>
        <Switch>
          <Route exact path="/landingpage" component={LandingPage} />
          <Route path="/customer" component={CustomerPage} />
        </Switch>
      </Content>
    </>
  );
}

export default App;
