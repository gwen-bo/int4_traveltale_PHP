import React from "react";
import { useParams } from "react-router";
import { useStores } from "../../hooks";
import Navigatie from "../Navigatie";
import TerugOverzicht from "../buttons/TerugOverzicht";

import niveau1 from "../../assets/img/reisaanbod/niveau1.svg"
import niveau2 from "../../assets/img/reisaanbod/niveau2.svg"
import niveau3 from "../../assets/img/reisaanbod/niveau3.svg"

import styles from "./LandDetail.module.css";
import { Link } from "react-router-dom";
import { ROUTES } from "../../consts";

const LandDetail = () => {
  const { id } = useParams();
  console.log(id);

  const {bestemmingenStore} = useStores();
  const bestemming = bestemmingenStore.getBestemmingById(id)
  console.log(bestemming);
  
  return (
   <>
   <Navigatie />
   <TerugOverzicht />
   <section className={styles.detail}>
     <div className={styles.detail_info}>
   <img className={styles.bestemming_niveau} src={(bestemming.steps === 1) ? niveau1 : (bestemming.steps === 2) ? niveau2 : niveau3}></img>
   <div className={styles.info_wrapper}>
    <p className={styles.title}>Reis door {bestemming.name}</p>
    <div className={styles.tags_wrapper}>
      <p className={styles.tag}>Actief</p>
      <p className={styles.tag}>Avontuurlijk</p>
    </div>
    <p className={styles.intro}>Ontdek tijdens deze avontuurlijke reis de unieke steden van Vietnam. Hanoi, Cat Ba, Ninh Binh, Hoi An... </p>
    <p className={styles.uitleg}>Reis te voet, met de nachtbus of per boot doorheen de adembenemende Vietnamese landschappen en ontdek de rijke en aangrijpende geschiedenis van deze Aziatische parel.</p>
    <Link className={styles.button} to={`${ROUTES.keuze.to}${bestemming.id}`} >Start deze reis</Link>
    </div>
    </div>
   <div className={styles.img_div}>
   <img src={require(`../../assets/img/reisaanbod/detail/${bestemming.name}.svg`)}></img>
   </div>

</section>
   </>
  );
};

export default LandDetail;
