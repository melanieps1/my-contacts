Vue.component( 'contactLine', {
	template :
		'<tr>\
			<td class="buttonColumn">\
				<button v-on:click="removeContact(id)">\
					<i class="fa fa-trash-o"></i>\
				</button>\
			</td>\
			<td>\
				{{ name }}\
			</td>\
			<td>\
				{{ phoneNumber }}\
			</td>\
			<td>\
				{{ email }}\
			</td>\
		</tr>',

	props : [ 'id', 'name', 'phoneNumber', 'email', 'removeContact' ]
});


var contactList = new Vue( {

	el: '#contactList',

	data: {
		newName: '',
		newPhoneNumber: '',
		newEmail: '',
		contacts: [
			{
				id: 1,
				name: 'Albus Dumbledore',
				phoneNumber: '859-123-4567',
				email: 'headmaster@hogwarts.edu'
			},
			{
				id: 2,
				name: 'Minerva McGonagall',
				phoneNumber: '606-234-9876',
				email: 'professor.mcgonagall@hogwarts.edu'
			},
			{
				id: 3,
				name: 'Hermione Granger',
				phoneNumber: '203-535-9501',
				email: 'hermione.granger@hogwarts.edu'
			},
			{
				id: 3,
				name: 'Harry Potter',
				phoneNumber: '303-859-9933',
				email: 'theboywholived@hogwarts.edu'
			},
		],
		nextContactId : 4,
		attemptingSave: false
	},

	computed: {

		// TO DO: Needs to be fixed, doesn't work
		abcContacts: function() {
			return this.contacts.sort(this.alphabetizeContacts);
		}

	},

	beforeMount: function() {

	},

	methods: {
		alphabetizeContacts: alphabetizeContacts,
		addContact: addContact,
		removeContact: removeContact,
		findContact: findContact,
		validatePhoneNumber: validatePhoneNumber,
		validateEmail: validateEmail,
		validateName: validateName
	}

});

function alphabetizeContacts(a, b) {

	var aName = a.name.toLowerCase();
	var bName = b.name.toLowerCase();

	// -1: a < b
	// 0: a = b
	// 1: a > b
	// We are trying to return one of these three values so the sort algorithm knows how to return the contact list

	if (aName < bName) {
		return -1;
	} else if (aName > bName) {
		return 1;
	} else {
		return 0;
	}

}

// TO DO: Put validation functions into this

function addContact() {
	if (this.newName !== '' && this.newPhoneNumber !== '' && this.newEmail !== '') {
		this.contacts.push({
			id: this.nextContactId++,
			name: this.newName,
			phoneNumber: this.newPhoneNumber,
			email: this.newEmail
		});
		this.newName = '';
		this.newPhoneNumber = '';
		this.newEmail = '';
	}
}


function removeContact(id) {
	var contactIndex = this.findContact(id);
	this.contacts.splice(contactIndex, 1);
}


function findContact(id) {
	return this.contacts.findIndex(function(contact) { 
			return id === contact.id; 
		});
}


function validateName() {

	var nameRe = /[- a-zA-Z]+$/;

	if (this.newName.match(nameRe)) {
		document.getElementById("btnSave").disabled = false;
		return true;
	} else if (this.newPhoneNumber == '') {
		document.getElementById("btnSave").disabled = true;
		return false;
	} else {
		document.getElementById("btnSave").disabled = true;
		return false;
	}
}


function validatePhoneNumber(newPhoneNumber) {

	var phoneRe = /^[0-9\-\+\s\(\)]*$/;

		if (this.newPhoneNumber.match(phoneRe)) {
			document.getElementById("btnSave").disabled = false;
			return true;
		} else if (this.newPhoneNumber == '') {
			document.getElementById("btnSave").disabled = true;
			return false;
		} else {
			document.getElementById("btnSave").disabled = true;
			return false;
		}
}


function validateEmail() {
	
	var emailRe = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	
	if (this.newEmail.match(emailRe)) {
		document.getElementById("btnSave").disabled = false;
		return true;
	} else if (this.newPhoneNumber == '') {
		document.getElementById("btnSave").disabled = true;
		return false;
	} else {
		document.getElementById("btnSave").disabled = true;
		return false;
	}
}