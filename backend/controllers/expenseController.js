const Expense = require ('../models/Expense');

const addExpense = async (req,res)=>{
    const {title , amount , category , date} = req.body;

    try {
        const expense =  new Expense({
            user : req.user._id,
            title,
            amount,
            category,
            date
        });

        const savedExpense =  await expense.save();
        res.status(201).json(savedExpense);

    }
    catch(error){
        res.status(500).json({message: error.message});
    }
};


const getExpense = async (req,res)=>{
    try{
        const expenses = await Expense.find({user: req.user._id}).sort({date:-1});
        res.status(200).json(expenses);
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
};


const deleteExpense = async (req,res)=>{
    try{
        const expense = await Expense.findById(req.params.id);
        if(!expense)  return res.status(404).json({message: "Expense not found!"});

        if(expense.user.toString() != req.user._id.toString()){
            return res.status(401).json({ message: "Not authorized !" });
        }

        await expense.deleteOne();
        res.status(200).json({message: "Expense Remover Successsfully!"});
    }

    catch(error){
        res.status(500).json({message: error.message});
    }
};

module.exports= {addExpense, getExpense, deleteExpense};