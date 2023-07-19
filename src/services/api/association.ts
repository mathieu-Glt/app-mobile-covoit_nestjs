import axios from "axios";
import { useApi } from "../../hooks/useApi";


// eslint-disable-next-line react-hooks/rules-of-hooks
const api = useApi();


// call to api back-end for take all associations
export async function getAllAssociations() {
    try {
        const response = await api.get('associations');
        console.log("🚀 ~ file: association.ts:13 ~ getAllAssociations ~ response:", response)
        console.log("COOUCOUS LES DATAS", response.data.datas);
        
        return response.data.datas;
        
    } catch (error) {
        throw  new Error("Error during the request for take all events" + error)
    }
}


// call to api back-end take a association
export async function getAssociationById(id: string | undefined) {
    console.log("🚀 ~ file: association.ts:26 ~ getAssociationById ~ id:", id)
    try {
        const response = await api.get(`association/${id}`);
        console.log("🚀 ~ file: association.ts:30 ~ getAssociationById ~ response:", response)

        return response.data.datas;
    } catch (error) {
        throw  new Error("Error during the request for take an association" + error)

    }
}
