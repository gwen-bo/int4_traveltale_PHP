import React, { Component } from "react";
import Lottie from "react-lottie";

class ScrollLottie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animatie: { path: `${props.props}` },
    };
  }

  render() {
    const defaultOptions = {
      //   loop: true,
      autoplay: true,
      animationData: require(`../../../assets/lottie/${this.state.animatie.path}.json`),
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    };

    return (
      <div>
        <Lottie options={defaultOptions} height={200} width={200} />
      </div>
    );
  }
}

export default ScrollLottie;
