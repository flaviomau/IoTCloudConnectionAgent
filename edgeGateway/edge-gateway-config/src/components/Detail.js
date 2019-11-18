import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import GeneralDetail from './GeneralDetail'
import AwsDetail from './AwsDetail';
import AzureDetail from './AzureDetail';
import GoogleDetail from './GoogleDetail';

class Detail extends Component {
  state = {
    general: {},
    aws: {}, 
    azure: {}, 
    google: {},
    isLoading: true,
    error: undefined
  };

  onGeneralChangeValueHandler = (val) => {
    let state = {...this.state}
    state.general[val.target.id] = val.target.value
    this.setState(state)
  }

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

  saveForm(data){
    if(!data.general.provider){
      const state = {...this.state}
      state.error = 'Select one provider'
      this.setState(state)
    }
  }

  
  componentDidMount() {
    this.callBackendAPI(this.props.match.params.id)
      .then(res => {
        if(JSON.stringify(res) !== '{}'){
          let state = this.state;
          state.general = res.general;
          state.aws = res.aws;
          state.azure = res.azure;
          state.google = res.google;
          state.isLoading = true;
          this.setState(state);
        }
      })
      .catch(err => console.log(err));
  }

  callBackendAPI = async (id) => {
    const response = await fetch('/getInput/' + id);
    const body = await response.json();
    if (response.status !== 200) {
      throw Error(body.message)
    }
    return body;
  };
  

  render() {
    const { general, aws, azure, google } = this.state;
    return (
      <div>
        <h1 className="header">Edit item</h1>
        <Form>
          <GeneralDetail general={general} onChangeValue={this.onGeneralChangeValueHandler}/><br />
          <AwsDetail aws={aws} onChangeValue={this.onAwsChangeValueHandler}/><br />
          <AzureDetail azure={azure} onChangeValue={this.onAzureChangeValueHandler}/><br />
          <GoogleDetail google={google} onChangeValue={this.onGoogleChangeValueHandler}/><br />
          {
            this.state.error && <Alert variant='danger'>{this.state.error}</Alert>
          }          
          <Button variant="primary" onClick={ () => this.saveForm(this.state)}>
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}

export default Detail;
