import { useEffect, useState } from "react";
import loadConversations from "../functions/loadConversations";
import formatDate from "../functions/fomartDate";

const Conversation = ({conversation }) => {
  const {lastMessage, userDetails} = conversation;
  const {createdAt, text} = lastMessage;
  const {img, name} = userDetails[0];
  return (
    <div className="conversation-strip">
      <div className="left">
        <img src={img} alt="Sender" />
      </div>
      <div className="right">
        <div className="top">
          <div className="name">{name}</div>
        </div>
        <div className="bottom">
          <div className="last-message">{text}</div>
        </div>
      </div>
      <div className="floating">
        <div className="time">{formatDate(createdAt)}</div>
        {/* <div className="statuses-d">
          {pinned && <div className="pinned"><i className="fas fa-thumbtack"></i></div>}
          {muted && <div className="muted"><i className="fas fa-volume-mute"></i></div>}
          {newMessages > 0 && <div className="new-messages">{newMessages}</div>}
        </div> */}
      </div>
    </div>
  )

}

const Home = ({ userId }) => {

  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(()=>{
    loadConversations(userId).then(conversations => {
      console.log(conversations);
      setConversations(conversations);
      setLoading(false);
    }).catch(e=>{
      setLoading(false)
      setError(true);
      console.log(e);
    });
  }, [])
  return (
    <div>
      <div className="header">
        <div className="top"> <div className="txt-lg">Chats</div>
          <div className="option">
            <i className="fas fa-bars-staggered"></i>
          </div>
        </div>
        <div className="search">
          <div className="icon">
            <i className="fas fa-search"></i>
          </div>
          <input type="text" placeholder="Search" />
        </div>
      </div>
     {conversations?.length > 0 &&  <section className="content">
        {conversations.map((conversation) => (
          <Conversation conversation={conversation} key={conversation.id} />
        ))}
      </section>}

      {!loading &&!conversations?.length > 0 && <div className="no-conversations">No Conversations</div>}
      {loading && <div className="loading">Loading conversations...</div>}
      {error && <div className="error">Error loading conversations</div>}
    </div>
  );
};

export default Home;