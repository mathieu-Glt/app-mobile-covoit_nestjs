import axios from "axios";
import { useApi } from "../../hooks/useApi";


// eslint-disable-next-line react-hooks/rules-of-hooks
const api = useApi();

// call to api back-end for take all events
export async function getAllEvents() {
    try {
        const response = await api.get('events');
        console.log("🚀 ~ file: events.ts:12 ~ getAllEvents ~ response:", response)
        console.log("COOUCOUS LES DATAS", response.data.datas);
        
        return response.data.datas;
        
    } catch (error) {
        throw  new Error("Error during the request for take all events" + error)
    }
}


// call to api back-end for take an event 
export async function getEventById(id: string | undefined) {
    console.log("🚀 ~ file: events.ts:25 ~ getEventById ~ id:", id)
    try {
        const response = await api.get(`events/${id}`);
        console.log("🚀 ~ file: events.ts:27 ~ getEvent ~ response:", response)
        
        return response.data.datas;
        
    } catch (error) {
        throw  new Error("Error during the request for take an event" + error)
    }
}