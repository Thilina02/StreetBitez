const IssuedDetails =require('../models/issued');
const Inventory =require('../models/inventory');


const issueEntry=async(req,res) =>{
    const{date,itemName,quantity,price,itemCode,stoleid}=req.body;

    const issuedDetails=await IssuedDetails.create({
        date,
        itemName,
        quantity,
        price,
        itemCode,
        stoleid
    })
    console.log(itemCode)
        
    const inventory= await Inventory.find({ itemcode: itemCode })
    console.log(inventory)
    inventory[0].quantity=inventory[0].quantity-parseInt(quantity, 10);
    console.log(inventory)
    
    const inventoryUpdate= await Inventory.findByIdAndUpdate(
      inventory[0]._id,inventory[0]
    )
    return res.json(issuedDetails)
}
 const getIssuedDetails = async (req, res) => {
    try {
        const { stoleid } = req.params; // Assuming the item code is passed as a parameter in the URL
        console.log(stoleid)
    const issued = await IssuedDetails.find({ stoleid: stoleid });
     
      res.json(issued);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error fetching issued details' });
    }
  }; 
module.exports ={
    issueEntry,
    getIssuedDetails
}