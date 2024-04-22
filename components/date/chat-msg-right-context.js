import React from 'react';

export default function ChatMsgRightContext({ messages }) {
  return (
    <>
      <div>
        {/* {messages.map((message, index) => ( */}
        <div className="chat chat-end mr-5">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS chat bubble component"
                src={messages.sender_avatar}
              />
            </div>
          </div>
          <div className="chat-header">
            {messages.sender_id}
            <time className="text-xs opacity-50">{messages.sended_at}</time>
          </div>
          <div className="chat-bubble">{messages.content}</div>
          {/* <div className="chat-footer opacity-50">Seen at 12:46</div> */}
        </div>
        {/* ))} */}
      </div>
    </>
  );
}
