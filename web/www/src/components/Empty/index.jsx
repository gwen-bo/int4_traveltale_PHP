import React from "react";

import style from "./Empty.module.css";
import LottieOverzicht from "../Overzicht/LottieOverzicht";

const Empty = ({ message }) => {
  return (
  <section className={style.container}>
    <LottieOverzicht props="laden"/>
      <h2 className={style.message}>{message}</h2>
      </section>
      );
};

export default Empty;
