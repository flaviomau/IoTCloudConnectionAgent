import React from 'react'
import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card'

const ItemCard = (props) => {
  return (
    <Card>
      <Card.Header>
        {props.item.name} 
        <Link to={`/detail/${props.item.id}`} className="float-sm-right">Edit</Link>
      </Card.Header>
      <Card.Body>
        <ul>
          <li>Id: {props.item.id}</li>
          <li>Interval (simulate sensor): {props.item.interval}</li>
          <li>Max value (simulate sensor): {props.item.max_value}</li>
          <li>Provider: {props.item.provider.name}</li>
        </ul>
      </Card.Body>
    </Card>
  )
}

export default ItemCard