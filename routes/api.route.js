const express = require("express")
const router = express.Router()
const { Rating } = require("../models/userrating.model.js")
const { User } = require("../models/user.model.js")
const { Collection } = require("../models/collection.model.js")
const { History } = require("../models/history.model.js")
const { Service } = require("../models/venderservices.model.js")
const { Vendor } = require("../models/vendor.model.js")
const { Order } = require("../models/order.model.js")
const { View } = require("../models/view.model.js")
const { ServiceReport } = require("../models/servicereport.model.js")
const { Notification } = require("../models/notification.model.js")
const { createClient } = require("redis");
let redisClient = undefined;
createClient({
    password: 'J5PEL3zxZPAfecNWmtraeathLuLKqwqo',
    socket: {
        host: 'redis-13798.c17.us-east-1-4.ec2.redns.redis-cloud.com',
        port: 13798
    }
}).on('error', err => console.log('Redis Client Error', err))
    .connect().then((client) => {
        console.log("Redis client connected")
        redisClient = client
    });
router.get('/users', async (req, res, next) => {
    try {
        let users = await User.find({}, { _id: 1, email: 1, userId: 1 });
        res.status(200).send({ users });
    } catch (err) {
        res.status(500).send({ message: "Internal Server Error" });
    }
});

router.get('/user/collections/:userId', async (req, res, next) => {
    try {
        let collections = await Collection.find({ user: req.params.userId }, { _id: 1, name: 1 });
        if (!collections || collections.length === 0) {
            res.status(404).send("Couldn't find collections");
        } else {
            res.status(200).send({ collections })
        }
    } catch (err) {
        res.status(500).send({ message: "Internal Server Error" });
    }
});

