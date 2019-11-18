import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ItemCard from './ItemCard'

class Itens extends Component {
  state = {
    data: null,
    isLoading: true
  };

  componentDidMount() {
    this.callBackendAPI()
      .then(res => this.setState({ data: res.inputs, isLoading: false }))
      .catch(err => console.log(err));
  }

  callBackendAPI = async () => {
    const response = await fetch('/getInputs');
    const body = await response.json();
    if (response.status !== 200) {
      throw Error(body.message)
    }
    return body;
  };

  render() {
    return (
      <div>
        <h1 className="header">Itens available <Link to={`/new`} className="float-sm-right">Add new item</Link></h1>
        {
          !this.state.isLoading && 
          this.state.data.length > 0 && 
          this.state.data.map(item => {
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

export default Itens;
