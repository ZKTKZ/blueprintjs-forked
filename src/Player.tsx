import {
  Spinner,
  Intent,
  Icon,
  Colors,
  Classes
} from "@blueprintjs/core";
import * as React from "react";
import * as Songs from "./songs";

const imgStyles = {
  display: "flex",
  justifyContent: "center",
  marginTop: "5%"
};

interface IPlayer {
  song: Songs.ISong;
}

interface ITimer {
  elapsed: number;
  ready: number;
}

export function Player({ song }: IPlayer) {
  const [timer, setTimer] = React.useState<ITimer>({
    elapsed: Date.now(),
    ready: 25
  });
  React.useEffect(() => {
    const interval = setInterval(() => {
      setTimer({ elapsed: timer.elapsed + 1, ready: timer.ready });
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  console.log(timer);

  return (
    <div>
      <span style={{ position: "relative", zIndex: 2 }}>
        <Spinner intent={Intent.PRIMARY} size={40} value={0.1} />
      </span>
      <Icon
        //className={Classes.SKELETON}
        icon="play"
        color={Colors.BLUE5}
        iconSize={32}
        style={{
          position: "relative",
          zIndex: 1,
          marginTop: "-110px"
        }}
      />{" "}
      <div
        style={imgStyles}
        //className={Classes.SKELETON}
      >
        <span>
          {/*
            <Icon icon="share" color={Colors.BLUE5} />{" "}
            <Icon icon="download" color={Colors.GREEN5} />{" "}
            */}
        </span>
        <img
          src={"https://tinyurl.com/hamimg"}
          alt={"An album cover"}
          style={{ borderRadius: "50%" }}
          height={"100px"}
        />
      </div>
    </div>
  );
}
