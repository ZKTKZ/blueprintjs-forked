import * as React from "react";
import {
  Button,
  ButtonGroup,
  Intent,
  Slider,
  KeyCombo
} from "@blueprintjs/core";

import { Example } from "./Example";

interface CoreExampleState {
  sliderValue: number;
}

export class CoreExample extends React.PureComponent<{}, CoreExampleState> {
  public state = {
    sliderValue: 11
  };

  public render() {
    return (
      <Example header="Core Sandbox">
        <ButtonGroup>
          <Button intent={Intent.PRIMARY} text="Primary" />
          <Button intent={Intent.WARNING} text="Warning" />
          <Button intent={Intent.SUCCESS} text="Success" />
          <Button intent={Intent.DANGER} text="Danger" />
        </ButtonGroup>
        <br />
        <br />

        <KeyCombo combo="mod" />
        <br />

        <Slider
          min={0}
          max={11}
          onChange={this.setSliderValue}
          value={this.state.sliderValue}
        />
      </Example>
    );
  }

  private setSliderValue = (value: number) => {
    this.setState({
      sliderValue: value
    });
  };
}
