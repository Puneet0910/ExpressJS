const expense = require('../models/expense');

exports.saveExpense = async(req,res,next)=>{
    const {title, amount,description, category} = req.body;
    try {
        const newExpense = await expense.create({
            title:title,
            amount:amount,
            description:description,
            category:category,
        });
        res.status(201).send(newExpense);
    } catch (error) {
        console.log(error);
    };
};

exports.getData = async (req,res,next)=>{
    try {
        const response = await expense.findAll();
        res.send(response);
    } catch (error) {
        console.log(error);
        
    }
}
exports.deleteData = async (req,res,next)=>{
    const id = req.params.id;
    try {
        const result = await expense.destroy({where:{id:id}});
        if(result){
            res.status(200).send({message:'Data Removed'});
        }
        else{
            res.status(404).send({message:'Deletion failed'});
        }
    } catch (error) {
        console.log(error);
        
    }
}

exports.updateData = async (req,res,next)=>{
    const id = req.params.id;
    const {title,amount,description,category} = req.body;

    try {
        const result= await expense.update({title,amount,description,category}, {where:{id:id}});

        if(result){
            const updateData = await expense.findByPk(id);
            res.status(200).send(updateData);
        }
        else{
            res.status(200).send({message:"Updation failed"});
        }

    } catch (error) {
        console.log(error);
        
    }
}