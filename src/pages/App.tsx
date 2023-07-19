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
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useLocalStorage } from "../hooks/useLocalStorage";
// import { getTodos, postTodo } from "./services/api/todo";

import { v4 as uuidv4 } from "uuid";

import { useIonRouter } from '@ionic/react';
import PrivateRoute from "../services/utils/PrivateRoute";
import Tabs from "../services/utils/Tabs";
import LoginPage from "../components/LoginForm/LoginForm";
import Event from "./Tabs/Event/Event";
setupIonicReact();

export default function App() {

 
  //const history = useHistory();
 

  let router = useIonRouter();
  
  const [messages, setMessage]: any = useState([]);
  const [todos, setTodos]: any = useState([]);

  const auth = { token: "54545454545" };

  const STORAGE_KEY = "message";
  const [storedMessages, setStorageMessages] = useLocalStorage(STORAGE_KEY, []);



  useEffect(() => {
    console.log("Je suis dans le useEffect");
    setMessage(storedMessages);
  }, []);

  useEffect(() => {
    console.log("Je suis dans le useEffect et je suis genial");
    setStorageMessages(messages);
  }, [messages]);

  
 

 function handleAddMessage(message: any) {
    
    const body: any = {
      title: "foo",
      body: "bar",
      userId: 1,
    };

    //const postArticle = await postTodo(body);

    //console.log(postArticle);
    //await setMessage([...messages, { ...message, id: uuidv4() }]);

  }
 
 

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/event" component={Event} />
          
          <Route path="/tabs">
            <PrivateRoute>
              <Tabs />
            </PrivateRoute>
          </Route>

        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
}
