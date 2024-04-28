import { assert } from 'chai';
import {listner} from "./server.js"
import { after } from 'mocha';
describe("Tests", ()=>{
    it("should pass", ()=>{
        assert.strictEqual("working", "working", "Sample test");
    })

    it("should have NODE_ENV==test", ()=>{
        assert.strictEqual(process.env.NODE_ENV, "test");
    })

    after(()=>{
        console.log("Closing server");
        listner.close();
    })
})