import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router";
import { useStores } from "../../hooks";
import Navigatie from "../Navigatie";
import TerugOverzicht from "../buttons/TerugOverzicht";
import styles from "./LandDetail.module.css";
import { Link } from "react-router-dom";
import { ROUTES } from "../../consts";
import { useObserver } from "mobx-react-lite";
import Empty from "../Empty";
import Help from "../buttons/Help";

const LandDetail = () => {
  const { id } = useParams();
  const history = useHistory();
  const {landenStore, uiStore} = useStores();

  const STATE_LOADING = "aan het laden..";
  const STATE_FULLY_LOADED = "fullyLoaded";

  const [bestemming, setBestemming] = useState(landenStore.getLandById(id));
  const [state, setState] = useState(
    bestemming ? STATE_FULLY_LOADED : STATE_LOADING
  );

  useEffect(() => {
    const loadBestemming = async (id) => {
      try {
        const bestemming = await landenStore.loadLand(id);
        console.log(bestemming)
        if (!bestemming) {
          uiStore.setFeedback({
            title: 'Oeps!', 
            uitleg: 'Het land dat je aan het zoeken bent, bestaat niet!',
            animation: 'verbaasd',
            sec_path: '', 
            sec_name: 'Vorige',
            prim_path: ROUTES.reisaanbod,
            prim_name: 'Terug naar reisaanbod'
          })
          history.push('/feedback');
          return;
        }
        setBestemming(bestemming);
        setState(STATE_FULLY_LOADED);
      } catch (error) {
        /*if (error.response && error.response.status === 404) {
          setState(STATE_DOES_NOT_EXIST);
        }*/
        console.log(error);
      }
    };
    loadBestemming(id);
  }, [id, landenStore, setBestemming, history, uiStore]);
  const fontsize = sessionStorage.getItem('fontsize');
  
  return useObserver(() => {
  if (state === STATE_LOADING) {
    return <Empty message={"Even aan het laden.."} />;
  }
  return (
   <>
    <h1 className={styles.hidden}>Detailpagina land</h1>

   <div className={styles.nav_wrapper}>
   <Navigatie />
   <Help />
   <TerugOverzicht />
   </div>
   <section className={styles.detail}>
   <h2 className={styles.hidden}>Uitleg</h2>

     <div className={styles.detail_info}>
   <img className={styles.bestemming_niveau} alt="het niveau van deze bestemming" src={(bestemming.stappen_niveau === 1) ? '/assets/img/reisaanbod/niveau1.svg' : (bestemming.stappen_niveau === 2) ? '/assets/img/reisaanbod/niveau2.svg' : '/assets/img/reisaanbod/niveau3.svg'}></img>
   <div className={styles.info_wrapper}>
    <p className={styles.title}>Reis door {bestemming.naam}</p>
    <div className={styles.tags_wrapper}>
      <p className={styles.tag}>{bestemming.tag}</p>
      
    </div>
    <p className={`${styles.intro} ${(fontsize === "small" ) ? styles.small : (fontsize === "medium" ) ? styles.medium : styles.large}`}>{bestemming.intro}</p>
    <p className={`${styles.uitleg} ${(fontsize === "small" ) ? styles.small : (fontsize === "medium" ) ? styles.medium : styles.large}`}>{bestemming.uitleg}</p>
    <Link className={styles.button} to={`${ROUTES.keuze.to}${bestemming.id}`} >Start deze reis</Link>
    </div>
    </div>
   <div className={styles.img_div}>
   <img alt={`de kaart van ${bestemming.naam}`} src={`/assets/img/reisaanbod/detail/${bestemming.naam}.svg`}></img>
   </div>

</section>
   </>
  )});
};

export default LandDetail;
