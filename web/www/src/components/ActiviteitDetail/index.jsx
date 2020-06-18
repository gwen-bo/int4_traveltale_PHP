import React from "react";
import { useParams } from "react-router";
import { useStores } from "../../hooks";


// import style from "./LandDetail.module.css";

const ActiviteitDetail = () => {
  const { id } = useParams();
  console.log(id);

  const {activiteitenStore} = useStores();
  const activiteit = activiteitenStore.getActiviteitById(id)
  console.log(activiteit)

  return (
   <>
    <p>Je bent momenteel bezig met activiteit {activiteit.name}</p>
   </>
  );
};

export default ActiviteitDetail;
