import React, { useContext, useEffect, useRef } from 'react';
import useGetChannelById from '@/hooks/channel/useGetChannel'; // hook → channel details fetch karne ke liye
import { useParams } from 'react-router-dom'; // URL se channelid nikalne ke liye
import ChannelHeader from '@/components/morecules/ChannelHeader'; // channel ka header UI
import ChatInput from '@/components/morecules/ChatInput'; // niche ka chat input box
import { useSocketContext } from '@/hooks/contextHooks/SocketContext'; // socket context (join channel, listen msgs)
import { useGetMessages } from '@/hooks/channel/useGetMessage'; // backend se messages fetch karne ka hook
import Message from '@/components/morecules/Message'; // ek single message render karne ka component
import ChannelMessages from '@/context/ChannelMessages'; // global context for message list

const Channel = () => {
  // URL se channel id le rahe hain
  const { channelid } = useParams();

  // channel info fetch karna
  const { isError, isSuccess, channel } = useGetChannelById(channelid);

  // channel ke saare messages fetch karna
  const { isPending, messages, isSuccess: isFeching } = useGetMessages(channelid);

  // socket context se joinChannel fn aur socket instance le rahe hain
  const { joinChannel, socket } = useSocketContext();

  // global context se messageList + setter
  const { messageList, setMessageList } = useContext(ChannelMessages);

  // scrollable container ka ref
  const messageContainerListRef = useRef(null);

  // 🔹 jab bhi new messages aayenge → auto scroll bottom
  useEffect(() => {
    if (messageContainerListRef.current) {
      messageContainerListRef.current.scrollTop =
        messageContainerListRef.current.scrollHeight;
    }
  }, [messageList]);

  // 🔹 channel join karna jab channel load ho jaye
  useEffect(() => {
    if (isSuccess && !isError) {
      joinChannel(channelid);
    }
  }, [isSuccess, isError, channelid]);

  // 🔹 backend se initial messages set karna
  useEffect(() => {
    if (isFeching) {
      setMessageList(messages);
    }
  }, [isFeching, messages, setMessageList, channelid]);

  // 🔹 socket se naye messages sunna
  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (newMessage) => {
      // purane messages ke saath new message add karna
      setMessageList((prev) => [...prev, newMessage]);
    };

    socket.on("db messages", handleNewMessage);

    // cleanup → listener hata dena
    return () => {
      socket.off("db messages", handleNewMessage);
    };
  }, [socket, setMessageList]);

  return (
    <div className="flex flex-col h-full">
      {/* top header with channel name */}
      <ChannelHeader name={channel?.name} />

      {/* messages list */}
      <div ref={messageContainerListRef} className="flex-1 overflow-y-auto">
        {messageList?.map((message) => {
          let bodyDelta = null;

          try {
            // agar message ke andar quill ka body stored hai → parse karna
            bodyDelta = message.content?.body
              ? JSON.parse(message.content.body)
              : null;
          } catch (err) {
            console.error("Invalid delta JSON:", err);
          }

          return (
            <Message
              key={message._id} // unique key for list
              body={bodyDelta} // quill body content
              image={message.content?.image} // attached image
              authorImage={message.sender?.avatar} // sender ka avatar
              authorName={message.sender?.name} // sender ka naam
            />
          );
        })}
      </div>

      {/* input box for sending messages */}
      <ChatInput
        addMessage={(msg) => setMessageList((prev) => [...prev, msg])}
      />
    </div>
  );
};

export default Channel;
