import * as React from "react";
import {
  Alignment,
  AnchorButton,
  Classes,
  Colors,
  Navbar,
  NavbarGroup,
  NavbarHeading,
  NavbarDivider
} from "@blueprintjs/core";
import snipchatPng from "./assets/Logo@3x.png";

const navbarStyles = {};

export interface NavigationProps {}

export class Navigation extends React.PureComponent<NavigationProps> {
  public render() {
    return (
      <Navbar style={navbarStyles}>
        <NavbarGroup align={Alignment.LEFT}>
          <NavbarHeading>Snipchat Alt</NavbarHeading>
          <NavbarDivider />
          <AnchorButton
            href="http://blueprintjs.com/docs"
            text="Docs"
            target="_blank"
            minimal
            rightIcon="share"
          />
          <AnchorButton
            href="http://github.com/palantir/blueprint"
            text="Github"
            target="_blank"
            minimal
            rightIcon="code"
          />
        </NavbarGroup>
        <NavbarGroup align={Alignment.RIGHT}></NavbarGroup>
      </Navbar>
    );
  }
}
