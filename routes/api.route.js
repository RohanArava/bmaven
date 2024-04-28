const express = require("express")
const router = express.Router()

router.get('/users', (req, res)=>{});
router.get('/user/collections/:userId', (req, res)=>{});
router.get('/user/history/:userId', (req, res)=>{});
router.get('/user/orders/:userId', (req, res)=>{});
router.get('/user/:id', (req, res)=>{});
router.get('/collections', (req, res)=>{});
router.get('/collection/:collectionId', (req, res)=>{});
router.get('/history/:historyId', (req, res)=>{});
router.get('/notifications/from/:fromId', (req, res)=>{});
router.get('/notifications/from/:toId', (req, res)=>{});
router.get('/orders', (req, res)=>{});
router.get('/order/:orderId', (req, res)=>{});
router.get('/reports', (req, res)=>{});
router.get('/vendors', (req, res)=>{});
router.get('/vendor/orders/:vendorId', (req, res)=>{});
router.get('/vendor/services/:vendorId', (req, res)=>{});
router.get('/vendor/:vendorId', (req, res)=>{});
router.get('/services', (req, res)=>{});
router.get('/service/:serviceId', (req, res)=>{});
router.get('/service/orders/:serviceId', (req, res)=>{});
router.get('/reviews', (req, res)=>{});
router.get('/review/:reviewId', (req, res)=>{});
router.get('/review/from/:fromId', (req, res)=>{});
router.get('/review/to/:toId', (req, res)=>{});


router.post('/user', (req, res)=>{});
router.post('user/collection/service/:collectionId/:serviceId', (req, res)=>{});
router.post('/user/collection/:userId', (req, res)=>{});
router.post('/user/history/:userId', (req, res)=>{});
router.post('/notification', (req, res)=>{});
router.post('/order', (req, res)=>{});
router.post('/review', (req, res)=>{});
router.post('/vendor', (req, res)=>{});
router.post('/vendor/service/:serviceId', (req, res)=>{});
router.post('review', (req, res)=>{});


router.put('/user', (req, res)=> {});
router.put('/vendor', (req, res)=>{});
router.put('/service/:serviceId', (req, res)=>{});


router.delete('/user/:userId', (req, res)=>{});
router.delete('/user/:userId/collection/:userId/:collectionId', (req, res)=>{});
router.delete('/user/collection/service/:userId/:collectionId/:serviceId', (req, res)=>{});
router.delete('/vendor/:vendorId', (req, res)=>{});
router.delete('/service/:serviceId', (req, res)=>{});
router.delete('/order/:orderId', (req, res)=>{});
router.delete('/review/:reviewId', (req, res)=>{});

module.exports = {router}