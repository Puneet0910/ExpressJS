const express = require('express');
const expense = require('../controller/expenses');
const router = express.Router();

router.get('/getData', expense.getData);
router.post('/submit', expense.saveExpense);
router.delete('/delete/:id', expense.deleteData);
router.patch('/update/:id', expense.updateData);

module.exports = router;