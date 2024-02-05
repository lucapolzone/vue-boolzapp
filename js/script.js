const {createApp} = Vue;

const app = createApp({
  data() {
    return {
      contacts,
      activeIndex: 0,
      visible: true, //per il contatto in contact list
      contactsTerm: '',
      newMessage: {
        date: '',
        message: '',
        status: 'sent',
      }
    };
  },

  computed: {
    activeContact() {
      //lego il cambio dell'indice al cambio di contatto
      return this.contacts[this.activeIndex];
    },
  },


  methods: {
    //ultimo accesso
    getLastAccessFromMessages(messages) {
      const sentMessages = messages.filter((message) => message.status == 'sent');
      const lastMessage = sentMessages[sentMessages.length - 1];
      return lastMessage ? lastMessage.date : ''; 
    },

    //ultimo messaggio ricevuto
    getLastMessageFromMessages(messages) {
      const lastMessage = messages.at(-1);
      return lastMessage ? lastMessage.message : ''; 
    },

    //funzione per gestire il cambio dell'indice
    setActiveIndex(newIndex) {
      this.activeIndex = newIndex;
    },
    
    //funzione che permette all'utente di scrivere un messaggio
    sendMessage() {
      //interrompe la funzione se il testo è vuoto
      if(!this.newMessage.message) return;

      const newMessage = {...this.newMessage};
      newMessage.date = this.getCurrentTime();
      this.activeContact.messages.push(newMessage);
      setTimeout(this.sendAutomatedResponse, 1000);
    },

    //risposta automatica
    sendAutomatedResponse() {
      const newMessage = {
        message: 'Ok',
        date: this.getCurrentTime(),
        status: 'received',
      };
      this.activeContact.messages.push(newMessage);
    },

    getCurrentTime() {
      //creo un nuovo oggetto che gestisce ore e minuti
      const now = new Date();
      return `${now.getHours()}:${now.getMinutes()}`;
    },

    contactsFilter() {
      //sovrascrivo contacts con contacts.map
      this.contacts = this.contacts.map((contact) => {
       if (contact.name.toLowerCase().includes(this.contactsTerm.toLowerCase())) {
         contact.visible = true;
        } else {
         contact.visible = false;
        }
        return contact;
      })
    }
  }
});

app.mount('#big-wrapper');