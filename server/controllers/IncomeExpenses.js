const IncOut = require('../models/IncomeAndExpenses');

const addNew = async (req, res) => {
  const { inputTypeOne, inputTypeTwo, inputTypeThree , inputTypeFour,} = req.body;

  try {
    const incomeOutcome = await IncOut.create({
      inputTypeOne,
      inputTypeTwo,
      inputTypeThree,
      inputTypeFour,
    });

    res.json(incomeOutcome);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add new input' });
  }
};

const getAllIncomeDetails = async (req, res) => {
  try {
    const incomeDetails = await IncOut.find();

    res.json(incomeDetails); // Return the income details as JSON response
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error retrieving income details' });
  }
};

const deleteIncomeById = async (req, res) => {
  try {
    const { id } = req.params;

    // Use Mongoose to delete the income by ID
    const deletedIncome = await IncOut.findByIdAndDelete(id);

    if (!deletedIncome) {
      return res.status(404).json({ message: 'Income not found' });
    }

    res.sendStatus(204); // Send a successful response with status code 204 (No Content) for successful deletion.
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateIncomeById = async (req, res) => {
  try {
    const { id } = req.params; // Get the ID from the request parameters
    const { inputTypeOne, inputTypeTwo, inputTypeThree,inputTypeFour } = req.body; // Get the updated data from the request body

    // Use Mongoose to find the income by ID and update it
    const updatedIncome = await IncOut.findByIdAndUpdate(
      id,
      {
        inputTypeOne,
        inputTypeTwo,
        inputTypeThree,
        inputTypeFour,
      },
      { new: true } // To return the updated document
    );

    if (!updatedIncome) {
      return res.status(404).json({ message: 'Income not found' });
    }

    res.json(updatedIncome); // Return the updated income details as JSON response
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};



module.exports = {
  addNew,
  getAllIncomeDetails,
  deleteIncomeById,
  updateIncomeById,
};
