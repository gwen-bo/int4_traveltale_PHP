import React, { Component } from "react";
import Lottie from "react-lottie";

class LottieActiviteit extends Component {
  constructor(props) {
    super(props);
    console.log(props);

    this.state = {
      name: props.name,
      place: props.place,
      loop: props.loop
    };
  }

  render() {
    const defaultOptions = {
      loop: false,
      autoplay: true,
      animationData: require(`../../../assets/lottie/activiteiten/${this.state.name}/${this.state.place}.json`),
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    };

    return (
      <div>
        <Lottie options={defaultOptions}/>
      </div>
    );
  }
}

export default LottieActiviteit;
