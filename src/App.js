import './App.css';
import 'antd/dist/antd.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import MasterLayout from './layouts/Master';
import Comics from './containers/Comics/Comics';
import Home from './containers/Home/Home';
import ManageComics from './containers/Comics/ManageComics';
import { Provider } from 'react-redux';
import {store} from './redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <MasterLayout>
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/comics' exact component={Comics} />
            <Route path='/comics/manage' component={ManageComics} />
          </Switch>
        </MasterLayout>
      </Router>
    </Provider>
  );
}

export default App;
