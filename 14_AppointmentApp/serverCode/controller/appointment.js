const appointment = require('../models/saveData');

exports.addAppointmentData = async (req, res, next) => {
    const { userName, phone, email } = req.body;
    try {
        const newAppointment = await appointment.create({
            userName: userName,
            phone: phone,
            email: email,
        });
        res.status(201).send(newAppointment); // Send the created appointment data back
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Failed to add appointment' });
    }
};


exports.getData = async (req,res,next)=>{
    try {
        const appointments = await appointment.findAll();
        res.send(appointments);
    } catch (error) {
        console.log(error);
    }
}
exports.deleteData = async (req, res, next) => {
    const id = req.params.id;
    try {
        const result = await appointment.destroy({ where: { id: id } });
        if (result) {
            res.status(200).send({ message: 'Appointment deleted successfully!' });
        } else {
            res.status(404).send({ message: 'Appointment not found' });
        }
    } catch (error) {
        console.log(error);
    }
}

exports.updateData = async (req, res, next) => {
    let id = req.params.id;
    const { userName, phone, email } = req.body;
    try {
        const result = await appointment.update({ userName, email, phone }, { where: { id: id }, returning: true, plain: true });
        if (result) {
            const updatedAppointment = await appointment.findByPk(id);
            res.status(200).send(updatedAppointment);
        } else {
            res.status(404).send({ message: 'Appointment not found' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Failed to update appointment' });
    }
};