import React, { Component } from "react";
import Lottie from "react-lottie";

class LottieOverzicht extends Component {
  constructor(props) {
    super(props);

    this.state = {
      animatie: { path: `${props.props}` },
    };
  }

  render() {
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: require(`../../assets/lottie/${this.state.animatie.path}.json`),
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    };

    return (
      <div>
        <Lottie options={defaultOptions} height={350} width={350} />
      </div>
    );
  }
}

export default LottieOverzicht;
