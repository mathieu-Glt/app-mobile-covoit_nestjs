import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { ellipse, square, triangle } from "ionicons/icons";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

import LoginPage from "./components/LoginForm/LoginForm";
import Tabs from "./services/utils/Tabs";
import PrivateRoute from "./services/utils/PrivateRoute";
import EventPage from "./pages/Tabs/Event/EventPage";

setupIonicReact();
// todo transform en fonction 
function App()  {
  return (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>

        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/events/:id" component={EventPage} />


        <Route path="/tabs">
          <PrivateRoute>
            <Tabs />
          </PrivateRoute>
        </Route>


      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
)};

export default App;
