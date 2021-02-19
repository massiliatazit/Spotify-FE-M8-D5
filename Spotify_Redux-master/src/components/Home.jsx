import React, { Component } from "react";
import { FaSpotify, FaSearch } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { Container, Nav, Navbar } from "react-bootstrap";
import Carsl from "./Carsl";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import SideBar from "./SideBar";
import Player from "./Player";

export class Home extends Component {
  state = {
    queryText: "edsheeran",
  };
  query = (e) => {
    let queryText = e.currentTarget.value;
    this.setState({ queryText });
  };
  searchQuery = () => {
    this.props.history.push(`/search/${this.state.queryText}`);
  };

  render() {
    return (
      <>
        <SideBar />
        <div className="container-fluid" id="content">
          <Navbar expand="lg" className="navbar">
            <Navbar.Brand href="#home">
              <FaSpotify />
              <button
                type="button"
                className="btn btn-outline-success btnMobile"
              >
                SIGN UP
              </button>
              <button
                type="button"
                className="btn btn-outline-success btnMobile"
              >
                LOGIN
              </button>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="#home">TRENDING</Nav.Link>
                <Nav.Link href="#link">PODCAST</Nav.Link>
                <Nav.Link href="#link">MOODS AND GENRES</Nav.Link>
                <Nav.Link href="#link">NEW RELEASES</Nav.Link>
                <Nav.Link href="#link">DISCOVER</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <div id="searchBox">
            <input type="text" onChange={this.query} />
            <FiSearch onClick={this.searchQuery} />
          </div>
          <Container className="contentRows mt-5">
            <Carsl
              link="https://api.deezer.com/chart/0/albums"
              heading="Top Albums"
              type="albums"
            />
            <Carsl
              link="https://api.deezer.com/chart/0/artists"
              heading="Top Artists"
              type="artists"
            />
            <Carsl
              link="https://api.deezer.com/chart/0/playlists"
              heading="Top Playlists"
              type="playlists"
            />
            <Carsl
              link="https://api.deezer.com/chart/0/podcasts"
              heading="Top Podcasts"
              type="podcasts"
            />
          </Container>
        </div>
        <Player />
      </>
    );
  }
}

export default withRouter(Home);