router.get('/user/orders/:userId', async (req, res, next) => {
    try {
        let orders = await Order.find({ user: req.params.userId }, { _id: 1, item: 1, count: 1 });
        if (!orders || orders.length === 0) {
            return res.status(404).send({ message: 'Order not found' });
        } else {
            return res.status(200).send({ orders });
        }
    } catch (err) {
        res.status(500).send({ message: "Internal Server Error" });
    }
});
router.get('/user/:id', async (req, res, next) => {
    try {
        let user = await User.findById(req.params.id, { password: 0 });
        if (user) {
            res.status(200).send({ user });
        } else {
            res.status(404).send({ message: "User not found" });
        }
    } catch (err) {
        res.status(500).send({ message: "Internal Server Error" })
    }
});
router.get('/collections', async (req, res, next) => {
    try {
        let collections = await Collection.find({}, { _id: 1, name: 1 });
        res.status(200).send({ collections });
    } catch (err) {
        res.status(500).send({ message: "Internal Server Error" });
    }

});
router.get('/collection/:collectionId', async (req, res, next) => {
    try {
        let collection = await Collection.findById(req.params.collectionId);
        if (collection) {
            res.status(200).send({ collection });
        } else {
            res.status(404).send({ message: 'Collection not found' });
        }
    } catch (err) {
        res.status(500).send({ message: "Internal Server Error" });
    }
});
// router.get('/notifications/from/:fromId', async (req, res, next) => {
//     try{
//         let notifications = await Notification.find({from: req.params.fromId});
//         if(!notifications || notifications.length===0){
//             res.status(404).send({message: "Couldn't find notifications"});
//         }else{
//             res.status(200).send({notifications});
//         }
//     }catch(err){
//         res.errmsg = "Internal Server Error";
// next(err);
//     }
// });
// router.get('/notifications/to/:toId', async (req, res, next) => {
//     try{
//         let notifications = await Notification.find({to: req.params.toId});
//         if(!notifications || notifications.length===0){
//             res.status(404).send({message: "Couldn't find notifications"});
//         }else{
//             res.status(200).send({notifications});
//         }
//     }catch(err){
//         res.errmsg = "Internal Server Error";
// next(err);
//     }
// });
router.get('/orders', async (req, res, next) => {
    try {
        let orders = await Order.find({}, { _id: 1, item: 1 });
        res.status(200).send({ orders });
    } catch (err) {
        res.status(500).send({ message: "Internal Server Error" });
    }

});
router.get('/order/:orderId', async (req, res, next) => {
    try {
        let order = await Order.findById(req.params.orderId);
        if (order) {
            res.status(200).send({ order });
        } else {
            res.status(404).send({ message: "Couldn't find order" });
        }
    } catch (err) {
        res.send({ message: "Internal Server Error" });
    }
});
router.get('/vendors', async (req, res, next) => {
    try {
        let vendors = await Vendor.find({}, { _id: 1, email: 1, vendorName: 1 });
        res.status(200).send({ vendors });
    } catch (err) {
        res.status(500).send({ message: "Internal Server Error" });
    }
});
router.get('/vendor/orders/:vendorId', async (req, res, next) => {
    try {
        let orders = await Order.find({ vendor: req.params.vendorId }, { _id: 1, item: 1, count: 1 });
        if (!orders || orders.length === 0) {
            return res.status(404).send({ message: 'Order not found' });
        } else {
            return res.status(200).send({ orders });
        }
    } catch (err) {
        res.status(500).send({ message: "Internal Server Error" });
    }
});
router.get('/vendor/services/:vendorId', async (req, res, next) => {
    try {
        let services = await Service.find({ business: req.params.vendorId });
        if (!services || services.length === 0) {
            req.status(404).send({ message: 'Could not find services' });
        } else {
            req.status(200).send({ services });
        }
    } catch (err) {
        res.status(500).send({ message: "Internal Server Error" });
    }
});
router.get('/vendor/:vendorId', async (req, res, next) => {
    try {
        let vendor = await Vendor.findById(req.params.vendorId);
        if (!vendor) {
            res.status(404).send({ message: "Couldn't find vendor" });
        } else {
            res.status(200).send({ vendor });
        }
    } catch (err) {
        res.status(500).send({ message: "Internal Server Error" });
    }
});
router.get('/services', async (req, res, next) => {
    try {
        let services = Service.find({}, { _id: 1, name: 1 });
        res.status(200).send({ services });
    } catch (err) {
        res.status(500).send({ message: "Internal Server Error" });
    }
});
router.get('/service/:serviceId', async (req, res, next) => {
    try {
        let service = await Service.findById(req.params.serviceId);
        if (!service) { res.status(404).send({ message: "Service not found" }); }
        else {
            res.status(200).send({ service });
        }
    } catch (err) {
        res.status(500).send({ message: "Internal Server Error" });
    }
});
router.get('/service/orders/:serviceId', async (req, res, next) => {
    try {
        let orders = await Order.find({ item: req.params.serviceId }, { _id: 1, item: 1, date: 1 });
        if (!orders || orders.length === 0) {
            return res.status(404).send({ message: 'Order not found' });
        } else {
            return res.status(200).send({ orders });
        }
    } catch (err) {
        res.status(500).send({ message: "Internal Server Error" });
    }
});
router.get('/reviews', async (req, res, next) => {
    try {
        let reviews = await Rating.find({}, { _id: 1, service: 1 });
        res.status(200).send({ reviews });
    } catch (err) {
        res.errmsg = "Internal Server Error";
        next(err);
    }
});
router.get('/review/:reviewId', async (req, res, next) => {
    try {
        let review = await Rating.findById(req.params.reviewId);
        if (!review) {
            res.status(404).send({ message: "Internal Server Error" });
        } else {
            res.status(200).send({ review });
        }
    } catch (err) {
        res.errmsg = "Internal Server Error";
        next(err);
    }
});
router.get('/reviews/from/:fromId', async (req, res, next) => {
    try {
        let reviews = await Rating.find({ user: req.params.fromId });
        if (!reviews || reviews.length === 0) {
            res.status(404).send({ message: "Could not find reviews" });
        } else {
            res.status(200).send({ reviews });
        }
    } catch (err) {
        res.errmsg = "Internal Server Error";
        next(err);
    }
});
router.get('/reviews/to/:toId', async (req, res, next) => {
    try {
        let reviews = await Rating.find({ service: req.params.toId });
        if (!reviews || reviews.length === 0) {
            res.status(404).send({ message: "Could not find reviews" });
        } else {
            res.status(200).send({ reviews });
        }
    } catch (err) {
        res.errmsg = "Internal Server Error";
        next(err);
    }
});
router.get("/search", async (req, res, next) => {
    try {
        let term = req.query.term || "";
        console.log(term)
        if (term !== "") {
            let resJSON = await redisClient.get(term);
            if (resJSON) {
                console.log("in redis:", resJSON)
                let services = JSON.parse(resJSON)
                if (services.length === 0) {
                    console.log("length 0")
                    services = await Service.find({ $text: { $search: term } }).sort({ score: { $meta: 'textScore' } });
                    if (services.length !== 0)
                        await redisClient.set(term, JSON.stringify(services));
                    res.status(200).send({ services: services || [] })
                    return;
                }
                res.status(200).send({ services: services || [] });
                return;
            } else {
                console.log("Not found in redis:", term, ":", resJSON)
            }
        }
        let services = await Service.find({ $text: { $search: term } }).sort({ score: { $meta: 'textScore' } });
        if (services.length !== 0)
            await redisClient.set(term, JSON.stringify(services));
        res.status(200).send({ services: services || [] })
    } catch (err) {
        res.errmsg = "Internal Server Error";
        next(err);
    }
});

