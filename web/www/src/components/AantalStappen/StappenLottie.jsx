import React, { Component } from "react";
import Lottie from "react-lottie";

class OmaWalkLottie extends Component {
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
    
      animationData: require(`../../assets/lottie/stapjes.json`),
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    };

    return (
      <div>
        <Lottie options={defaultOptions} height={100} width={100} />
      </div>
    );
  }
}

export default OmaWalkLottie;
