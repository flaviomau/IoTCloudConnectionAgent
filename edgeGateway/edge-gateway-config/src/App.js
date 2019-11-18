import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Container from 'react-bootstrap/Container'
import Itens from './components/Itens'
import Detail from './components/Detail'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <div className="App">
      <Container>
        <Jumbotron>
          <BrowserRouter>
            <Switch>
              <Route path="/detail/:id" component={Detail} exact />
              <Route path="/" exact={true} component={Itens} />
            </Switch>
          </BrowserRouter>
        </Jumbotron>
      </Container>
    </div>
  );
}

export default App