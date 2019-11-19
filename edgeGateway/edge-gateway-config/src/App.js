import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Container from 'react-bootstrap/Container'
import Dashboard from './components/Dashboard'
import ItemForm from './components/ItemForm'
import ProviderForm from './components/ProviderForm'
import 'bootstrap/dist/css/bootstrap.min.css'


function App() {
  return (
    <div className="App">
      <Container>
        <Jumbotron>
          <BrowserRouter>
            <Switch>
              <Route path="/item/:id" component={ItemForm} exact />
              <Route path="/provider/:name" component={ProviderForm} exact />
              <Route path="/" exact={true} component={Dashboard} />
            </Switch>
          </BrowserRouter>
        </Jumbotron>
      </Container>
    </div>
  );
}

export default App