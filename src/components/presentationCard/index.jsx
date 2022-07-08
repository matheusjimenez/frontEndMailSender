import React from 'react';
import { Card, CardTitle, CardText, Button } from 'reactstrap'

function PresentationCard({ user, clickEvent }) {
  return (
    <div>
      <Card
        onClick={()=>{clickEvent(user.id)}}
        body
        inverse
        style={{
          backgroundColor: '#094f6d',
          borderColor: '#333',
          margin: '8px 0',
          cursor: 'pointer'
        }}
      >
        <CardTitle tag="h5">
          {user.name}
        </CardTitle>
        <CardText>
          {user.email}
        </CardText>
        <Button onClick={()=>{clickEvent(user.id)}}>
          Chat
        </Button>
      </Card>
    </div>
  )
}

export { PresentationCard }