import config from './config.json';
import axios from "axios";

const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:9000' : config.API_URL

export const sendMessage = ({message, channel = config.APP_CHANNEL}) => {
    return axios.post(`${baseUrl}/pusher/send`, {
        channel,
        message
    })
}