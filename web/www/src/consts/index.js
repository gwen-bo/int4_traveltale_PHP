const ROUTES = {
  home: "/",
  login: "/login", 
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
  landingpage: "/landingpage", 
  instellingen: "/instellingen", 

  reisaanbod: "/reisaanbod",
  keuze: { path: "/reisaanbod/keuze/:id", to: "/reisaanbod/keuze/" },

  aanbodDetail: { path: "/reisaanbod/aanboddetail/:id", to: "/reisaanbod/aanboddetail/" },
  activiteitDetail: { path: "/activiteit/:id", to: "/activiteit/" },
  stadDetail: { path: "/stad/:id", to: "/stad/" }

};

export { ROUTES };
