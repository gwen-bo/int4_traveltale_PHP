import React from "react";
import { useObserver } from "mobx-react-lite";
import styles from "./Weergave.module.css";
import { useStores } from "../../../hooks";

const Profiel = () => {

  const {uiStore} = useStores();

  return useObserver(() => (
   <>
   <div className={styles.pos}>
   </div>
   <div className={styles.pos}>
      <p className={styles.title}>Jouw reisbegeleider </p>
      <p className={styles.text}>Kies hier wie jouw reisbegeleider zal worden doorheen de reizen die je zal maken.</p>
      <div className={styles.bewegen_position}>
          <label className={styles.thema_radio} htmlFor={'oma'}>
          <input className={styles.reisbegeleider_input} type="radio" checked={uiStore.reisBegeleider === 'oma'} onChange={e => uiStore.setBegeleider('oma')} name='reisbegeleider' id={'oma'}></input>
                <div className={`${styles.bewegen_text} ${styles.box}`}>
                  <img className={styles.bewegen_img} src={'/assets/img/instellingen/oma.svg'} alt=""/>
                <p className={styles.bewegen_label}>Annet</p>
                </div>
            </label>

            <label className={styles.thema_radio} htmlFor={'opa'}>
            <input className={styles.reisbegeleider_input} type="radio" checked={uiStore.reisBegeleider === 'opa'} onChange={e => uiStore.setBegeleider('opa')} name='reisbegeleider' id={'opa'}></input>
                  <div className={`${styles.bewegen_text} ${styles.box}`}>
                  <img className={styles.bewegen_img} src={'/assets/img/instellingen/opa.svg'} alt=""/>
                  <p className={styles.bewegen_label}>Fons</p>
                  </div>
            </label>

            
            </div>
            <div className={styles.form_wrapper}>
                  <div className={styles.form_header}>
            <p className={`${styles.title} ${styles.tekstgrootte}`}>Tekstgrootte </p>
            <p className={styles.text}>Zijn die kleine lettertjes net iets te klein, of die grote letters net iets te groot? pas de tekstgrootte aan, naar jouw voorkeur.</p>
            </div>
            <form action="" className={styles.fontsize_position}>
                <div className={styles.input_wrapper}>
                  <label className={styles.thema_radio} htmlFor="small">
                  <input className={styles.input_fontsize} type="radio" checked={uiStore.fontSize === 'small'} onChange={e => uiStore.setSize('small')} name='fontsize' id="small"></input>
                  <div className={`${styles.fontsize_text} ${styles.small}`} key={'small'}>
                  <p>Klein Font</p>
                  </div>
                  </label>
                </div>
                <div className={styles.input_wrapper}>
                  <label className={styles.thema_radio} htmlFor="medium">
                  <input className={styles.input_fontsize} type="radio" checked={uiStore.fontSize === 'medium'} onChange={e => uiStore.setSize('medium')} name='fontsize' id="medium"></input>
                  <div className={`${styles.fontsize_text} ${styles.medium}`} key={'medium'}>
                  <p>Medium Font</p>
                  </div>
                  </label>
                </div>
                
                <div className={styles.input_wrapper}>
                    <label className={styles.thema_radio} htmlFor="large">
                    <input className={styles.input_fontsize} type="radio" checked={uiStore.fontSize === 'large'} onChange={e => uiStore.setSize('large')} name='fontsize' id="large"></input>
                      <div className={`${styles.fontsize_text} ${styles.big}`} key={'large'}>
                  <p>Groot Font</p>
                  </div>
                  </label>
                  </div>
                  </form>
                  </div>
   </div>
    

   </>
  ));
};

export default Profiel;
