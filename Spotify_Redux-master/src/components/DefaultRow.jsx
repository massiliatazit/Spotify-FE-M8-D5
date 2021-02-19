import React from 'react'
import {Container,Row,Col,Card} from 'react-bootstrap'

function DefaultRow(props) {
  return (
    <Container className='mt-4'>
      <p>{props.name}</p>
      <Row className="row row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-6">
        {props.images.map(image =>{
          return(
            <Col>
              <Card>
                <Card.Img variant="top" src={image.img} />
                <p className="cardBody">{image.name}</p>
              </Card>
            </Col>
          )
        })}
      </Row>
    </Container>
  )
}

export default DefaultRow
