let editElement = null;
let editId = null;
async function handleFormData(event) {
    event.preventDefault();
    const expenseInfo = {
        title: event.target.ExpenseTitle.value,
        amount: event.target.amount.value,
        description: event.target.description.value,
        category: event.target.category.value,
    }
    try {
        const response = await axios.post("http://localhost:4000/submit", expenseInfo);
        alert("Expense Details Addes Successfully");
        displayExpenses(response.data);
        event.target.reset();
    } catch (error) {
        console.log(error);
    };
};

function displayExpenses(expenseInfo){
    const expenses = document.querySelector("ul");
    const expenseList = document.createElement("li");
    expenseList.appendChild(document.createTextNode(`
    ${expenseInfo.title}-${expenseInfo.category}-${expenseInfo.description}-${expenseInfo.amount}
    `));

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = ("Delete");
    const editBtn = document.createElement("button");
    editBtn.innerText=('Edit');

    expenses.appendChild(expenseList);
    expenseList.appendChild(deleteBtn);
    expenseList.appendChild(editBtn);

    deleteBtn.addEventListener("click", ()=>deleteExpense(expenseInfo.id, expenseList));

    editBtn.addEventListener('click', ()=> editExpense(expenseInfo, expenseList));
}

async function deleteExpense(id, expenseList){
    try {
        await axios.delete(`http://localhost:4000/delete/${id}`);
        expenseList.remove();
        alert("Expense Removed Successfully");
    } catch (error) {
        console.log(error);
        
    }
};

function editExpense(expenseInfo, expenseList){
    const form = document.querySelector('form');
    form.onsubmit = (event)=> updateFormData(event);
    form.ExpenseTitle.value = expenseInfo.title;
    form.amount.value = expenseInfo.amount;
    form.description.value = expenseInfo.description;
    form.category.value = expenseInfo.category;

    const submitBtn = document.querySelector('button[type="submit"]');
    submitBtn.innerText = "Update";

    editElement = expenseList;
    editId = expenseInfo.id;
}

async function  updateFormData(event) {
    event.preventDefault();
    const id = editId;
    const updateData = {
        title : event.target.ExpenseTitle.value,
        amount:event.target.amount.value,
        description:event.target.description.value,
        category:event.target.category.value,
    }
    try {
        const response = await axios.patch(`http://localhost:4000/update/${id}`, updateData);
        alert("data update successfully");
        if (editElement) {
            const textNode = editElement.firstChild; 
            textNode.nodeValue = `${response.data.title} - ${response.data.amount} - ${response.data.description}- ${response.data.category}`;

            const [deleteBtn, editBtn] = editElement.querySelectorAll('button');
            deleteBtn.onclick = () => deleteExpense(response.data.id, editElement);
            editBtn.onclick = () => editExpense(response.data, editElement);
        }
        editId = null;
        editElement = null;
        event.target.reset();
        document.querySelector('button[type="submit"]').innerText = 'Submit';
    } catch (error) {
        console.log(error);  
    }
}

document.addEventListener("DOMContentLoaded", async()=>{
    try {
        const response = await axios.get('http://localhost:4000/getData');
        response.data.forEach(expense =>{
            displayExpenses(expense);
        })
    } catch (error) {
        console.log(error);
        
    }
})