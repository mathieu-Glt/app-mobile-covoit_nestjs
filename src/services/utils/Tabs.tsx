import {
  IonContent,
  IonHeader,
  IonIcon,
  IonLabel,
  IonPage,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import { Redirect, Route } from "react-router";
import { ellipse, square, triangle } from "ionicons/icons";
import Home from "../../pages/Tabs/Request/RequestReadPage";
import Contact from "../../pages/Tabs/Event/EventListPage";
import Message from "../../pages/Tabs/Exchange/ExchangeListPage";
import RequestPage from "../../pages/Tabs/Request/RequestReadPage";
import EventPage from "../../pages/Tabs/Event/EventListPage";
import ExchangePage from "../../pages/Tabs/Exchange/ExchangeListPage";
import Event from "../../pages/Tabs/Event/EventPage";
import AssociationListPage from "../../pages/Association/AssociationListPage";




const Tabs: React.FC = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        
        <Route exact path="/tabs/events" component={EventPage} />
        <Route exact path="/tabs/request" component={RequestPage} />
        <Route exact path="/tabs/assos" component={AssociationListPage} />

        <Route exact path="/tabs">
          <Redirect to="/tabs/home"></Redirect>
        </Route>
       

      </IonRouterOutlet>

      <IonTabBar slot="bottom">
      <IonTabButton tab="exchange" href="/tabs/assos">
          <IonIcon aria-hidden="true" icon={square} />
          <IonLabel>Association</IonLabel>
        </IonTabButton>
        <IonTabButton tab="event" href="/tabs/events">
          <IonIcon aria-hidden="true" icon={triangle} />
          <IonLabel>Evenement</IonLabel>
        </IonTabButton>
        <IonTabButton tab="request" href="/tabs/request">
          <IonIcon aria-hidden="true" icon={ellipse} />
          <IonLabel>Requests</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default Tabs;
