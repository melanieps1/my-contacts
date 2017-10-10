Vue.component( 'contactLine', {
	template :\
		'<tr>\
			<td class="buttonColumn">\
				<button v-on:click="removeContact(contact.id)">\
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
				email: 'albus@dumbledore.com'
			},
			{
				id: 2,
				name: 'Minerva McGonagall',
				phoneNumber: '606-234-9876',
				email: 'minerva@mcgonagall.com'
			},
			{
				id: 3,
				name: 'Severus Snape',
				phoneNumber: '502-444-1010',
				email: 'severus@snape.com'
			},
		],
		nextContactId : 4
	},

	methods: {
		addContact: addContact,
		removeContact: removeContact,
		findContact: findContact,
		validatePhoneNumber: validatePhoneNumber,
		validateEmail: validateEmail,
		validateName: validateName
	}

});


function addContact() {
	this.contacts.push(
		{
			id: this.nextContactId++,
			name: this.newName,
			phoneNumber: this.newPhoneNumber,
			email: this.newEmail
		}
	);
	this.newName = '';
	this.newPhoneNumber = '';
	this.newEmail = '';
	}

function removeContact(id) {
	var contactIndex = this.findContact( id );
	this.contacts.splice( contactIndex, 1 );
}

function findContact(id) {
	return this.contacts.findIndex( 
		function( contact ) { 
			return ( id === contact.id ); 
		} 
	);
}

function validateName() {

	var nameRe = /[- a-zA-Z]+$/;

	if (this.newName.match(nameRe) || this.newName !== '') {
		document.getElementById("btnSave").disabled = false;
		return true;
	} else {
		document.getElementById("btnSave").disabled = true;
		return false;
	}
}

function validatePhoneNumber(newPhoneNumber) {

	var phoneRe = /^[0-9\-\+\s\(\)]*$/;

		if (this.newPhoneNumber.match(phoneRe) || this.newPhoneNumber !== '') {
			document.getElementById("btnSave").disabled = false;
			return true;
		} else {
			document.getElementById("btnSave").disabled = true;
			return false;
		}
}

function validateEmail() {
	
	var emailRe = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	
	if (this.newEmail.match(emailRe) || this.newEmail !== '') {
		document.getElementById("btnSave").disabled = false;
		return true;
	} else {
		document.getElementById("btnSave").disabled = true;
		return false;
	}
}