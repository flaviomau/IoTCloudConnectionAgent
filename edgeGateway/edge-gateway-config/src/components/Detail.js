import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import AwsDetail from './AwsDetail';
import AzureDetail from './AzureDetails';
import GoogleDetail from './GoogleDetail';

class Detail extends Component {
  state = {
    data: {},
    aws: {}, 
    azure: {}, 
    google: {},
    isLoading: true
  };

  onAwsChangeValueHandler = (val) => {
    let state = {...this.state}
    state.aws[val.target.id] = val.target.value
    this.setState(state)
  }

  onAzureChangeValueHandler = (val) => {
    let state = {...this.state}
    state.azure[val.target.id] = val.target.value
    this.setState(state)
  }

  onGoogleChangeValueHandler = (val) => {
    let state = {...this.state}
    state.google[val.target.id] = val.target.value
    this.setState(state)
  }

  /*
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
  */

  render() {
    const { aws, azure, google } = this.state;
    return (
      <div>
        <h1 className="header">Edit item</h1>
        <Form>
          <Card >
            <Card.Header>
              General information
            </Card.Header>
            <Card.Body>
              <Form.Group controlId="item.id">
                <Form.Label>Id</Form.Label>
                <Form.Control type="text" placeholder="Id" />
              </Form.Group>
              <Form.Group controlId="item.interval">
                <Form.Label>Interval (simulate sensor)</Form.Label>
                <Form.Control type="text" placeholder="Interval" />
              </Form.Group>
              <Form.Group controlId="item.max_value">
                <Form.Label>Max Value (simulate sensor)</Form.Label>
                <Form.Control type="text" placeholder="Max Value" />
              </Form.Group>
              <Form.Group controlId="item.provider.name">
                <Form.Label>Provider</Form.Label>
                <Form.Control as="select">
                  <option>AWS</option>
                  <option>AZURE</option>
                  <option>GOOGLE</option>
                </Form.Control>
              </Form.Group>
            </Card.Body>
          </Card>
          <br />
          <AwsDetail aws={aws} onChangeValue={this.onAwsChangeValueHandler}/>
          <br />
          <AzureDetail azure={azure} onChangeValue={this.onAzureChangeValueHandler}/>
          <br />
          <GoogleDetail google={google} onChangeValue={this.onGoogleChangeValueHandler}/>
          <br />
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}

export default Detail;
