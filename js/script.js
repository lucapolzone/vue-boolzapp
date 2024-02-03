const {createApp} = Vue;

const app = createApp({
  data() {
    return {
      contacts,
      activeIndex: 0,
      newMessage: {
        date: '',
        message: '',
        status: 'sent',
      }
    };
  },

  computed: {
    activeContact() {
      return this.contacts[this.activeIndex];
    },
  },


  methods: {
    getLastAccessFromMessages(messages) {
      const sentMessages = messages.filter((message) => message.status == 'sent');
      const lastMessage = sentMessages[sentMessages.length - 1];
      return lastMessage ? lastMessage.date : ''; 
    },

    getLastMessageFromMessages(messages) {
      const lastMessage = messages.at(-1);
      return lastMessage ? lastMessage.message : ''; 
    },

    setActiveIndex(newIndex) {
      this.activeIndex = newIndex;
    },
    
    sendMessage() {
      const newMessage = {...this.newMessage};
      newMessage.date = this.getCurrentTime();
      this.activeContact.messages.push(newMessage);
      setTimeout(this.sendAutomatedResponse, 1000);
    },

    sendAutomatedResponse() {
      const newMessage = {
        message: 'Ok',
        date: this.getCurrentTime(),
        status: 'received',
      };
      this.activeContact.messages.push(newMessage);
    },

    getCurrentTime() {
      const now = new Date();
      return `${now.getHours()}:${now.getMinutes()}`;
    }
  }
});

app.mount('#big-wrapper');