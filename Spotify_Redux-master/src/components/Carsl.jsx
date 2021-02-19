import React from "react";
import { Container } from "react-bootstrap";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";
import axios from "axios";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 7,
  },
  mobile: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
  },
};

class Carsl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      artistId: "",
    };
  }
  componentDidMount = async () => {
    let link = this.props.link.toLowerCase();
    let response = await fetch(`https://cors-anywhere.herokuapp.com/${link}`);

    let parsedJson = await response.json();
    let data = parsedJson.data;
    this.setState({ data });
  };
  componentDidUpdate = async (prevProps) => {
    if (prevProps.name !== this.props.name) {
      let link = this.props.link.toLowerCase();
      let response = await fetch(`https://cors-anywhere.herokuapp.com/${link}`);

      let parsedJson = await response.json();
      let data = parsedJson.data;
      this.setState({ data });
    }
  };
  render() {
    return (
      <Container fluid className="crsl mt-3 mb-3">
        <p>{this.props.heading}</p>
        <Carousel
          ssr={true} // means to render carousel on server-side.
          //  infinite={true}
          //  autoPlay={this.props.deviceType !== "mobile" ? true : false}
          autoPlaySpeed={2000}
          swipeable={false}
          draggable={false}
          //  showDots={true}
          responsive={responsive}
          className="carouselContent"
        >
          {this.state.data.map((element) => {
            return (
              <div className="col">
                {this.props.type === "albums" && (
                  <Link to={`/ShowAlbum/${element.id}`}>
                    <img src={element.cover_medium} alt="" />
                    <p className="cardBody">{element.title}</p>
                  </Link>
                )}
                {this.props.type === "podcasts" && (
                  <Link to={"/podcasts/"}>
                    <img src={element.picture_medium} alt="" />
                    <p className="cardBody">{element.title}</p>
                  </Link>
                )}
                {this.props.type === "playlists" && (
                  <Link to={`/playlist/${element.id}`}>
                    <img src={element.picture_medium} alt="" />
                    <p className="cardBody">{element.title}</p>
                  </Link>
                )}
                {this.props.type === "artists" && (
                  <Link to={`/artists/${element.id}`}>
                    <img src={element.picture_medium} alt="" />
                    <p className="cardBody">{element.name}</p>
                  </Link>
                )}
                {this.props.type === "artistInfo" && (
                  <Link to={`/showAlbum/${element.id}`}>
                    <img src={element.cover_medium} alt="" />
                    <p className="cardBody">{element.title}</p>
                  </Link>
                )}
              </div>
            );
          })}
        </Carousel>
      </Container>
    );
  }
}
export default Carsl;
