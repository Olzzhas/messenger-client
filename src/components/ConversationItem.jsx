const ConversationItem = ({ name, message, time, active, onClick }) => (
   <div
      className={`p-4 cursor-pointer ${
         active ? 'bg-gray-200' : 'hover:bg-gray-100'
      }`}
      onClick={onClick}
   >
      <div className="font-bold font-jakarta">{name}</div>
      <div className="text-sm text-gray-600 font-jakarta">{message}</div>
      <div className="text-xs text-gray-400 font-jakarta">{time}</div>
   </div>
);

export default ConversationItem;