router.post('/user', async (req, res, next) => {
    try {
        const newUserObj = {
            email: req.body.email,
            password: req.body.password,
            userId: req.body.userId,
        };
        console.log(newUserObj);
        let userid = await User.findOne({
            userId: newUserObj.userId
        });
        if (userid) {
            res.status(500).json({ message: "This userId already exists" })
            return;
        }

        let usere = await User.findOne({ email: newUserObj.email });
        if (usere) {
            res.status(500).send({ message: "This email already exists" })
            return;
        }
        const newUser = new User(newUserObj);
        let user = await newUser.save();
        res.status(200).send({ user });
    } catch (err) {
        res.errmsg = "Internal Server Error";
        next(err);
    }
});

router.post('/user/collection/service/:collectionId/:serviceId', async (req, res, next) => {
    try {
      const { collectionId, serviceId } = req.params;
  
      // Find the collection document by _id
      const collection = await Collection.findById(collectionId);
  
      // If the collection doesn't exist, return a 404 error
      if (!collection) {
        return res.status(404).json({ message: 'Collection not found' });
      }
  
      // Find the service document by _id
      const service = await Service.findById(serviceId);
  
      // If the service doesn't exist, return a 404 error
      if (!service) {
        return res.status(404).json({ message: 'Service not found' });
      }
  
      // Check if the service is already in the collection
      const serviceExists = collection.items.some(item => item.id.equals(serviceId));
  
      if (serviceExists) {
        return res.status(400).json({ message: 'Service already exists in the collection' });
      }
  
      // Add the service to the collection
      collection.items.push({ service });
  
      // Save the updated collection document
      await collection.save();
  
      // Send a success response
      res.status(200).json({ message: 'Service added to the collection successfully' });
    } catch (error) {
      // Handle any errors that occurred
      next(error);
    }
  });
  router.post('/user/collection/:userId', async (req, res, next) => {
    try {
      const userId = req.params.userId;
      const { name } = req.body;
  
      // Find the user document by _id
      const user = await User.findById(userId);
  
      // If the user doesn't exist, return a 404 error
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Create a new collection document
      const newCollection = new Collection({
        name,
        user: userId,
        items: [],
      });
  
      // Save the new collection document
      await newCollection.save();
  
      // Send a success response
      res.status(201).json({ message: 'Collection created successfully', collection: newCollection });
    } catch (error) {
      // Handle any errors that occurred
      next(error);
    }
  });
  router.post('/notification', async (req, res, next) => {
    try {
      const { from_type, to_type, from, to, description, title } = req.body;
  
      // Create a new notification document
      const newNotification = new Notification({
        from_type,
        to_type,
        from,
        to,
        description,
        title,
      });
  
      // Save the new notification document
      await newNotification.save();
  
      // Send a success response
      res.status(201).json({ message: 'Notification created successfully', notification: newNotification });
    } catch (error) {
      // Handle any errors that occurred
      next(error);
    }
  });
 
  router.post('/order', async (req, res, next) => {
    try {
      const { userId, serviceId, vendorId, count } = req.body;
  
      // Find the user document by _id
      const user = await User.findById(userId);
  
      // If the user doesn't exist, return a 404 error
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Find the service document by _id
      const service = await Service.findById(serviceId);
  
      // If the service doesn't exist, return a 404 error
      if (!service) {
        return res.status(404).json({ message: 'Service not found' });
      }
  
      // Find the vendor document by _id
      const vendor = await Vendor.findById(vendorId);
  
      // If the vendor doesn't exist, return a 404 error
      if (!vendor) {
        return res.status(404).json({ message: 'Vendor not found' });
      }
  
      // Create a new order document
      const newOrder = new Order({
        user: userId,
        date: Date.now(),
        accepted: false,
        rejected: false,
        item: serviceId,
        count,
        vendor: vendorId,
      });
  
      // Save the new order document
      await newOrder.save();
  
      // Send a success response
      res.status(201).json({ message: 'Order created successfully', order: newOrder });
    } catch (error) {
      // Handle any errors that occurred
      next(error);
    }
  });

  
  router.post('/review', async (req, res, next) => {
    try {
      const { userId, serviceId, review, rating } = req.body;
  
      // Find the user document by _id
      const user = await User.findById(userId);
  
      // If the user doesn't exist, return a 404 error
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Find the service document by _id
      const service = await Service.findById(serviceId);
  
      // If the service doesn't exist, return a 404 error
      if (!service) {
        return res.status(404).json({ message: 'Service not found' });
      }
  
      // Create a new rating document
      const newRating = new Rating({
        user: userId,
        service: serviceId,
        review,
        rating,
      });
  
      // Save the new rating document
      await newRating.save();
  
      // Send a success response
      res.status(201).json({ message: 'Rating created successfully', rating: newRating });
    } catch (error) {
      // Handle any errors that occurred
      next(error);
    }
  });
  router.post('/vendor', async (req, res, next) => {
    try {
      // Extract vendor data from request body
      const { email, password, vendorName } = req.body;
  
      // Validate data (optional)
      // You can add checks here to ensure required fields are present and in the expected format
  
      // Create a new vendor instance
      const newVendor = new Vendor({ email, password, vendorName });
  
      // Save the vendor to the database
      const savedVendor = await newVendor.save();
  
      // Respond with success message and potentially the saved vendor data (without password)
      res.status(201).json({ message: 'Vendor created successfully!', vendor: { email, vendorName } }); // Omit password
    } catch (err) {
      console.error(err);
      // Handle errors appropriately (e.g., validation errors, conflicts)
      res.status(500).json({ message: 'Error creating vendor' });
    }
  });
  router.post('/vendor/service/:vendorId', async (req, res, next) => {
    try {
      // Extract vendor ID and service data from request
      const vendorId = req.params.vendorId;
      const { name, desc, image, ppp, pdesc } = req.body;
  
      // Validate data (optional)
      // You can add checks here to ensure required fields are present and in the expected format
  
      // Create a new service instance
      const newService = new Service({
        name,
        desc,
        business: vendorId, // Set the vendor reference using the vendorId param
        image,
        ppp,
        pdesc,
      });
  
      // Save the service to the database
      const savedService = await newService.save();
  
      // Respond with success message and potentially the saved service data
      res.status(201).json({ message: 'Service created successfully!', service: savedService });
    } catch (err) {
      console.error(err);
      // Handle errors appropriately (e.g., validation errors, conflicts)
      res.status(500).json({ message: 'Error creating service' });
    }
  });
  router.post('/review', async (req, res, next) => {
    try {
      // Extract user ID, service ID, and review data from request body
      const { userId, serviceId, review, rating } = req.body;
  
      // Validate data (optional)
      // You can add checks here to ensure required fields are present and in the expected format
  
      // Create a new rating instance
      const newRating = new Rating({
        user: userId,
        service: serviceId,
        review,
        rating,
      });
  
      // Save the rating to the database
      const savedRating = await newRating.save();
  
      // Respond with success message and potentially the saved rating data
      res.status(201).json({ message: 'Review submitted successfully!', rating: savedRating });
    } catch (err) {
      console.error(err);
      // Handle errors appropriately (e.g., validation errors, conflicts)
      res.status(500).json({ message: 'Error submitting review' });
    }
  });



