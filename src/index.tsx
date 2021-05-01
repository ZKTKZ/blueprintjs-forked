import * as React from "react";
import { render } from "react-dom";

import "normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "@blueprintjs/datetime/lib/css/blueprint-datetime.css";
import "@blueprintjs/select/lib/css/blueprint-select.css";
import "./app.css";

import { Navigation } from "./Navigation";
import { CoreExample } from "./CoreExample";
import { SelectExample } from "./SelectExample";
import { DatetimeExample } from "./DatetimeExample";

const App = () => (
  <div>
    <SelectExample />
  </div>
);

render(<App />, document.getElementById("root"));
