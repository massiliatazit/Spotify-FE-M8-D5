import React, { Component } from "react";
import { Container, Row, Spinner, Toast } from "react-bootstrap";
import { FaHeart, FaEllipsisH, FaMusic } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../Album.css";
import { connect } from "react-redux";
import SideBar from "./SideBar";
import Player from "./Player";

export class Playlist extends Component {
  state = {
    data: [],
    loading: true,
    showPopover: false,
    lastTrack: undefined,
  };
  componentDidMount = async () => {
    let id = this.props.match.params.id;
    let response = await fetch(
      "https://deezerdevs-deezer.p.rapidapi.com/playlist/" + id,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
          "x-rapidapi-key":
            "49a206362dmshb20519b822912b7p1dc792jsn37f9d0304fcc",
        },
      }
    );

    let data = await response.json();
    console.log(data);
    this.setState({ data, loading: false });
  };

  popOverToggle = () => {
    this.setState({ showPopover: !this.state.showPopover });
  };
  showToaster = (name) => {
    this.setState({ showPopover: true, lastTrack: name });
    setTimeout(() => {
      this.setState({ showPopover: false });
    }, 1000);
  };
  render() {
    return (
      <>
        <SideBar />
        <Container fluid id="content">
          {this.state.loading ? (
            <Spinner
              animation="border"
              variant="light"
              style={{ position: "absolute", top: "50%", left: "50%" }}
            >
              <span className="sr-only">Loading...</span>
            </Spinner>
          ) : (
            <Row>
              <div className="col-12 col-sm-12 col-lg-4">
                <div id="albumInfo">
                  <img src={this.state.data.picture_medium} alt="" />
                  <p>{this.state.data.title}</p>
                  <p>{this.state.data.creator.name}</p>
                  <button type="button" class="btn ">
                    PLAY
                  </button>
                  <p>
                    {this.state.data.fans} FOLLOWERS .{" "}
                    {this.state.data.nb_tracks}
                  </p>
                  <div id="icons">
                    <a>
                      <FaHeart />
                    </a>
                    <a>
                      <FaEllipsisH />
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-12  col-sm-12 col-lg-7">
                {this.state.data.tracks.data.map((track) => {
                  return (
                    <>
                      <div id="track">
                        <div id="trackName">
                          <a id="musicIcon">
                            <FaMusic />
                          </a>

                          <div>
                            <p
                              onClick={() => {
                                this.props.selectedSong(
                                  track,
                                  this.state.data.cover_medium
                                );
                                this.props.playQueue(track);
                                this.showToaster(track.title);
                                // this.popOverToggle()
                                // this.setState({lastTrack: track.title})
                              }}
                            >
                              {track.title}
                            </p>
                            <Link to={"/artists/" + track.artist.id}>
                              <p style={{ opacity: "0.5" }}>
                                {track.artist.name}
                              </p>
                            </Link>
                          </div>
                        </div>
                        <div>
                          <p style={{ color: "white", fontSize: "12px" }}>
                            {(track.duration / 60).toFixed(2)}{" "}
                          </p>
                        </div>
                      </div>
                    </>
                  );
                })}
              </div>
              <Toast
                style={{ position: "fixed", top: 15, right: 15 }}
                show={this.state.showPopover}
                onClose={this.popOverToggle}
              >
                <Toast.Header>
                  <span>
                    <strong>{this.state.lastTrack}</strong> added to the
                    playlist
                  </span>
                </Toast.Header>
              </Toast>
            </Row>
          )}
        </Container>
        <Player />
      </>
    );
  }
}

export default connect(null, null)(Playlist);