router.delete('/user/:userId', async (req, res, next) => {
  try {
    const userId = req.params.userId;

    // Find the user document by userId
    const user = await User.findOne({ userId });

    // If the user doesn't exist, return a 404 error
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Remove the user document from the database
    await user.remove();

    // Send a success response
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    // Handle any errors that occurred
    next(error);
  }
});
router.delete('/user/:userId/collection/:userId/:collectionId', async (req, res, next) => {
    
 });
router.delete('/user/collection/service/:userId/:collectionId/:serviceId', async (req, res, next) => {
 });
router.delete('/vendor/:vendorId', async (req, res, next) => {
    try {
      const vendorId = req.params.vendorId;
  
      // Find the vendor document by _id
      const vendor = await Vendor.findById(vendorId);
  
      // If the vendor doesn't exist, return a 404 error
      if (!vendor) {
        return res.status(404).json({ message: 'Vendor not found' });
      }
  
      // Remove the vendor document from the database
      await vendor.remove();
  
      // Send a success response
      res.status(200).json({ message: 'Vendor deleted successfully' });
    } catch (error) {
      // Handle any errors that occurred
      next(error);
    }
  });

  router.delete('/service/:serviceId', async (req, res, next) => {
    try {
      const serviceId = req.params.serviceId;
  
      // Find the service document by _id
      const service = await Service.findById(serviceId);
  
      // If the service doesn't exist, return a 404 error
      if (!service) {
        return res.status(404).json({ message: 'Service not found' });
      }
  
      // Remove the service document from the database
      await service.remove();
  
      // Send a success response
      res.status(200).json({ message: 'Service deleted successfully' });
    } catch (error) {
      // Handle any errors that occurred
      next(error);
    }
  });

  router.delete('/order/:orderId', async (req, res, next) => {
    try {
      const orderId = req.params.orderId;
  
      // Find the order document by _id
      const order = await Order.findById(orderId);
  
      // If the order doesn't exist, return a 404 error
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
  
      // Remove the order document from the database
      await order.remove();
  
      // Send a success response
      res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
      // Handle any errors that occurred
      next(error);
    }
  });
