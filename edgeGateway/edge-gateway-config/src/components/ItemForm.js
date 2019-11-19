import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

class ItemForm extends Component {
  state = {
    data: {},
    isLoading: true,
    error: undefined
  };
  label = 'Edit item'

  onChangeValue = (val) => {
    let state = { ...this.state }
    state.data[val.target.id] = val.target.value
    this.setState(state)
  }

  async deleteForm(id) {
    try {        
      await this.deleteItem(id);
      this.props.history.push('/')
    } catch (err) {
      let state = { ...this.state }
      state.error = err.message
      this.setState(state)
    }
  }

  async saveForm(data) {
    if (!data.provider) {
      const state = { ...this.state }
      state.error = 'Select one provider'
      this.setState(state)
    } else {
      try {        
        await this.saveItem(data);
        this.props.history.push('/')
      } catch (err) {
        let state = { ...this.state }
        state.error = err.message
        this.setState(state)
      }
    }
  }

  componentDidMount() {
    let state = this.state;
    if (this.props.match.params.id.trim() === 'new') {
      this.label = 'New item'
      state.isLoading = false;
      this.setState(state);
    } else {
      this.getItem(this.props.match.params.id)
        .then(res => {
          if (JSON.stringify(res) !== '{}') {
            state.data = res;
            state.isLoading = false;
            this.setState(state);
          }
        })
        .catch(err => console.log(err));
    }    
  }

  getItem = async (id) => {
    const response = await fetch('/itens/' + id);
    const body = await response.json();
    if (response.status !== 200) {
      throw Error(body.message)
    }
    return body;
  }

  saveItem = async (data) => {
    let method = 'post'
    let url = '/itens'

    if(this.label === 'Edit item'){
      method = 'put'
      url = `/itens/${data.id}`
    }
    
    const response = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data })
    })
    if (response.status !== 200) {
      throw Error('Error saving data')
    }
  }

  deleteItem = async (id) => {
    const method = 'delete'
    const url = `/itens/${id}`
    
    const response = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' }
    })
    if (response.status !== 200) {
      throw Error('Error saving data')
    }
  }

  render() {
    const { data, isLoading } = this.state;
    return (
      <div>
        {
          !isLoading &&
          <div>
            <h1 className="header">{this.label}</h1>
            <Form>
              <Card >
                <Card.Body>
                  <Form.Group controlId="id">
                    <Form.Label>Id</Form.Label>
                    <Form.Control type="text" placeholder="Id" value={data.id} onChange={this.onChangeValue} />
                  </Form.Group>
                  <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Name" value={data.name} onChange={this.onChangeValue} />
                  </Form.Group>
                  <Form.Group controlId="interval">
                    <Form.Label>Interval (simulate sensor)</Form.Label>
                    <Form.Control type="text" placeholder="Interval" value={data.interval} onChange={this.onChangeValue} />
                  </Form.Group>
                  <Form.Group controlId="max_value">
                    <Form.Label>Max Value (simulate sensor)</Form.Label>
                    <Form.Control type="text" placeholder="Max Value" value={data.max_value} onChange={this.onChangeValue} />
                  </Form.Group>
                  <Form.Group controlId="provider">
                    <Form.Label>Provider</Form.Label>
                    <Form.Control as="select" value={data.provider} onChange={this.onChangeValue}>
                      <option></option>
                      <option>AWS</option>
                      <option>AZURE</option>
                      <option>GOOGLE</option>
                    </Form.Control>
                  </Form.Group>
                </Card.Body>
              </Card>
              <br />
              {
                this.state.error && <Alert variant='danger'>{this.state.error}</Alert>
              }
              <Button variant="primary" onClick={() => this.saveForm(this.state.data)}>
                Save
              </Button>
              {
                (this.label === 'Edit item') &&
                <Button variant="danger" className="float-sm-right" onClick={() => this.deleteForm(this.state.data.id)}>
                  Delete
                </Button>
              }              
            </Form>
          </div>
        }
      </div>
    );
  }
}

export default ItemForm;