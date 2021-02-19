import React, { Component } from "react";
import {
  FaRandom,
  FaArrowLeft,
  FaPlayCircle,
  FaArrowRight,
  FaRedoAlt,
  FaPauseCircle,
  FaSortAmountDown,
  FaVolumeUp,
  FaLaptop,
} from "react-icons/fa";
import { IconContext } from "react-icons";
import { FaHeart } from "react-icons/fa";
import { connect } from "react-redux";

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => {
  return {
    liked_Song: (songname) => {
      dispatch({
        type: "LIKED_SONG",
        payload: songname,
      });
    },

    unliked_Song: (songname) => {
      dispatch({
        type: "UNLIKED_SONG",
        payload: songname,
      });
    },
  };
};

function getTime(time) {
  if (!isNaN(time)) {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  }
}
class Player extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playerStatus: "paused",
      currentTime: null,
      duration: null,
      progressBarWidth: "0.1%",
    };
  }
  componentDidMount() {
    this.player.addEventListener("timeupdate", (e) => {
      this.setState({
        currentTime: e.target.currentTime,
        duration: e.target.duration,
        progressBarWidth: (100 / this.state.duration) * this.state.currentTime,
      });
    });
  }

  componentWillUnmount() {
    this.player.removeEventListener("timeupdate", () => {});
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.selectedSong !== prevProps.selectedSong) {
      this.player.src = this.props.selectedSong.track.preview;
      this.player.play();
      this.setState({ playerStatus: "playing" });
    }
    if (this.state.playerStatus !== prevState.playerStatus) {
      if (this.state.playerStatus === "paused") {
        this.player.pause();
      } else if (this.state.playerStatus === "playing") {
        this.player.play();
      }
    }
  }
  replaySong = (e) => {
    e.target.currentTime = 0;
    this.setState({ currentTime: 0, progressBarWidth: 0 });
  };
  render() {
    const currentTime = getTime(this.state.currentTime);
    const duration = getTime(this.state.duration);
    return (
      <>
        <div className="container-fluid play-section fixed-bottom">
          {this.props.selectedSong ? (
            <div id="songInfo">
              <img
                className="img-fluid songImage"
                src={this.props.selectedSong.img}
                alt=""
              />
              <div id="song">
                <p id="songName">{this.props.selectedSong.track.title}</p>
                <p id="singer">{this.props.selectedSong.track.artist.name}</p>
                {/* <a><FaHeart style={{color: "white"}}/></a> */}
              </div>
              {this.props.listOfLikedSongs.includes(
                this.props.selectedSong.track.title
              ) ? (
                <a>
                  <FaHeart
                    style={{ color: "green", cursor: "pointer" }}
                    onClick={() =>
                      this.props.unliked_Song(
                        this.props.selectedSong.track.title
                      )
                    }
                  />
                </a>
              ) : (
                <a>
                  <FaHeart
                    style={{
                      color: "white",
                      cursor: "pointer",
                    }}
                    onClick={() =>
                      this.props.liked_Song(this.props.selectedSong.track.title)
                    }
                  />
                </a>
              )}
            </div>
          ) : (
            <div id="songInfo">
              {/* <img className='img-fluid songImage' src='https://placehold.it/50x50' alt=""/> */}
              <div id="song">
                {/* <p id="songName">Say So</p> */}
                {/* <p id="singer">Doja Cat</p> */}
              </div>
              {/* <p><FaHeart/></p> */}
              <i className="fas fa-laptop"></i>
            </div>
          )}
          <div className="musicIcons">
            <div className="mobileSongInfo">
              <p>Song For My Father</p>
            </div>
            <div id="icons">
              <IconContext.Provider value={{ className: "playerIcons" }}>
                <FaRandom />
                <FaArrowLeft />
                {this.state.playerStatus === "playing" ? (
                  <FaPauseCircle
                    onClick={() => this.setState({ playerStatus: "paused" })}
                  />
                ) : (
                  <FaPlayCircle
                    onClick={() => this.setState({ playerStatus: "playing" })}
                  />
                )}
                <FaArrowRight />
                <FaRedoAlt onClick={this.replaySong} />
              </IconContext.Provider>
            </div>
            <div className="d-flex time">
              <p> {currentTime}</p>
              <div className="progress d-flex" id="trackLength">
                <div
                  className="progress-bar bg-success"
                  role="progressbar"
                  style={{ width: this.state.progressBarWidth + "%" }}
                  aria-valuenow={this.state.progressBarWidth}
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  <audio ref={(ref) => (this.player = ref)} />
                </div>
              </div>
              <p>{duration}</p>
            </div>
          </div>
          <div id="volume">
            <div className="sideIcons">
              <FaSortAmountDown />
              <FaLaptop />
              <FaVolumeUp />
            </div>
            <div className="progress" id="volumeLength">
              <div
                className="progress-bar bg-success"
                role="progressbar"
                style={{ width: "80%" }}
                aria-valuenow="80"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Player);
