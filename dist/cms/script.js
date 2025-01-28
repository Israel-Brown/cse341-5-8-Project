let contacts = [];

function toggleForm() {
    const form = document.getElementById('contact-form');
    form.style.display = form.style.display === 'block' ? 'none' : 'block';
    document.getElementById('contact-id').value = ''; // Reset form
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
}

function handleFormSubmit(event) {
    event.preventDefault();
    
    const id = document.getElementById('contact-id').value;
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    
    if (id) {
        // Edit contact
        const index = contacts.findIndex(contact => contact.id === id);
        contacts[index] = { id, name, email };
    } else {
        // Add new contact
        const newContact = { id: Date.now().toString(), name, email };
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
            <td>${contact.name}</td>
            <td>${contact.email}</td>
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
    document.getElementById('name').value = contact.name;
    document.getElementById('email').value = contact.email;
    
    toggleForm();
}

function deleteContact(id) {
    contacts = contacts.filter(contact => contact.id !== id);
    renderContacts();
}

// Initial render
renderContacts();
