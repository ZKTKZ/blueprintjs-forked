import * as React from "react";
import { debounce } from "lodash";
import {
  Classes,
  Intent,
  Button,
  Spinner,
  Card
} from "@blueprintjs/core";
import { Suggest } from "@blueprintjs/select";

import { IconNames } from "@blueprintjs/icons";
import "./app.scss";

import { Example } from "./Example";
import * as Songs from "./films";

require("dotenv").config();
let Spotify = require("spotify-web-api-js");
let spotify = new Spotify();

const filmSelectStyles = {
  display: "flex",
  justifyContent: "center",
  marginBottom: "5%"
};

const FilmSelect = Suggest.ofType<Songs.ISong>();

interface SelectExampleState {
  film: Songs.ISong;
  films: Songs.ISong[];
  minimal: boolean;
}

export class SelectExample extends React.PureComponent<
  {},
  SelectExampleState
> {
  //initial placeholder examples
  public state: SelectExampleState = {
    film: Songs.TOP_100_FILMS[0],
    films: Songs.TOP_100_FILMS,
    minimal: true
  };

  public render() {
    const buttonText = this.state.film.title;

    return (
      <div>
        <Example header="What's That Song?" icon="music">
          <div style={filmSelectStyles}>
            <FilmSelect
              items={this.state.films}
              itemRenderer={Songs.renderFilm}
              onItemSelect={this.handleItemSelect}
              inputValueRenderer={this.handleValueRender}
              onQueryChange={this.debounceHandleQueryChange}
              resetOnClose={true}
              fill={false}
              popoverProps={{ minimal: true }}
            >
              <Button text={buttonText} icon={IconNames.SEARCH} />
            </FilmSelect>
          </div>
          <Spinner intent={Intent.PRIMARY} size={25} value={0.1} />
          <Card
            style={{ height: "8em", marginTop: "5%" }}
            className={Classes.SKELETON}
          ></Card>
        </Example>
      </div>
    );
  }

  private handleItemSelect = (film: Songs.ISong) => {
    //TODO: update state
    this.setState({ film: film });
  };
  private handleValueRender = (item: Songs.ISong) => {
    return JSON.stringify(item.title);
  };

  //async Spotify API caller
  private handleQueryChange = async (film: Songs.ISong) => {
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
        spotify.searchTracks(film).then(
          (data) => {
            console.log("Searching for ", film, data);
            let tracks = data.tracks.items;
            tracks.forEach((track) => {
              let result: Songs.ISong = {
                title: track.name,
                artist: track.album.artists[0].name
              };
              results.push(result);
              this.setState({ films: results });
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
    1000
  );
}
