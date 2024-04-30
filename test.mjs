import { assert } from 'chai';
import { listner } from "./server.js"
import { after } from 'mocha';
import fetch from 'node-fetch';
describe("Tests", () => {
    it("should have NODE_ENV==test", () => {
        assert.strictEqual(process.env.NODE_ENV, "test");
    })

    it("should create and fetch a new user", async () => {
        let res_p = await fetch(`http://localhost:${process.env.TEST_PORT}/rest/user`, {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify({
                email: "test.1@email.com",
                password: "Qwerty@123",
                userId: "TestUser",
            })
        });
        let user_p = await res_p.json();
        console.log(user_p);
        assert.strictEqual(res_p.status, 200);
        let res_g = await fetch(`http://localhost:${process.env.TEST_PORT}/rest/user/${user_p.user._id}`);
        let user_g = await res_g.json()
        console.log(user_g);
        assert.strictEqual(res_g.status, 200);
    })

    it("should fetch all users", async ()=>{
        let res_p = await fetch(`http://localhost:${process.env.TEST_PORT}/rest/users`);
        let users_p = await res_p.json();
        console.log(users_p);
        assert.strictEqual(res_p.status, 200);
        assert.isArray(users_p.users);
        assert.strictEqual(users_p.users.length, 1);
    });



    after(() => {
        console.log("Closing server");
        listner.close();
    })
})