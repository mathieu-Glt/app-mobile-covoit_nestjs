import { useEffect, useState } from "react";
import { getAssociationById } from "../../services/api/association";
import { useHistory, useParams } from "react-router";
import { IonHeader, IonTitle, IonNav, IonToolbar, IonNavLink, IonContent, IonItem, IonLabel, IonList, IonButton, IonImg, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent } from "@ionic/react";
import { userConnected } from "../../services/api/user";


export default function AssociationPage(props) {
    console.log("🚀 ~ file: ASSOCIATIONpAGE.TSX:9 ~ AssociationPage ~ props:", props)
    const history = useHistory();
    const params = useParams();
    const id = params.id;
    console.log("🚀 ~ file: EventPage.tsx:11 ~ EventPage ~ id:", id)


    // console.log("🚀 ~ file: Event.tsx:8 ~ Event ~ props:", props)


    const [association, setAssociation] = useState([]);
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
        async function loadAssociation() {
            console.log("COUCOU ID ", id);

            const association = await getAssociationById(id);
            console.log("🚀 ~ file: ASSOCIATIONpAGE.TSX:46 ~ loadAssociation ~ association:", association)
            setAssociation(association);
        }
        loadAssociation();
    }, [])
    
    if (isLoading) {
        return <div>Loading association...</div>
    };
    
    if (error) {
        return <div>Error: {error.message}</div>
    }
    
    
    console.log("🚀 ~ file: EventPage.tsx:46 ~ loadEvent ~ event:", association)



    return (
        <>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Page detaille association</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonButton onClick={() => history.goBack()}>Go</IonButton>

            <IonCard>
            <IonImg src="https://www.ligne.fr/medias/2018/02/sports-e1517588086643-1070x1000.png" ></IonImg>
                <IonCardTitle>{association.name}</IonCardTitle>
                <IonCardSubtitle>{association.description}</IonCardSubtitle>
                <IonCardSubtitle>crée le : {association.createdAt}</IonCardSubtitle>
            </IonCard>

        </>
    )
}