// router.delete('/review/:reviewId', async (req, res, next) => { });


// router.post('user/collection/service/:collectionId/:serviceId', async (req, res, next) => { });
// router.post('/user/collection/:userId', async (req, res, next) => { });
// router.post('/notification', async (req, res, next) => { });
// router.post('/order', async (req, res, next) => { });
// router.post('/review', async (req, res, next) => { });
// router.post('/vendor', async (req, res, next) => { });
// router.post('/vendor/service/:vendorId', async (req, res, next) => { });
// router.post('review', async (req, res, next) => { });


// router.put('/user', async (req, res, next) => { });
// router.put('/vendor', async (req, res, next) => { });
// router.put('/service/:serviceId', async (req, res, next) => { });


// router.delete('/user/:userId', async (req, res, next) => { });
// router.delete('/user/:userId/collection/:userId/:collectionId', async (req, res, next) => { });
// router.delete('/user/collection/service/:userId/:collectionId/:serviceId', async (req, res, next) => { });
// router.delete('/vendor/:vendorId', async (req, res, next) => { });
// router.delete('/service/:serviceId', async (req, res, next) => { });
// router.delete('/order/:orderId', async (req, res, next) => { });
// router.delete('/review/:reviewId', async (req, res, next) => { });

module.exports = { router }