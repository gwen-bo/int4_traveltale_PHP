import React from "react";
import styles from "./HelpRugzak.module.css";

const HelpOverzicht = () => {

    return (
    <section className={styles.help_order}>
        <img className={styles.terug} src="/assets/img/help_reisoverzicht/terug.svg" alt=""/>
        <img className={styles.leeg} src="/assets/img/help_rugzak/empty.svg" alt=""/>
        <img className={styles.souvenir} src="/assets/img/help_rugzak/souvenir.svg" alt=""/>

        {/* <img className={styles.info} src="/assets/img/help_overzicht/info.svg" alt=""/> */}
        <img className={styles.help} src="/assets/img/help_overzicht/help.svg" alt=""/>

    </section>
   );
};

export default HelpOverzicht;
