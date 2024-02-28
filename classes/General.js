import {v4 as uuid} from 'uuid';

class Account {
    constructor(username, password) {
      this.id = uuid(); // Use a library like 'uuid' to generate unique ids
      this.username = username;
      this.password = password;
    }
  }
  
  class Message {
    constructor(sender, content, timestamp) {
      this.id = uuid();
      this.sender = sender;
      this.content = content;
      this.timestamp = timestamp;
    }
  }
  
  class Conversation {
    constructor(participants) {
      this.id = uuid();
      this.participants = participants;
      this.messages = [];
    }
  
    addMessage(message) {
      this.messages.push(message);
    }
  
    getLatestMessage() {
      return this.messages[this.messages.length - 1];
    }
  }
  
  class Group extends Conversation {
    constructor(name, participants) {
      super(participants);
      this.name = name;
    }
  }
  
  
  // Example usage
  const account1 = new Account("username1", "password1");
  const account2 = new Account("username2", "password2");
  
  const message1 = new Message(account1, "Hello!", new Date());
  const message2 = new Message(account2, "Hi there!", new Date());
  
  const conversation = new Conversation([account1, account2]);
  conversation.addMessage(message1);
  conversation.addMessage(message2);
  
  const group = new Group("My Group", [account1, account2]);
  group.addMessage(message1);
  group.addMessage(message2);
  
  console.log(conversation.getLatestMessage()); // Outputs the latest message in the conversation
  console.log(group.messages); // Outputs all messages in the group
  