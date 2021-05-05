import * as React from "react";
import { H3, Card, Colors, Classes, Icon } from "@blueprintjs/core";
import {
  ELEVATION_1,
  ELEVATION_2
} from "@blueprintjs/core/lib/esm/common/classes";

const cardStyles = {
  margin: "4% 8%"
};

const headerStyles = {
  color: Colors.BLUE4,
  display: "flex",
  justifyContent: "center"
};

const iconStyles = {
  marginTop: "1%",
  marginRight: "1%"
};

export interface CardExampleProps {
  header: string;
  icon: string;
}

export class CardExample extends React.PureComponent<
  CardExampleProps
> {
  public render() {
    return (
      <Card
        style={cardStyles}
        className={Classes.MINIMAL}
        interactive={false}
        elevation={ELEVATION_2}
        onClick={this.handleClickChange}
      >
        <H3 className={Classes.HEADING} style={headerStyles}>
          <Icon style={iconStyles} icon={this.props.icon} />
          {this.props.header}
        </H3>
        {this.props.children}
      </Card>
    );
  }
  private handleClickChange = () => {
    return <div></div>;
  };
}
