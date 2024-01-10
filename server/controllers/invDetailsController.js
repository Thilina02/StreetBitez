const InvDetails =require('../models/invDetails');
const Inventory =require('../models/inventory');

const addStock=async(req,res) =>{
    const{date,supplier,quantity,price,itemcode}=req.body;

    const invDetails=await InvDetails.create({
        date,
        supplier,
        quantity,
        price,
        itemcode
    })
    const inventory= await Inventory.find({ itemcode: itemcode })
    console.log(inventory)
    inventory[0].quantity=inventory[0].quantity+parseInt(quantity, 10);
    console.log(inventory)

    const inventoryUpdate= await Inventory.findByIdAndUpdate(
        inventory[0]._id,inventory[0]
        
            
        
    )
console.log(inventoryUpdate)



    return res.json(invDetails)
}
const getAllItemDetails = async (req, res) => {
    try {
        const { itemcode } = req.params; // Assuming the item code is passed as a parameter in the URL
        console.log(itemcode)
    const items = await InvDetails.find({ itemcode: itemcode });
     
      res.json(items);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error fetching item details' });
    }
  };
  //get all inventory details
const getAllinv = async (req, res) => {
    try {
      const item = await InvDetails.find();
      res.json(item);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error fetching inventory items' });
    }
  };
module.exports ={
    addStock,
    getAllItemDetails,
    getAllinv,
}