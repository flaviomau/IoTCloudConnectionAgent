import React from 'react'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'

const AzureDetail = (props) => {
  const { azure , onChangeValue } = props;
  return (
    <Card >
      <Card.Header>
        AZURE information
      </Card.Header>
      <Card.Body>
        <Form.Group controlId="provisioningHost">
          <Form.Label>provisioningHost</Form.Label>
          <Form.Control type="text" placeholder="global.azure-devices-provisioning.net" value={azure.provisioningHost} onChange={onChangeValue}/>
        </Form.Group>
        <Form.Group controlId="idScope">
          <Form.Label>idScope</Form.Label>
          <Form.Control type="text" placeholder="0ne000954EE" value={azure.idScope} onChange={onChangeValue}/>
        </Form.Group>
        <Form.Group controlId="registrationId">
          <Form.Label>registrationId</Form.Label>
          <Form.Control type="text" placeholder="1da61abd-de6e-4715-b4ae-ae83a10e112d" value={azure.registrationId} onChange={onChangeValue}/>
        </Form.Group>
        <Form.Group controlId="symmetricKey">
          <Form.Label>symmetricKey</Form.Label>
          <Form.Control type="text" placeholder="Q5nG6Dk5xoVlPzt/XveUvUj5o2boRGiuYMthEmfHM2c=" value={azure.symmetricKey} onChange={onChangeValue}/>
        </Form.Group>
      </Card.Body>
    </Card>
  )
}

export default AzureDetail