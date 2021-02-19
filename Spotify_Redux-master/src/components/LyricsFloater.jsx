import React, { Component } from "react";
import { connect } from "react-redux";
import { GiMusicSpell } from "react-icons/gi";
import Text from "react-format-text";

const mapStateToProps = (state) => state;

export class LyricsFloater extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      lyrics: "",
      showLyrics: false,
    };
  }

  componentDidUpdate = async (prevProps) => {
    if (prevProps.selectedSong !== this.props.selectedSong) {
      if (this.props.selectedSong.track) {
        let response = await fetch(
          `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.search?q_track=${this.props.selectedSong.track.title}&q_artist=${this.props.selectedSong.track.artist.name}&apikey=56b82d61a05bfc23ab44eac6c8732117`
        );
        let parsedResponse = await response.json();
        let track_id = parsedResponse.message.body.track_list[0].track.track_id;
        let lyricsResponse = await fetch(
          `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${track_id}&apikey=56b82d61a05bfc23ab44eac6c8732117`,
          {
            headers: new Headers({
              "Access-Control-Allow-Origin": "https://spotifybe.herokuapp.com",
            }),
          }
        );
        let parsedLyricsResponse = await lyricsResponse.json();
        let lyrics = parsedLyricsResponse.message.body.lyrics.lyrics_body;
        console.log(lyrics);
        this.setState({ lyrics, loading: false });
      }
    }
  };
  showLyrics = () => {
    this.setState({ showLyrics: !this.state.showLyrics });
  };

  render() {
    return (
      <>
        {this.state.loading ? null : (
          <div id="lyricsFloater">
            <GiMusicSpell onClick={this.showLyrics} />
          </div>
        )}
        {this.state.showLyrics ? (
          <div id="lyrics">
            <Text>{this.state.lyrics}</Text>
          </div>
        ) : null}
      </>
    );
  }
}

export default connect(mapStateToProps)(LyricsFloater);
