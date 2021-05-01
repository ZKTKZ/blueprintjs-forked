import * as React from "react";
import { debounce } from "lodash";
import { Button, MenuItem } from "@blueprintjs/core";
import { Suggest, Select } from "@blueprintjs/select";

import { Example } from "./Example";
import * as Films from "./films";

require("dotenv").config();
const SpotifyApi = require("spotify-web-api-node");

const FilmSelect = Suggest.ofType<Films.IFilm>();

interface SelectExampleState {
  film: Films.IFilm;
  spotify: any;
}

export class SelectExample extends React.PureComponent<{}, SelectExampleState> {
  public state: SelectExampleState = {
    film: Films.TOP_100_FILMS[0],
    spotify: new SpotifyApi({
      clientId: process.env.SPOTIFYCLIENTID,
      clientSecret: process.env.SPOTIFYCLIENTSECRET
    })
  };

  public render() {
    const buttonText = this.state.film.title;

    return (
      <Example header="Select Sandbox">
        <FilmSelect
          items={Films.TOP_100_FILMS}
          itemRenderer={Films.renderFilm}
          onItemSelect={this.handleValueChange}
          inputValueRenderer={this.handleValueRender}
          onQueryChange={this.debounceHandleQueryChange}
        >
          <Button text={buttonText} rightIcon="caret-down" />
        </FilmSelect>
      </Example>
    );
  }

  private handleValueChange = (film: Films.IFilm) => this.setState({ film });
  private handleValueRender = (item: Films.IFilm) => {
    return JSON.stringify(item.title);
  };
  private handleQueryChange = async (film: Films.IFilm) => {
    console.log(film);

    this.state.spotify.clientCredentialsGrant().then(
      (data) => {
        console.log("The access token expires in " + data.body["expires_in"]);
        this.state.spotify.setAccessToken(data.body["access_token"]);
        this.state.spotify.searchTracks("I am not throwing away my").then(
          (data) => {
            let tracks = data.body.tracks.items;
            tracks.forEach((track, index) => {
              console.log(index + ": " + track.name);
            });
          },
          (err) => {
            console.log("Search error: ", err);
          }
        );
      },
      (err) => {
        console.log("Access token error: ", err);
      }
    );
  };

  private debounceHandleQueryChange = debounce(this.handleQueryChange, 1500);
}
