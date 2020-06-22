import React from "react";
import styles from "./HelpReisoverzicht.module.css";

const HelpReisoverzicht = () => {

    return (
    <section className={styles.help_order}>
        <img className={styles.terug} src="/assets/img/help_reisoverzicht/terug.svg" alt=""/>
        <img className={styles.rugzak} src="/assets/img/help_reisoverzicht/rugzak.svg" alt=""/>
        {/* <img src="/assets/img/help_overzicht/rechts_boven.svg" alt=""/> */}
        <img className={styles.stappen} src="/assets/img/help_reisoverzicht/stappen.svg" alt=""/>

        <img className={styles.stad} src="/assets/img/help_reisoverzicht/stad.svg" alt=""/>
        <img className={styles.help} src="/assets/img/help_reisoverzicht/help.svg" alt=""/>

    </section>
   );
};

export default HelpReisoverzicht;
