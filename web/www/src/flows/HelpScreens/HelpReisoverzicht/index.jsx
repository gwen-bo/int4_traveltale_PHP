import React from "react";
import styles from "./HelpReisoverzicht.module.css";

const HelpReisoverzicht = () => {

    return (
    <section className={styles.help_order}>
        <img className={styles.terug} src="/assets/img/help_reisoverzicht/terug.svg" alt="Klik op de pijl om terug naar het reisoverzicht te gaan."/>
        <img className={styles.rugzak} src="/assets/img/help_reisoverzicht/rugzak.svg" alt="Klik op het rugzakje om te zien welke souvenirs je al hebt verzameld."/>
        {/* <img src="/assets/img/help_overzicht/rechts_boven.svg" alt=""/> */}
        <img className={styles.stappen} src="/assets/img/help_reisoverzicht/stappen.svg" alt="Het totaal aantal gezette stappen die je kan inzetten."/>

        <img className={styles.stad} src="/assets/img/help_reisoverzicht/stad.svg" alt="Klik op ‘Stad ontdekken’ om te zien welke activiteiten je in Hanoi kan doen"/>
        <img className={styles.help} src="/assets/img/help_reisoverzicht/help.svg" alt="Klik nogmaals op het vraagteken om deze info te laten verdwijnen."/>

    </section>
   );
};

export default HelpReisoverzicht;
