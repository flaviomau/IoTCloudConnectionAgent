import React from 'react'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'

const AwsDetail = (props) => {
  const { aws , onChangeValue } = props;
  return (
    <Card >
      <Card.Header>
        AWS information
      </Card.Header>
      <Card.Body>
        <Form.Group controlId="keyPath">
          <Form.Label>private.pem.key content</Form.Label>
          <Form.Control as="textarea" rows="3" value={aws.keyPath} onChange={onChangeValue}/>
        </Form.Group>
        <Form.Group controlId="certPath">
          <Form.Label>certificate.pem.crt content</Form.Label>
          <Form.Control as="textarea" rows="3" value={aws.certPath} onChange={onChangeValue}/>
        </Form.Group>
        <Form.Group controlId="caPath">
          <Form.Label>Amazon_Root_CA_1.pem content</Form.Label>
          <Form.Control as="textarea" rows="3" value={aws.caPath} onChange={onChangeValue}/>
        </Form.Group>
        <Form.Group controlId="clientId">
          <Form.Label>clientId</Form.Label>
          <Form.Control type="text" placeholder="Temperature" value={aws.clientId} onChange={onChangeValue}/>
        </Form.Group>
        <Form.Group controlId="host">
          <Form.Label>host</Form.Label>
          <Form.Control type="text" placeholder="a1o75ar5db2e1a-ats.iot.us-east-2.amazonaws.com" value={aws.host} onChange={onChangeValue}/>
        </Form.Group>
      </Card.Body>
    </Card>
  )
}

export default AwsDetail