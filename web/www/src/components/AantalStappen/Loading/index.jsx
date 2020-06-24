import React from "react";

import styles from "./Loading.module.css";
import StappenLottie from "../StappenLottie";

const Loading = () => {
  return (
  <div className={styles.container}>
    <p className={styles.text}>Stappen:</p>
    <div className={styles.bol}>
      <StappenLottie/>
    </div>
  </div>
      );
};

export default Loading;
