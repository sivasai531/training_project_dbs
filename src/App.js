import './App.css';
import PaymentComponent from './components/PaymentComponent';
import NavbarComponent from './components/NavbarComponent';
import './styles.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import ResultComponent from './components/ResultComponent';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <Router>
    <div className="App">
      <NavbarComponent />
      <Switch>
        <Route exact path='/'>
          <PaymentComponent />
        </Route>

        <Route path='/result'>
          <ResultComponent />
        </Route>

        <Route path='/dashboard'>
          <Dashboard />
        </Route>
      </Switch>

      

    </div>
    </Router>
  );
}

export default App;
