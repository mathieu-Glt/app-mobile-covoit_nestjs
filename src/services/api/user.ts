import { useApi } from "../../hooks/useApi";

// eslint-disable-next-line react-hooks/rules-of-hooks
const api = useApi();

// call to api back-end for take user that is connected
export async function userConnected() {
    try {
        const userConnected = await api.get('user/show/me')
        console.log("🚀 ~ file: user.ts:10 ~ userConnected ~ userConnected:", userConnected)
        return userConnected.data
    } catch (error) {
        throw  new Error("Error during the request for take user connected")

    }
}
