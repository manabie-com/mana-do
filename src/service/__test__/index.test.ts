import {updateTodoService} from "../utils";


describe("FE" , () => {
    it('should ', function () {
        const test = updateTodoService("123", "test content");
        expect(test).toEqual({status: 200, code: "success"})
    });
} )