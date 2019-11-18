import React from 'react'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'

const GeneralDetail = (props) => {
  const { general, onChangeValue } = props;
  return (
    <Card >
      <Card.Header>
        General information
      </Card.Header>
      <Card.Body>
        <Form.Group controlId="id">
          <Form.Label>Id</Form.Label>
          <Form.Control type="text" placeholder="Id" value={general.id} onChange={onChangeValue}/>
        </Form.Group>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Name" value={general.name} onChange={onChangeValue}/>
        </Form.Group>
        <Form.Group controlId="interval">
          <Form.Label>Interval (simulate sensor)</Form.Label>
          <Form.Control type="text" placeholder="Interval" value={general.interval} onChange={onChangeValue}/>
        </Form.Group>
        <Form.Group controlId="max_value">
          <Form.Label>Max Value (simulate sensor)</Form.Label>
          <Form.Control type="text" placeholder="Max Value" value={general.max_value} onChange={onChangeValue}/>
        </Form.Group>
        <Form.Group controlId="provider">
          <Form.Label>Provider</Form.Label>
          <Form.Control as="select" value={general.provider} onChange={onChangeValue}>
            <option></option>
            <option>AWS</option>
            <option>AZURE</option>
            <option>GOOGLE</option>
          </Form.Control>
        </Form.Group>
      </Card.Body>
    </Card>
  )
}

export default GeneralDetail