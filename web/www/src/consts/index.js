const ROUTES = {
  home: "/",

  onboardingDownload: "/onboarding/download", 
  onboardingHulp: "/onboarding/hulp", 
  onboardingKnoppen: "/onboarding/knoppen", 
  onboardingPlezier: "/onboarding/plezier",

  inloggen: "/inloggen", 
  token: "/token", 

  wandelplezier: "/wandelplezier",

  aanmelden: "/aanmelden",

  registratie: "/registratie",
  welkom: "/registratie/welkom",
  uitlegFitbit: "/registratie/uitlegFitbit",
  fontsize: "/registratie/fontsize",
  bewegen: "/registratie/bewegen",
  bevestigen: "/registratie/bevestigen",

  feedback: "/feedback",

  rugzak: "/rugzak",
  
  overzicht: "/overzicht",
  reisoverzicht: { path: "/reisoverzicht/:id", to: "/reisoverzicht/" },
  stadkeuze: { path: "/stadkeuze/:id", to: "/stadkeuze/" },

  landingpage: "/landingpage", 
  instellingen: "/instellingen", 

  reisaanbod: "/reisaanbod",
  keuze: { path: "/reisaanbod/keuze/:id", to: "/reisaanbod/keuze/" },
  
  intro: { path: "/activiteit/intro/:id", to: "/activiteit/intro/" },
  split: { path: "/activiteit/split/:id", to: "/activiteit/split/" },
  teweinig: { path: "/activiteit/teweinig/:id", to: "/activiteit/teweinig/" },
  optie1: { path: "/activiteit/optie1/:id", to: "/activiteit/optie1/" },
  optie2: { path: "/activiteit/optie2/:id", to: "/activiteit/optie2/" },
  einde: { path: "/activiteit/einde/:id", to: "/activiteit/einde/" },


  aanbodDetail: { path: "/reisaanbod/aanboddetail/:id", to: "/reisaanbod/aanboddetail/" },
  activiteitDetail: { path: "/activiteit/:id", to: "/activiteit/" },
  stadDetail: { path: "/stad/:id", to: "/stad/" }

};

export { ROUTES };
