import { IonHeader, IonTitle, IonNav, IonToolbar, IonNavLink, IonContent, IonItem, IonLabel, IonList, IonButton, IonImg } from "@ionic/react";
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { userConnected } from "../../../services/api/user";
import { getAllEvents } from "../../../services/api/events";
import Event from "./EventPage";
import EventPage from "./EventPage";



export default function EventListPage() {

  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    async function loadUser() {
      try {
        const user = await userConnected();
        console.log("🚀 ~ file: EventListPage.tsx:13 ~ loadUser ~ user:", user)

      } catch (error) {
        console.log("🚀 ~ file: EventListPage.tsx:23 ~ loadUser ~ error:", error)
      }
    }
    loadUser();
  }, [])


  useEffect(() => {

    async function loadEvents() {
      try {
        const events = await getAllEvents();
        console.log("🚀 ~ file: EventListPage.tsx:13 ~ loadUser ~ events:", events)
        setEvents(events);
        setIsLoading(false)

      } catch (error) {
        console.log("🚀 ~ file: EventListPage.tsx:13 ~ loadUser ~ events:", error)
        setError(error)
        setIsLoading(false)

      }

    }
    loadEvents();
  }, [])


  if (isLoading) {
    return <div>Loading events...</div>
  };

  if (error) {
    return <div>Error: {error.message}</div>
  }




  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Page évènements</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent color="light" >
        <IonList inset={true}>
          {events ? events.map((e: any, i) => (
            <>
              <IonImg src="https://www.africatopsports.com/wp-content/uploads/2015/03/france.jpg" ></IonImg>
              <IonItem key={e._id}>
                <IonLabel>{e.name}</IonLabel>
                {/* <IonLabel>{e.description}</IonLabel> */}
                <IonButton routerLink={`/events/${e._id}`}>Details</IonButton>
              </IonItem>
            </>
          )) : <div><p>Not events loading</p></div>}
        </IonList>
      </IonContent>
    </>
  );
}
