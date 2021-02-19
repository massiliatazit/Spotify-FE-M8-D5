import React, { Component } from "react";
import { Container, Row, Spinner, Toast } from "react-bootstrap";
import { FaHeart, FaEllipsisH, FaMusic } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../Album.css";
import { connect } from "react-redux";
import SideBar from "./SideBar";
import Player from "./Player";
const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => {
  return {
    selectedSong: (track, img) => {
      dispatch({
        type: "SELECTED_SONG",
        payload: {
          track,
          img,
        },
      });
    },
  };
};

class OwnPlaylist extends Component {
  state = {
    data: [],
    loading: true,
    lastTrack: undefined,
  };
  componentDidMount = async () => {
    console.log(this.props.playlists);
    let data = this.props.playlists.filter(
      (playlist) => playlist.name === this.props.match.params.name
    );
    this.setState({ data: data[0], loading: false });
    console.log(data);
  };

  render() {
    const img =
      "https://assets-global.website-files.com/5deef90e2b03a42deaf1f5f9/5dfbc118b074186ea74e058b_Music-Playlist_Octiive-Blog-Post-Feat-Image.jpg";
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
                  <img
                    src="https://assets-global.website-files.com/5deef90e2b03a42deaf1f5f9/5dfbc118b074186ea74e058b_Music-Playlist_Octiive-Blog-Post-Feat-Image.jpg"
                    alt=""
                  />
                  {/*<img src={this.state.data.songs[0].picture_medium} alt="" />*/}
                  <p>{this.state.data.name}</p>
                  <button type="button" class="btn ">
                    PLAY
                  </button>
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
                {this.state.data.songs.map((track) => {
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
                                this.props.selectedSong(track, img);
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
            </Row>
          )}
        </Container>
        <Player />
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OwnPlaylist);
