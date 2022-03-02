import { isTodoActive, isTodoCompleted } from "..";

describe('Test confirm status function', () => {
    it('isTodoActive should return true with active status', () => {
        expect(isTodoActive({
            status: 'ACTIVE'
        })).toBe(true);
    })

    it('isTodoCompleted should return true with active status', () => {
        expect(isTodoCompleted({
            status: 'COMPLETED'
        })).toBe(true);
    })

})