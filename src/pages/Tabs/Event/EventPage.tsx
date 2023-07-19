import { useEffect, useState } from "react";
import { userConnected } from "../../../services/api/user";
import { getEventById } from "../../../services/api/events";
import { useHistory, useParams } from "react-router";
import { IonHeader, IonTitle, IonNav, IonToolbar, IonNavLink, IonContent, IonItem, IonLabel, IonList, IonButton, IonImg, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent } from "@ionic/react";

export default function EventPage(props) {
    const history = useHistory();
    const params = useParams();
    const id = params.id;
    console.log("🚀 ~ file: EventPage.tsx:11 ~ EventPage ~ id:", id)


    // console.log("🚀 ~ file: Event.tsx:8 ~ Event ~ props:", props)


    const [event, setEvent] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        async function loadUser() {
            try {
                const user = await userConnected();
                console.log("🚀 ~ file: EventListPage.tsx:13 ~ loadUser ~ user:", user)
                setIsLoading(false)

            } catch (error) {
                console.log("🚀 ~ file: EventListPage.tsx:23 ~ loadUser ~ error:", error)
                setError(error)
                setIsLoading(false)
            }
        }
        loadUser();
    }, [])


    useEffect(() => {
        async function loadEvent() {
            console.log("COUCOU ID ", id);

            const events = await getEventById(id);
            console.log("🚀 ~ file: EventListPage.tsx:13 ~ loadUser ~ events:", events)
            setEvent(events);
        }
        loadEvent();
    }, [])
    
    if (isLoading) {
        return <div>Loading events...</div>
    };
    
    if (error) {
        return <div>Error: {error.message}</div>
    }
    
    
    console.log("🚀 ~ file: EventPage.tsx:46 ~ loadEvent ~ event:", event)



    return (
        <>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Page detaille évènement</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonButton onClick={() => history.goBack()}>Go</IonButton>

            <IonCard>
            <IonImg src="https://www.africatopsports.com/wp-content/uploads/2015/03/france.jpg" ></IonImg>
                <IonCardTitle>{event.name}</IonCardTitle>
                <IonCardSubtitle>{event.description}</IonCardSubtitle>
                <IonCardSubtitle>participant : {event.participant}</IonCardSubtitle>
                <IonCardContent>addresse : {event.event_address}</IonCardContent>
            </IonCard>

        </>
    )
}