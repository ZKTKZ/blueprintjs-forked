import * as React from "react";
import { debounce } from "lodash";
import { Suggest } from "@blueprintjs/select";

import "./app.scss";

import { CardExample } from "./CardExample";
import { Player } from "./Player";
import * as Songs from "./songs";

require("dotenv").config();
let Spotify = require("spotify-web-api-js");
let spotify = new Spotify();

const songSuggestStyles = {
  display: "flex",
  justifyContent: "center",
  marginBottom: "5%"
};

const SongSuggest = Suggest.ofType<Songs.ISong>();

interface ISuggestExample {
  song: Songs.ISong;
  songs: Songs.ISong[];
}

export class SuggestExample extends React.PureComponent<
  {},
  ISuggestExample
> {
  //initial placeholder examples
  public state: ISuggestExample = {
    song: Songs.TOP_100_SONGS[0],
    songs: Songs.TOP_100_SONGS
  };

  public render() {
    return (
      <div>
        <CardExample header="What's That Song?" icon="music">
          <div style={songSuggestStyles}>
            <SongSuggest
              items={this.state.songs}
              itemRenderer={Songs.renderSong}
              onItemSelect={this.handleItemSelect}
              inputValueRenderer={this.handleValueRender}
              onQueryChange={this.debounceHandleQueryChange}
              //resetOnClose={true}
              fill={false}
              popoverProps={{ minimal: true }}
            ></SongSuggest>
          </div>
          <Player song={this.state.song}></Player>
        </CardExample>
      </div>
    );
  }

  private handleItemSelect = (song: Songs.ISong) => {
    //TODO: update state
    this.setState({ song: song });
  };
  private handleValueRender = (item: Songs.ISong) => {
    return JSON.stringify(item.title);
  };

  //async Spotify API caller
  private handleQueryChange = async (song: Songs.ISong) => {
    let accessToken = null;
    let results: Songs.ISong[] = [];

    await fetch("https://accounts.spotify.com/api/token", {
      body: "grant_type=client_credentials",
      headers: {
        Authorization:
          "Basic ZmE5Y2IwN2M4ZmZjNDM1ZjlhMWIzZTk4NGZhYWYyOWM6OTM3ODk4Njc1NDU3NGI4ZTk3ZGVkMThhNTc2ZGI3ZTQ=",
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST"
    })
      .then((response) => response.json())
      .then((data) => {
        accessToken = data["access_token"];
        spotify.setAccessToken(accessToken);
        spotify.searchTracks(song).then(
          (data) => {
            //console.log("Searching for ", song, data);
            let tracks = data.tracks.items;
            tracks.forEach((track) => {
              //console.log("track.image: ", track.album.images[0]);
              let result: Songs.ISong = {
                title: track.name,
                artist: track.album.artists[0].name
              };
              results.push(result);
              this.setState({ songs: results });
            });
          },
          (err) => {
            console.error("Error: ", err);
          }
        );
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  };

  //debounce API requests
  private debounceHandleQueryChange = debounce(
    this.handleQueryChange,
    750
  );
}
