import React from "react";
import styles from "./HelpOverzicht.module.css";

const HelpOverzicht = () => {

    return (
    <section className={styles.help_order}>
        <img className={styles.menu} src="/assets/img/help_overzicht/menu.svg" alt="Dit is het menu. Klik op de cirkeltjes om te veranderen van pagina. De gele knop is de pagina waar je nu op zit."/>
        <img className={styles.verder} src="/assets/img/help_overzicht/verder.svg" alt="Klik op deze knop om verder te gaan met jouw huidige reis."/>
        <img className={styles.stappen} src="/assets/img/help_overzicht/stappen.svg" alt="Het totaal aantal gezette stappen die je kan inzetten."/>

        {/* <img className={styles.info} src="/assets/img/help_overzicht/info.svg" alt=""/> */}
        <img className={styles.help} src="/assets/img/help_overzicht/help.svg" alt="Klik nogmaals op het vraagteken om deze info te laten verdwijnen."/>

    </section>
   );
};

export default HelpOverzicht;
