import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'

class ProviderForm extends Component {
  state = {
    data: {},
    isLoading: true,
    error: undefined
  };

  onChangeValue = (val) => {
    let state = { ...this.state }
    state.data[val.target.id] = val.target.value
    this.setState(state)
  }

  async saveForm(data) {
    try {
      await this.saveProvider(data);
      this.props.history.push('/')
    } catch (err) {
      let state = { ...this.state }
      state.error = err.message
      this.setState(state)
    }
  }

  componentDidMount() {
    this.getProviderByName(this.props.match.params.name)
      .then(res => {
        if (JSON.stringify(res) !== '{}') {
          let state = this.state;
          state.data = res;
          state.isLoading = false;
          this.setState(state);
        }
      })
      .catch(err => console.log(err));
  }

  getProviderByName = async (name) => {
    const response = await fetch('/providers/' + name);
    const body = await response.json();
    if (response.status !== 200) {
      throw Error(body.message)
    }
    return body;
  }

  saveProvider = async (data) => {
    const response = await fetch(`/providers/${data.name}`, {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data })
    })
    if (response.status !== 200) {
      throw Error('Error saving data')
    }
  }

  render() {
    const { data, isLoading } = this.state;
    return (
      !isLoading &&
      <div>
        <h2 className="header">Edit provider: {data.name}</h2>
        <Form>
          {
            Object.keys(data).length > 0 &&
            Object.keys(data).map((key, id) => {
              return (
                key !== 'name' &&
                <Form.Group controlId={key} key={id}>
                  <Form.Label>{key}</Form.Label>
                  <Form.Control as="textarea" rows="3" value={data[key]} onChange={this.onChangeValue} />
                </Form.Group>
              );
            })
          }
          {
            this.state.error && <Alert variant='danger'>{this.state.error}</Alert>
          }
          <Button variant="primary" onClick={() => this.saveForm(this.state.data)}>
            Save
          </Button>          
        </Form>
      </div>
    );
  }
}

export default ProviderForm;
