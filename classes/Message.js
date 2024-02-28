class Message{
    constructor(sender, conversationId, id, content, quoted=null){
        this.sender = sender;
        this.id = id;
        this.content = content;
        this.quoted = quoted;
        this.conversationId = conversationId;
    }
}

export default Message;