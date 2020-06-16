import React, { useState } from "react";
import { useParams } from "react-router";
import { useStores } from "../../hooks";
import Navigatie from "../Navigatie";
import { Link } from "react-router-dom";
import { ROUTES } from "../../consts";


// import style from "./StadDetail.module.css";

const StadDetail = () => {
  const {stedenStore} = useStores();

  const { id } = useParams();
  console.log(id);
  const stad = stedenStore.getStadById(id);

  console.log(stad);

  
  return (
   <>
   <Navigatie />
   <div>
    <p>Detailpage van {stad.name}</p>
    {stad.activities.map(
            activiteit => (
              // console.log(activiteit)
                <Link key={activiteit.id} to={`${ROUTES.activiteitDetail.to}${activiteit.id}`}>{activiteit.name}</Link>
        )
        )}
    </div>
   </>
  );
};

export default StadDetail;
