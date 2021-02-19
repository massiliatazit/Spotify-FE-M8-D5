import React, { Component } from "react";
import CardsContainer from "../components/CardsContainer";
import Carsl from "./Carsl";
import SideBar from "./SideBar";

import Player from "./Player";

export class Artist extends Component {
  state = {
    artistInfo: [],
    loading: true,
  };
  componentDidMount = async () => {
    let id = this.props.match.params.id;
    let response = await fetch(
      "https://deezerdevs-deezer.p.rapidapi.com/artist/" + id,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
          "x-rapidapi-key":
            "49a206362dmshb20519b822912b7p1dc792jsn37f9d0304fcc",
        },
      }
    );
    let parsedJson = await response.json();
    console.log(parsedJson);
    this.setState({ artistInfo: parsedJson, loading: false });
  };
  render() {
    return (
      <>
        <SideBar />
        <div id="artistContent">
          <div id="contentHeader" style={{ opacity: "0.8" }}>
            <img id="bgImage" src={this.state.artistInfo.picture_big} alt="" />
            <div className="container" id="artistName">
              <p style={{ fontSize: "10px", letterSpacing: "0.2rem" }}>
                {this.state.artistInfo.nb_fan} MONTHLY LISTENERS
              </p>
              <p style={{ fontSize: "50px", fontWeight: "600" }}>
                {this.state.artistInfo.name}
              </p>
              <div id="headerButtons">
                <button type="button" className="btn ">
                  PLAY
                </button>
                <button type="button" className="btn ">
                  FOLLOW
                </button>
                <i className="fas fa-ellipsis-h"></i>
              </div>
            </div>
          </div>
          <div id="shadow">
            <div className="container" id="info">
              <nav>
                <p className="active">OVERVIEW</p>
                <p>RELATED ARTISTS</p>
                <p>ABOUT</p>
              </nav>
            </div>
            <div className="container" id="albumCards">
              <p
                style={{
                  fontWeight: "600",
                  color: "white",
                  fontSize: "20px",
                  margin: "0px",
                }}
              >
                Albums
              </p>
              {this.state.loading ? (
                <p>Loading.....</p>
              ) : (
                <CardsContainer
                  link={`https://api.deezer.com/artist/${this.props.match.params.id}/albums`}
                  for="artistAlbums"
                />
              )}
            </div>
          </div>
        </div>
        <Player />
      </>
    );
  }
}

export default Artist;
