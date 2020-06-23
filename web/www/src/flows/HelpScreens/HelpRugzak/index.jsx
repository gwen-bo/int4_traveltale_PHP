import React from "react";
import styles from "./HelpRugzak.module.css";

const HelpOverzicht = () => {

    return (
    <section className={styles.help_order}>
        <img className={styles.terug} src="/assets/img/help_reisoverzicht/terug.svg" alt="Klik op de pijl om terug naar het reisoverzicht te gaan."/>
        <img className={styles.leeg} src="/assets/img/help_rugzak/empty.svg" alt="Dit zijn de souvenirs die je nog moet verzamelen. Je krijgt souvenirs door meer  activiteiten/ steden te ontdekken"/>
        <img className={styles.souvenir} src="/assets/img/help_rugzak/souvenir.svg" alt="Dit zijn de souvenirs die je per stad alreeds verzamelt hebt!"/>

        {/* <img className={styles.info} src="/assets/img/help_overzicht/info.svg" alt=""/> */}
        <img className={styles.help} src="/assets/img/help_overzicht/help.svg" alt="Klik nogmaals op het vraagteken om deze info te laten verdwijnen."/>

    </section>
   );
};

export default HelpOverzicht;
