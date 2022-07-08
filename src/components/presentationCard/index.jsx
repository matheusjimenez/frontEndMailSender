import React from 'react';
import { Card, CardTitle, CardText, Button } from 'reactstrap'

function PresentationCard({ user }) {
  return (
    <div>
      <Card
        body
        inverse
        style={{
          backgroundColor: '#094f6d',
          borderColor: '#333',
          margin: '8px 0'
        }}
      >
        <CardTitle tag="h5">
          {user.name}
        </CardTitle>
        <CardText>
          {user.email}
        </CardText>
        <Button>
          Chat
        </Button>
      </Card>
    </div>
  )
}

export { PresentationCard }