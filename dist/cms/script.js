let contacts = [];

function toggleForm() {
    const form = document.getElementById('contact-form');
    form.style.display = form.style.display === 'block' ? 'none' : 'block';
    document.getElementById('contact-id').value = ''; // Reset form
    document.getElementById('first-name').value = '';
    document.getElementById('last-name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('favorite-color').value = '';
    document.getElementById('birthday').value = '';
}

function handleFormSubmit(event) {
    event.preventDefault();
    
    const id = document.getElementById('contact-id').value;
    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const email = document.getElementById('email').value;
    const favoriteColor = document.getElementById('favorite-color').value;
    const birthday = document.getElementById('birthday').value;
    
    if (id) {
        // Edit contact
        const index = contacts.findIndex(contact => contact.id === id);
        contacts[index] = { id, firstName, lastName, email, favoriteColor, birthday };
    } else {
        // Add new contact
        const newContact = { id: Date.now().toString(), firstName, lastName, email, favoriteColor, birthday };
        contacts.push(newContact);
    }

    renderContacts();
    toggleForm();
}

function renderContacts() {
    const contactsTable = document.getElementById('contactsTable').getElementsByTagName('tbody')[0];
    contactsTable.innerHTML = '';
    
    contacts.forEach(contact => {
        const row = contactsTable.insertRow();
        row.innerHTML = `
            <td>${contact.firstName} ${contact.lastName}</td>
            <td>${contact.email}</td>
            <td>${contact.favoriteColor}</td>
            <td>${contact.birthday}</td>
            <td>
                <button class="edit-btn" onclick="editContact('${contact.id}')">Edit</button>
                <button class="delete-btn" onclick="deleteContact('${contact.id}')">Delete</button>
            </td>
        `;
    });
}

function editContact(id) {
    const contact = contacts.find(contact => contact.id === id);
    document.getElementById('contact-id').value = contact.id;
    document.getElementById('first-name').value = contact.firstName;
    document.getElementById('last-name').value = contact.lastName;
    document.getElementById('email').value = contact.email;
    document.getElementById('favorite-color').value = contact.favoriteColor;
    document.getElementById('birthday').value = contact.birthday;
    
    toggleForm();
}

function deleteContact(id) {
    contacts = contacts.filter(contact => contact.id !== id);
    renderContacts();
}

// Initial render
renderContacts();
