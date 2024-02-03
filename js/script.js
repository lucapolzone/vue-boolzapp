const {createApp} = Vue;

const app = createApp({
  data() {
    return {
      contacts,
      activeIndex: 0,
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
  }
});

app.mount('#big-wrapper');