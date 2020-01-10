import React from "react";

class HellWorld extends React.Component<{ name: string }> {
  render() {
    return <div>Hello from {this.props.name}</div>;
  }
}

export default HellWorld;
