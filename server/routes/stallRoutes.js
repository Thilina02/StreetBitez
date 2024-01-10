const express = require('express');
const router = express.Router();
const cors = require('cors');
const {
  stallreq,
  stalladminreq,
  deleteStallreq,
  createStall,
  Stalllogin,
  StallOwnerDashboard,
  createProduct,
  getProduct,
  deleteProduct,
  updateProduct, 
  createdStall,
  createdStalls,
  createPromotion,
  getPromotion,
  createTicket,
  getTicket,
  getRegStallByStallId,
  updateStallIssueById,getStall,getAllStall,deleteStall,addSuccessDetails,getAllPayments,updateStallStatusSuccess,getIssuedStalls} = require('../controllers/stallController');


  const upload = require('../multerConfig');
//middleware
router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:5173'
    })
)
router.post('/stallreq', stallreq);
router.get('/stalladminreq', stalladminreq);
router.delete('/deleteStallreq/:id', deleteStallreq);
router.post('/createStall', createStall);
router.post('/Stalllogin', Stalllogin);
router.get('/StallOwnerDashboard', StallOwnerDashboard);
router.post('/createProduct', createProduct);
router.get('/getProduct', getProduct);
router.delete('/deleteProduct/:id', deleteProduct);
router.put('/update/:id', updateProduct);
router.get('/getProduct/:id', getProduct);
router.get('/createdStall', createdStall);
router.get('/createdStalls', createdStalls);
router.post('/createPromotion', upload.single('image'), createPromotion);
router.get('/getPromotion', getPromotion);
router.post('/createTicket', createTicket);
router.get('/getTicket', getTicket);
router.get('/getStallByStallId:stallid',getRegStallByStallId);
router.post('/updateStallById:id',updateStallIssueById);
router.get('/getIssuedStalls',getIssuedStalls);





router.get('/fetchStall/:id', getStall);
router.get('/getAllStall', getAllStall);
router.delete('/deleteStall/:id', deleteStall);
router.post('/Psuccess', addSuccessDetails);
router.get('/getAllSuccess', getAllPayments);
router.put('/updateStallSuccess/:id', updateStallStatusSuccess);


module.exports = router