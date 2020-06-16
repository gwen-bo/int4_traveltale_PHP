import React from 'react';
import {ROUTES} from "./consts/index";
import { Switch, Route } from "react-router-dom";
import Overzicht from "./components/Overzicht"
import Reisaanbod from "./components/Reisaanbod"
import Landingpage from "./components/Landingpage"
import LandDetail from "./components/LandDetail"
import ActiviteitDetail from "./components/ActiviteitDetail"
import ReisOverzicht from "./components/ReisOverzicht"
import Login from "./components/Login"
import Instellingen from "./components/Instellingen"
import StadDetail from './components/StadDetail';
import Aanmelden from './flows/Aanmelden/Aanmelden';
import Registratie from './flows/Registreren/Registratie_start';
import UitlegFitbit from './flows/Registreren/UitlegFitbit';
import Welkom from './flows/Registreren/Registratie_welkom';
import Feedback from './components/Feedback';
import FontSize from './flows/Registreren/FontSize';
import Bewegen from './flows/Registreren/Bewegen';
import Bevestigen from './flows/Registreren/Bevestigen';
import Keuze from './components/Keuze';
import Rugzak from './components/Rugzak';

function App() {

  return (
    <Switch>
      <Route path={ROUTES.login}>
          <Login />
      </Route>
      <Route path={ROUTES.aanmelden}>
          <Aanmelden />
      </Route>

      {/* registratieproces */}
      <Route exact path={ROUTES.registratie}>
          <Registratie />
      </Route>
      <Route path={ROUTES.fontsize}>
          < FontSize/>
      </Route>
      <Route path={ROUTES.bewegen}>
          < Bewegen/>
      </Route>
      <Route path={ROUTES.bevestigen}>
          < Bevestigen/>
      </Route>
      <Route path={ROUTES.welkom}>
          <Welkom />
      </Route>
      <Route path={ROUTES.uitlegFitbit}>
          <UitlegFitbit />
      </Route>

      <Route path={ROUTES.feedback}>
          <Feedback />
      </Route>

      <Route path={ROUTES.overzicht}>
          <Overzicht />
      </Route>
      <Route path={ROUTES.reisoverzicht.path}>
          <ReisOverzicht />
      </Route>

      <Route path={ROUTES.rugzak}>
          <Rugzak />
      </Route>

      <Route path={ROUTES.keuze.path}>
          <Keuze />
      </Route>

      <Route exact path={ROUTES.reisaanbod}>
          <Reisaanbod />
      </Route>
      <Route path={ROUTES.aanbodDetail.path}>
        <LandDetail />
      </Route>
      <Route path={ROUTES.stadDetail.path}>
        <StadDetail />
      </Route>
      <Route path={ROUTES.activiteitDetail.path}>
        <ActiviteitDetail />
      </Route>

      <Route path={ROUTES.instellingen}>
          <Instellingen />
      </Route>
      <Route path="/" exact >
        <Landingpage />
      </Route>
  </Switch> 
  );
}

export default App;
