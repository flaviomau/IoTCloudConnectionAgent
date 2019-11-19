import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ItemCard from './ItemCard'
import ProviderCard from './ProviderCard'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'

class Dashboard extends Component {
  state = {
    inputs: [],
    providers: [],
    isLoading: true
  };

  componentDidMount() {    
    this.loadData();
  }

  loadData = async () => {
    try {
      const inputs = await this.getInputs();
      const providers = await this.getProviders();
      this.setState({
        isLoading: false,
        inputs,
        providers
      });
    } catch (err){
      console.log(err);
    }
  }

  getInputs = async () => {
    const response = await fetch('/inputs');
    const body = await response.json();
    if (response.status !== 200) {
      throw Error(body.message)
    }
    return body.inputs;
  };

  getProviders = async () => {
    const response = await fetch('/providers');
    const body = await response.json();
    if (response.status !== 200) {
      throw Error(body.message)
    }
    return body.providers;
  };

  render() {
    return (
      <div>
        <Container>
          <Row>
            {
              !this.state.isLoading && 
              this.state.providers.length > 0 && 
              this.state.providers.map(item => {
                return (
                  <Col key={item.name}>
                    <ProviderCard item={item} />
                  </Col>                  
                );
              })
            }                        
          </Row>
        </Container>
        <br/>
        <h2 className="header">Itens available <Link to={`/item/new`} className="float-sm-right">new item</Link></h2>
        {
          !this.state.isLoading && 
          this.state.inputs.length > 0 && 
          this.state.inputs.map(item => {
            return (
              <div key={item.id}>
                <ItemCard item={item} />
                <br />
              </div>
            )
          })
        }
      </div>
    );
  }
}

export default Dashboard;
