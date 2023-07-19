import { FormEvent, useEffect, useState } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage"
import { loginUser, sentEmailResetPassword } from "../../services/api/auth"
import { Button, Col, Form, InputGroup, Modal, Row } from "react-bootstrap"
import { IonList, IonItem, IonLabel, IonInput } from "@ionic/react";
import { IonHeader, IonTitle, IonToolbar, IonCol, IonGrid, IonRow, IonButton } from "@ionic/react";
import './login.css';

export default function LoginForm() {

    const [showModal, setShowModal] = useState(false);
    // variable token qui sera stocker dans le localStrorage
    const ACCESSTOKEN = "accessToken";
    // variables refreshToken qui sera stocker dans le localStorage
    const REFRESHTOKEN = "refreshToken";
    // variables user qui sera stocker dans le localStorage
    const USER = "user";

    // const [storeToken, setStoreToken] = useLocalStorage(ACCESSTOKEN, '');
    // const [storeRefreshToken, setStoreRefreshToken] = useLocalStorage(REFRESHTOKEN, '');
    const [storeUser, setStoreUser] = useLocalStorage(USER, '');

    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const [sentEmail, setSentEmail] = useState({
        email: ""
    });

    // Function sends login form
    const handleLoginForm = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Login as licked');

        try {
            const response = await loginUser(user);
            console.log("🚀 ~ file: LoginForm.tsx:32 ~ handleLoginForm ~ response:", response)
            if (response) {
                // stocke le accessToken dans le localStorage
                localStorage.setItem(ACCESSTOKEN, response.data.datas.tokens.accessToken);
                // stock le refreshToken dans le localStrorage
                localStorage.setItem(REFRESHTOKEN, response.data.datas.tokens.refreshToken);
                // stock le userConnected dans le localStorage
                setStoreUser(response.data.datas.user);
                // setStoreUser(response.data.user.ADMIN)
                // location.href = "/tabs/events";
                setUser('');
            }
        } catch (error) {
            console.log('erreur signin' + error)
        }
        location.href = "/tabs/events";
    };

    // Set value inputs login form
    const handleChange = (e: any) => {
        const { name, value }: any = e.target;
        setUser({ ...user, [name]: value });
    };
console.log(user);

    // Set value input modal sent email for resete password
    const handleSentEmailChange = (e: any) => {
        const { name, value }: any = e.target;
        setSentEmail({ ...sentEmail, [name]: value });
        console.log(value)
    };

    const openModal = () => {
        setShowModal(true)
    };

    const closeModal = () => {
        setShowModal(false)
    };

    // Function sent email reset password
    const handleSubmitEmail = async (e: FormEvent<HTMLFormElement | HTMLButtonElement>) => {
        e.preventDefault()
        console.log('sent email as clicked')
        try {
            const response = await sentEmailResetPassword(user)
            return response

        } catch (error) {
            console.log('erreur signin' + error)
        }
    };

    return (

        <>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Page de connexion</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonGrid className="fom_login">
                <IonRow >
                    <IonCol size="12">
                        <form className="form" onSubmit={(e) => handleLoginForm(e)}>
                            <IonLabel>Email :</IonLabel>
                            <IonInput
                                type="email"
                                id="email"
                                name="email"
                                className="input_fomr"
                                placeholder="mgr@ght.com"
                                labelPlacement="floating"
                                onIonInput={(e) => handleChange(e)}
                                required
                            />
                            <IonLabel>Password :</IonLabel>

                            <IonInput
                                type="password"
                                id="password"
                                name="password"
                                className="input_fomr"
                                placeholder="Password"
                                labelPlacement="floating"
                                onIonInput={(e) => handleChange(e)}
                                required
                            />
                            <IonButton 
                                expand="full" 
                                type="submit"
                                className="button_form"
                            >
                                Se connecter
                            </IonButton>
                        </form>
                    </IonCol>
                </IonRow>
            </IonGrid>

        </>
    )
}
