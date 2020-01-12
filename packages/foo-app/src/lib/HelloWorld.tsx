import React from "react";
import Header from "./Header";

class HellWorld extends React.Component<{ name: string }> {
  render() {
    return (
      <div>
        <Header label={"Hi"} />
        hello from {this.props.name}
      </div>
    );
  }
}

export default HellWorld;
