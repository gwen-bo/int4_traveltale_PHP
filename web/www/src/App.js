import React from 'react';
import {ROUTES} from "./consts/index";
import { Switch, Route } from "react-router-dom";
import Overzicht from "./components/Overzicht"
import Reisaanbod from "./components/Reisaanbod"
import Inloggen from "./components/Inloggen"
import AccessToken from './components/AccessToken';
import OnboardingIntro from './flows/Onboarding/OnboardingIntro';
import OnboardingHulp from './flows/Onboarding/OnboardingHulp';
import OnboardingKnoppen from './flows/Onboarding/OnboardingKnoppen';
import OnboardingPlezier from './flows/Onboarding/OnboardingPlezier';
import OnboardingDownload from './flows/Onboarding/OnboardingDownload';
import LandDetail from "./components/LandDetail"
import ReisOverzicht from "./components/ReisOverzicht"
import Instellingen from "./flows/Instellingen/Instellingen"
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
import StadKeuze from './components/StadKeuze';
import Intro from './flows/Activiteit/Intro';
import Split from './flows/Activiteit/Split';
import TeWeinig from './flows/Activiteit/TeWeinig';
import Optie1 from './flows/Activiteit/Optie1';
import Optie2 from './flows/Activiteit/Optie2';
import Einde from './flows/Activiteit/Einde';
import Wandelplezier from './components/Wandelplezier';
import NotFound from './components/NotFound';

function App() {

  return (
    <Switch>

    <Route exact path={ROUTES.token}>
        <AccessToken />
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
      <Route exact path={ROUTES.stadkeuze.path}>
          <StadKeuze />
      </Route>
      <Route path={ROUTES.aanbodDetail.path}>
        <LandDetail />
      </Route>
      <Route exact path={ROUTES.stadDetail.path}>
        <StadDetail />
      </Route>

{/* Activiteiten flow */}
      <Route exact path={ROUTES.intro.path}>
          <Intro />
      </Route>
      <Route exact path={ROUTES.split.path}>
          <Split />
      </Route>
      <Route exact path={ROUTES.teweinig.path}>
          <TeWeinig />
      </Route>
      <Route exact path={ROUTES.optie1.path}>
          <Optie1 />
      </Route>
      <Route exact path={ROUTES.optie2.path}>
          <Optie2 />
      </Route>
      <Route exact path={ROUTES.einde.path}>
          <Einde />
      </Route>

      <Route path={ROUTES.instellingen}>
          <Instellingen />
      </Route>

      <Route path={ROUTES.wandelplezier}>
          <Wandelplezier />
      </Route>

      <Route path={ROUTES.instellingen}>
          <Instellingen />
      </Route>

      <Route exact path={ROUTES.inloggen}>
          <Inloggen />
      </Route>

      <Route exact path={ROUTES.onboardingDownload}>
          <OnboardingDownload />
      </Route>

      <Route exact path={ROUTES.onboardingKnoppen}>
          <OnboardingKnoppen />
      </Route>

      <Route exact path={ROUTES.onboardingPlezier}>
          <OnboardingPlezier />
      </Route>

      <Route exact path={ROUTES.onboardingHulp}>
          <OnboardingHulp />
      </Route>

    
      <Route path="/" exact >
        <OnboardingIntro />
      </Route>

      <Route path="*" >
            <NotFound />
        </Route>
  </Switch> 
  );
}

export default App;
