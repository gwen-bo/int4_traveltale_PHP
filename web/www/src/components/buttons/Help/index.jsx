import React from "react";
import styles from "./Help.module.css";
import { useStores } from "../../../hooks";

const Help = () => {

    // const [state, setState] = useState(false)
    // console.log(state)
    const {uiStore} = useStores();

    const handleHelp = (e) => {
        e.preventDefault();
        if(uiStore.help === false){
            uiStore.setHelp(true);
        }else {
            uiStore.setHelp(false);
        }
    }

    return (
    <button onClick={e => {handleHelp(e)}} className={styles.wrapper}>
        <p className={styles.text}>Help</p>
        <div className={`${styles.bol} ${(uiStore.help === true) ? styles.active : styles.bol}`}>
            {uiStore.help === false 
            ? 
            <img width="20" height="60" className={styles.img} src={'/assets/img/help.svg'} alt="Een vraagteken, klik hier voor help"></img>
            : 
            <img width="20" height="60" className={styles.img} src={'/assets/img/help_actief.svg'} alt="Een vraagteken, klik hier voor help"></img>
            }           
  </div>
    </button>
   );
};

export default Help;
