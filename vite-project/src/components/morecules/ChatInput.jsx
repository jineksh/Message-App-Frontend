import React from 'react'
import Editor from '../atoms/Editor/Editor'
import { useSocketContext } from '@/hooks/contextHooks/SocketContext'
import { useAuth } from '@/hooks/contextHooks/Auth'

const ChatInput = ({ addMessage }) => {
    const { socket, currentChannel } = useSocketContext();
    const { Auth } = useAuth();

    async function handleSubmit(data) {
        const newMessage = {
            channel: currentChannel,
            sender: {
                _id: Auth.user._id,
                name: Auth.user.name,
                avatar: Auth.user.avatar, // agar hai to
            },
            content: data,
            createdAt: new Date().toISOString() // optional
        };


        addMessage(newMessage);

        // Send to backend
        socket?.emit('db messages', newMessage, (response) => {
            console.log('Message Sent', response);
        });
    }

    return (
        <div className="px-5 w-full">
            <Editor
                placeholder="Type a message..."
                onSubmit={handleSubmit}
                onCancel={() => { }}
                disabled={false}
                defaultValue=""
            />
        </div>
    );
}

export default ChatInput;
