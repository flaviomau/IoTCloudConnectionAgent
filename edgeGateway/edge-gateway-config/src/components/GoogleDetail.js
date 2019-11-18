import React from 'react'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'

const GoogleDetail = (props) => {
  const { google , onChangeValue } = props;
  return (
    <Card >
      <Card.Header>
        GOOGLE information
      </Card.Header>
      <Card.Body>
        <Form.Group controlId="registryId">
          <Form.Label>registryId</Form.Label>
          <Form.Control type="text" placeholder="mobodexter" value={google.registryId} onChange={onChangeValue}/>
        </Form.Group>
        <Form.Group controlId="deviceId">
          <Form.Label>deviceId</Form.Label>
          <Form.Control type="text" placeholder="Humidity" value={google.deviceId} onChange={onChangeValue}/>
        </Form.Group>
        <Form.Group controlId="projectId">
          <Form.Label>projectId</Form.Label>
          <Form.Control type="text" placeholder="vanhackathon-mobodexter-259222" value={google.projectId} onChange={onChangeValue}/>
        </Form.Group>
        <Form.Group controlId="privateKeyFile">
          <Form.Label>rsa_private.pem content</Form.Label>
          <Form.Control as="textarea" rows="3" value={google.privateKeyFile} onChange={onChangeValue}/>
        </Form.Group>
        <Form.Group controlId="algorithm">
          <Form.Label>algorithm</Form.Label>
          <Form.Control type="text" placeholder="RS256" value={google.algorithm} onChange={onChangeValue}/>
        </Form.Group>
        <Form.Group controlId="region">
          <Form.Label>region</Form.Label>
          <Form.Control type="text" placeholder="us-central1" value={google.region} onChange={onChangeValue}/>
        </Form.Group>
        <Form.Group controlId="mqttBridgeHostname">
          <Form.Label>mqttBridgeHostname</Form.Label>
          <Form.Control type="text" placeholder="mqtt.googleapis.com" value={google.mqttBridgeHostname} onChange={onChangeValue}/>
        </Form.Group>
        <Form.Group controlId="mqttBridgePort">
          <Form.Label>mqttBridgePort</Form.Label>
          <Form.Control type="text" placeholder="8883" value={google.mqttBridgePort} onChange={onChangeValue}/>
        </Form.Group>
        <Form.Group controlId="messageType">
          <Form.Label>messageType</Form.Label>
          <Form.Control type="text" placeholder="events" value={google.messageType} onChange={onChangeValue}/>
        </Form.Group>
      </Card.Body>
    </Card>
  )
}

export default GoogleDetail