import React from "react";
import styles from "./HelpOverzicht.module.css";

const HelpOverzicht = () => {

    return (
    <section className={styles.help_order}>
        <img className={styles.menu} src="/assets/img/help_overzicht/menu.svg" alt=""/>
        <img className={styles.verder} src="/assets/img/help_overzicht/verder.svg" alt=""/>
        <img className={styles.stappen} src="/assets/img/help_overzicht/stappen.svg" alt=""/>

        {/* <img className={styles.info} src="/assets/img/help_overzicht/info.svg" alt=""/> */}
        <img className={styles.help} src="/assets/img/help_overzicht/help.svg" alt=""/>

    </section>
   );
};

export default HelpOverzicht;
