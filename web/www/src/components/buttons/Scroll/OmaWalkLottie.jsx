import React, { Component } from "react";
import Lottie from "react-lottie";

class OmaWalkLottie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animatie: { path: `${props.props}` },
    };
  }

  render() {
    const defaultOptions = {
      //   loop: true,
      
      mode: 'scroll',
      player: '#firstLottie',
      actions: [
        {
          type: 'seek',
          frames: [0, 100],
        },
      ],
    
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

export default OmaWalkLottie;
