import React from 'react';
import ConversationItem from './ConversationItem';

const ConversationsList = ({ conversations, onSelectConversation }) => (
   <div className="w-[400px] border-r border-gray-200 overflow-y-auto">
      {conversations.map((convo) => (
         <ConversationItem
            key={convo.id}
            name={convo.name}
            message={convo.message}
            time={convo.time}
            active={convo.active}
            onClick={() => onSelectConversation(convo.id)}
         />
      ))}
   </div>
);

export default ConversationsList;
