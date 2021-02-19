import React, { Component } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import SideBar from "./SideBar";

export class CardsContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: "",
    };
  }

  componentDidMount = async () => {
    let link = this.props.link.toLowerCase();
    let response = await fetch(`https://cors-anywhere.herokuapp.com/${link}`);

    let parsedJson = await response.json();
    let data = parsedJson.data;
    this.setState({ data });
  };
  render() {
    return (
      <Container id="cardsContainer">
        <Row className="rows row-cols-xs-2 row-cols-md-3 row-cols-lg-5 ">
          {this.state.data.length > 0 && this.props.for === "artistAlbums"
            ? this.state.data.map((element) => {
                return (
                  <Col className="mt-4">
                    <Link to={`/showAlbum/${element.id}`}>
                      <Card>
                        <Card.Img variant="top" src={element.cover_medium} />
                        <Card.Body className="cardBody">
                          <p>{element.title}</p>
                        </Card.Body>
                      </Card>
                    </Link>
                  </Col>
                );
              })
            : null}
          {this.state.data.length > 0 && this.props.for === "search"
            ? this.state.data.map((element) => {
                return (
                  <Col className="mt-4 ">
                    <Link to={`/showAlbum/${element.album.id}`}>
                      <Card>
                        <Card.Img
                          variant="top"
                          src={element.album.cover_medium}
                        />
                        <Card.Body className="cardBody">
                          <p>{element.title}</p>
                        </Card.Body>
                      </Card>
                    </Link>
                  </Col>
                );
              })
            : null}
        </Row>
      </Container>
    );
  }
}

export default CardsContainer;
