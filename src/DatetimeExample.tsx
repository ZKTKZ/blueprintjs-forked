import * as React from "react";
import { DatePicker } from "@blueprintjs/datetime";

import { Example } from "./Example";

export class DatetimeExample extends React.PureComponent {
  public render() {
    return (
      <Example header="Datetime Sandbox">
        <DatePicker className="example-datepicker" timePrecision="minute" />
      </Example>
    );
  }
}
