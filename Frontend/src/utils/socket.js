import { io } from "socket.io-client";
import {BASE_URL} from '../utils/Constant'

export const createSocketConnection = ()=>{
    return io(BASE_URL)
}