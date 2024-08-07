const express = require('express');

const router = express.Router();

const appointment=require('../controller/appointment');

router.post('/submit', appointment.addAppointmentData);

router.get('/data', appointment.getData);

router.delete('/delete/:id', appointment.deleteData);

router.patch('/update/:id', appointment.updateData);

module.exports = router;