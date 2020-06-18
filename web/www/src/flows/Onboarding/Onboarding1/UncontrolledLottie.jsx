import React, { Component } from "react";
import Lottie from "react-lottie";

class UncontrolledLottie extends Component {
  constructor(props) {
    super(props);
    console.log(props);

    this.state = {
      animatie: { path: `${props.props}` },
    };

    this.setState(props);
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
        <Lottie options={defaultOptions} height={500} width={500} />
      </div>
    );
  }
}

export default UncontrolledLottie;
