import { createContext } from 'react';
import {io} from 'socket.io-client';
import { useState } from 'react';
const SocketContext = createContext();


export const SocketContextProvider = ({ children }) => {

    const socket = io("http://localhost:3001");

    const [currentChannel,setCurrentChannel] = useState(null);

    async function joinChannel(channel){
        socket.emit('JoinChannel',{channel},(data)=>{
            setCurrentChannel(data.data);
        });
    }

    return (
        <SocketContext.Provider value={{socket,joinChannel,currentChannel}}>
        {children}
        </SocketContext.Provider>
    );
}

export default SocketContext;