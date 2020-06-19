import React, { Component } from "react";
import Lottie from "react-lottie";

class LottieUitleg extends Component {
  constructor(props) {
    super(props);
    console.log(props);

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
        <Lottie options={defaultOptions} height={150} width={150} />
      </div>
    );
  }
}

export default LottieUitleg;
