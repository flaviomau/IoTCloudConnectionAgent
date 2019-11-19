import React from 'react'
import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card'

const colors = {AWS:'secondary', AZURE:'primary', GOOGLE:'success'}
const ProviderCard = (props) => {
  var fields = Object.keys(props.item).map( key => {
    return <li key={key}>{key} : {props.item[key]}</li>;
  })

  return (
    <Card bg={colors[props.item.name]} text="white">
      <Card.Header>
        {props.item.name} 
        <Link to={`/provider/${props.item.name}`} className="float-sm-right text-white" text="white">Edit</Link>
      </Card.Header>
      <Card.Body>
        <ul> { fields } </ul>
      </Card.Body>
    </Card>
  )
}

export default ProviderCard