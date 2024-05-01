import { assert } from 'chai';
import { listner } from "./server.js"
import { after, before } from 'mocha';
import fetch from 'node-fetch';
import { User } from './models/user.model.js';
describe("Tests", () => {
    it("should have NODE_ENV==test", () => {
        assert.strictEqual(process.env.NODE_ENV, "test");
    })

    it("should fetch a new user", async () => {
        let res_g = await fetch(`http://localhost:${process.env.SERVER_PORT}/rest/user/66326a12fcd8148e81fe0f76`);
        let user_g = await res_g.json()
        console.log(user_g);
        assert.strictEqual(res_g.status, 200);
    })

    it("should fetch all users", async ()=>{
        let res_p = await fetch(`http://localhost:${process.env.SERVER_PORT}/rest/users`);
        let users_p = await res_p.json();
        console.log(users_p);
        assert.strictEqual(res_p.status, 200);
        assert.isArray(users_p.users);
        assert.strictEqual(users_p.users.length, 1);
    });

    it("should fetch all vendors", async ()=>{
        let res_p = await fetch(`http://localhost:${process.env.SERVER_PORT}/rest/vendors`);
        let users_p = await res_p.json();
        console.log(users_p);
        assert.strictEqual(res_p.status, 200);
        assert.isArray(users_p.vendors);
        assert.strictEqual(users_p.vendors.length, 1);
    })

    it("should search for services", async()=>{
        let res_p = await fetch(`http://localhost:${process.env.SERVER_PORT}/rest/search?term=test`);
        let users_p = await res_p.json();
        console.log(users_p);
        assert.strictEqual(res_p.status, 200);
        assert.isArray(users_p.services);
        assert.strictEqual(users_p.services.length, 1);
    })

    it("should get all collections", async ()=>{
        let res_p = await fetch(`http://localhost:${process.env.SERVER_PORT}/rest/collections`);
        let users_p = await res_p.json();
        console.log(users_p);
        assert.strictEqual(res_p.status, 200);
        assert.isArray(users_p.collections);
        assert.strictEqual(users_p.collections.length, 1);
    })

    it("should get user collections", async ()=>{
        let res_p = await fetch(`http://localhost:${process.env.SERVER_PORT}/rest/user/collections/66326a12fcd8148e81fe0f76`);
        let users_p = await res_p.json();
        console.log(users_p);
        assert.strictEqual(res_p.status, 200);
        assert.isArray(users_p.collections);
        assert.strictEqual(users_p.collections.length, 1);
    })

    it("should get a specific collection", async ()=>{
        let res_p = await fetch(`http://localhost:${process.env.SERVER_PORT}/rest/collection/66326cdd9bf560e0dbe77d5d`);
        let users_p = await res_p.json();
        console.log(users_p);
        assert.strictEqual(res_p.status, 200);
        assert.isArray(users_p.collection.items);
        assert.strictEqual(users_p.collection.items.length, 1);
    })

    it("should get user orders", async ()=>{
        let res_p = await fetch(`http://localhost:${process.env.SERVER_PORT}/rest/user/orders/66326a12fcd8148e81fe0f76`);
        let users_p = await res_p.json();
        console.log(users_p);
        assert.strictEqual(res_p.status, 200);
        assert.isArray(users_p.orders);
        assert.strictEqual(users_p.orders.length, 1);
    })
    it("should get vendor orders", async ()=>{
        let res_p = await fetch(`http://localhost:${process.env.SERVER_PORT}/rest/vendor/orders/6632691c9bf560e0dbe1ba47`);
        let users_p = await res_p.json();
        console.log(users_p);
        assert.strictEqual(res_p.status, 200);
        assert.isArray(users_p.orders);
        assert.strictEqual(users_p.orders.length, 1);
    })
    it("should get all reviews", async ()=>{
        let res_p = await fetch(`http://localhost:${process.env.SERVER_PORT}/rest/reviews`);
        let users_p = await res_p.json();
        console.log(users_p);
        assert.strictEqual(res_p.status, 200);
        assert.isArray(users_p.reviews);
        assert.strictEqual(users_p.reviews.length, 1);
    })
    it("should get a review", async ()=>{
        let res_p = await fetch(`http://localhost:${process.env.SERVER_PORT}/rest/review/663271199bf560e0dbee01fa`);
        let users_p = await res_p.json();
        console.log(users_p);
        assert.strictEqual(res_p.status, 200);
        assert.strictEqual(users_p.review.rating, 4);
    })
    


    after(async () => {
        // await User.deleteMany({});
        console.log("Closing server");
        listner.close();
    })
})