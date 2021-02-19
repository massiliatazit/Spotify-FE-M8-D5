import React, { Component } from "react";
import { Container, Row, Spinner, Toast, Dropdown } from "react-bootstrap";
import { FaHeart, FaEllipsisH, FaMusic } from "react-icons/fa";
import { MdKeyboardArrowLeft } from "react-icons/md";
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
    addSongToPlaylist: (songName, playlistName) => {
      dispatch({
        type: "ADD_SONG_TO_PLAYLIST",
        payload: { songName, playlistName },
      });
    },
  };
};
export class Album extends Component {
  state = {
    album: [],
    loading: true,
    showPopover: false,
    lastTrack: "",
    showPlaylists: false,
    showPlaylistModal:false,
  };
  componentDidMount = async () => {
    let id = this.props.match.params.id;
    let response = await fetch(
      "https://deezerdevs-deezer.p.rapidapi.com/album/" + id,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
          "x-rapidapi-key":
            "49a206362dmshb20519b822912b7p1dc792jsn37f9d0304fcc",
        },
      }
    );

    let album = await response.json();
    console.log(album);
    this.setState({ album, loading: false });
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
  showPlaylistsHandler = (e) => {
    this.setState({ showPlaylists: true });
  };
  hidePlaylistsHandler = () => {
    this.setState({ showPlaylists: false });
  };
  addSongToPlaylist = (playlistName, songName) => {
    this.props.addSongToPlaylist(songName, playlistName);
    this.setState({ showPopover: true});
    setTimeout(() => {
      this.setState({ showPopover: false });
    }, 1500);
  
  };
  render() {
    return (
      <>
        <SideBar show={this.state.showPlaylistModal} />
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
                  <img src={this.state.album.cover_medium} alt="" />
                  <p>{this.state.album.title}</p>
                  <p>{this.state.album.artist.name}</p>
                  <button type="button" class="btn ">
                    PLAY
                  </button>
                  <p>
                    {this.state.album.fans} FOLLOWERS .{" "}
                    {this.state.album.nb_tracks}
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
                {this.state.album.tracks.data.map((track) => {
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
                                  this.state.album.cover_medium
                                );
                                // this.props.playQueue(track);
                                // this.showToaster(track.title);
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
                        <div id="moreOptions">
                          <Dropdown>
                            <Dropdown.Toggle className="d-flex">
                              <p style={{ color: "white", fontSize: "12px" }}>
                                {(track.duration / 60).toFixed(2)}
                              </p>
                              <FaEllipsisH />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item>Pin to profile</Dropdown.Item>
                              <Dropdown.Item>Embed Tweet</Dropdown.Item>
                              <Dropdown.Item
                                id="showPlaylists"
                                onMouseEnter={this.showPlaylistsHandler}
                                onMouseLeave={this.hidePlaylistsHandler}
                              >
                                <MdKeyboardArrowLeft />
                                Add to Playlist
                              </Dropdown.Item>
                              {this.state.showPlaylists ? (
                                <div
                                  id="playlists"
                                  onMouseEnter={this.showPlaylistsHandler}
                                  onMouseLeave={this.hidePlaylistsHandler}
                                >
                                  <p onClick={()=>this.setState({showPlaylistModal:true})}>Create a playlist</p>
                                  <hr
                                    style={{
                                      margin: "0.2rem -11px",
                                      borderTop: "1px solid white",
                                    }}
                                  />

                                  {this.props.playlists
                                    ? this.props.playlists.map((playlist) => (
                                        <p
                                          onClick={() =>
                                            this.addSongToPlaylist(
                                              playlist.name,
                                              track
                                            )
                                          }
                                        >
                                          {playlist.name}
                                        </p>
                                      ))
                                    : null}
                                </div>
                              ) : null}
                            </Dropdown.Menu>
                          </Dropdown>
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
              <Toast
                style={{ position: "fixed", top: 15, right: 15 }}
                show={this.state.showPopover}
              >
                <Toast.Header>
                  <span>
                    Added sucessfully to the playlist
                  </span>
                </Toast.Header>
              </Toast>
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Album);
