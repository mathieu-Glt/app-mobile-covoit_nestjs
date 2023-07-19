import { IonHeader, IonTitle, IonNav, IonToolbar, IonNavLink, IonContent, IonItem, IonLabel, IonList, IonButton, IonImg } from "@ionic/react";
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllAssociations } from "../../services/api/association";
import { userConnected } from "../../services/api/user";

export default function AssociationListPage() {

    const [assos, setAssos] = useState([]);
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
        async function loadAssociations() {
            try {
                const assos = await getAllAssociations();
                console.log("🚀 ~ file: Association.tsx:35 ~ loadAssociations ~ assos:", assos)
                setAssos(assos)
                setIsLoading(false)
                
            } catch (error) {
                console.log("🚀 ~ file: Association.tsx:38 ~ loadAssociations ~ error:", error)
                setError(error)
                setIsLoading(false)
                
            }
        }
        loadAssociations();
    })
    
    if (isLoading) {
        return <div>Loading associations...</div>
    };
    
    if (error) {
        return <div>Error: {error.message}</div>
    }
    console.log("🚀 ~ file: Association.tsx:10 ~ AssociationListPage ~ assos:", assos)
    
    return (
        <>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Page associations</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent color="light" >
                <IonList inset={true}>
                    {assos ? assos.map((a: any, i) => (
                        <>
                            <IonImg src="https://www.ligne.fr/medias/2018/02/sports-e1517588086643-1070x1000.png" ></IonImg>
                            <IonItem key={a._id}>
                                <IonLabel>{a.name}</IonLabel>
                                {/* <IonLabel>{e.description}</IonLabel> */}
                                <IonButton routerLink={`/associations/${a._id}`}>Details</IonButton>
                            </IonItem>
                        </>
                    )) : <div><p>Not associations loading</p></div>}
                </IonList>
            </IonContent>


        </>
    )
}