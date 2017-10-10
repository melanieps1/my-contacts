var contactApp = new Vue({

  el: "#contactApp",

  data: {

    newName: '',
    newPhone: '',
    newEmail: '',

    attemptingSave: false,

    contactList: [], // this is used to store data

    nextId: 0,

    nextIdSeeds: 5,

    contactSeeds: [
      {
        id: 1,
        name: 'Albus Dumbledore',
        phone: '859-123-4567',
        email: 'call.me.al@hogwarts.com'
      },
      {
        id: 2,
        name: 'Minerva McGonagall',
        phone: '606-234-9876',
        email: 'mmcgona@hogwarts.com'
      },
      {
        id: 3,
        name: 'Severus Snape',
        phone: '502-444-1010',
        email: 'potionsmstr@hogwarts.com'
      },
      {
        id: 4,
        name: 'Rubeus Hagrid',
        phone: '859-913-2846',
        email: 'norbertsmommy@hogwarts.com'
      }
    ]

  },

  computed: {

    contacts: function() { // this is the sorted version of contactList, for display purposes

      return this.contactList.sort(this.alphabetizeContacts);

    },

    missingName: function() {

      return this.newName === '';

    },

    badPhone: function() {

      var pattern = /^[1-9]\d{2}-\d{3}-\d{4}$/;
      return !pattern.test(this.newPhone);

    },

    badEmail: function() {

      var pattern = /@/;
      return !pattern.test(this.newEmail);

    }

  },

  beforeMount: function() {

    this.loadContacts();    

  },

  methods: {

    validateForm: function(event) {

      this.attemptingSave = true;
      if (this.missingName || this.badPhone || this.badEmail) {
        event.preventDefault();
      }
      else {
        this.addContact();
      }

    },

    addContact: function() {

      if (this.newName && this.newPhone && this.newEmail) {

        this.contactList.push({
          id: this.nextId++,
          name: this.newName,
          phone: this.newPhone,
          email: this.newEmail
        });
        this.newName = '';
        this.newPhone = '';
        this.newEmail = '';
        this.attemptingSave = false;

        this.saveContacts();

      }
      else {
        // nothing
      }

    },
    
    removeContact: function(id) {

      var index = this.findContact(id);
      this.contactList.splice(index, 1);
      this.saveContacts();

    },
    
    findContact: function(id) {

      return this.contactList.findIndex(function(contact) {
        return id === contact.id;
      });


    },

    loadContacts: function() {

      this.nextId = localStorage.getItem('nextId');
      this.contactList = JSON.parse(localStorage.getItem('contactList'));
      if (!this.contactList) {
        this.contactList = this.contactSeeds;
        this.nextId = this.nextIdSeeds;
      }

    },

    saveContacts: function() {

      localStorage.setItem('contactList', JSON.stringify(this.contactList));
      localStorage.setItem('nextId', this.nextId);

    },

    alphabetizeContacts: function(a, b) {

      var aName = a.name.toLowerCase();
      var bName = b.name.toLowerCase();

      var comparison = 0;

      if (aName > bName) {
        comparison = 1;
      }
      else if (aName < bName) {
        comparison = -1;
      }

      return comparison;

    }

  }

});