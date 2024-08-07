let editMode = false;
let editId = null;
let editElement = null;

async function formSubmit(event) {
    event.preventDefault();
    const userData = {
        userName : event.target.user_name.value,
        phone: event.target.mob_number.value,
        email:event.target.email.value,
    }
    try {
        const response = await axios.post('http://localhost:4000/submit', userData);
        alert("Form Submitted Successfully");
        displayAppointments(response.data);
        event.target.reset();
    } catch (error) {
        console.log(error);
    }
}
function displayAppointments(appointments){
    const userList = document.createElement('li');
    userList.appendChild(document.createTextNode(`${appointments.userName}-${appointments.phone}-${appointments.email}`));

    const deleteBtn = document.createElement('button');
    deleteBtn.innerText =('Delete');

    const editBtn = document.createElement('button');
    editBtn.innerHTML = ('Edit');

    userList.appendChild(deleteBtn);
    userList.appendChild(editBtn);

    const users = document.querySelector('ul');
    users.appendChild(userList);

    deleteBtn.addEventListener("click", ()=>deleteAppointment(appointments.id, userList));

    editBtn.addEventListener("click", ()=>editForm(appointments,userList));
}

async function deleteAppointment(id, userList) {
    try {
        await axios.delete(`http://localhost:4000/delete/${id}`);
        userList.remove();
        alert('Appointment Deleted Successfully');
    } catch (error) {
        console.log(error);
    }
};

function editForm(appointments,userList){
    const form = document.querySelector('form');
    form.onsubmit = (event) => updateFormData(event);
    form.user_name.value = appointments.userName;
    form.email.value = appointments.email;
    form.mob_number.value = appointments.phone;

    const submitButton = document.querySelector('button[type="submit"]');
    submitButton.innerText = 'Update';
    editMode = true;
    editId = appointments.id;
    editElement = userList;
}
async function updateFormData(event) {
    event.preventDefault();
    const id = editId;
    const updateData = {
        userName: event.target.user_name.value,
        phone: event.target.mob_number.value,
        email: event.target.email.value,
    };
    try {
        const response = await axios.patch(`http://localhost:4000/update/${id}`, updateData);
        alert('Data Updated Successfully');

        // Update the text node within the existing list item
        if (editElement) {
            const textNode = editElement.firstChild; // Assumes the first child is the text node
            textNode.nodeValue = `${response.data.userName} - ${response.data.phone} - ${response.data.email}`;

            // Update event listeners on existing buttons
            const [deleteBtn, editBtn] = editElement.querySelectorAll('button');
            deleteBtn.onclick = () => deleteAppointment(response.data.id, editElement);
            editBtn.onclick = () => editForm(response.data, editElement);
        }

        editMode = false;
        editId = null;
        editElement = null;
        event.target.reset();
        document.querySelector('button[type="submit"]').innerText = 'Submit';
    } catch (error) {
        console.log(error);
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await axios.get('http://localhost:4000/data');
        response.data.forEach(appointment => {
            displayAppointments(appointment);
        });
    } catch (err) {
        console.log(err);
    }
});