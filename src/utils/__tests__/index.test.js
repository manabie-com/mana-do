import { isTodoActive, isTodoCompleted } from "..";

describe('Test confirm status function', () => {
    expect(isTodoActive({
        status: 'ACTIVE'
    })).toBe(true);

    expect(isTodoCompleted({
        status: 'COMPLETED'
    })).toBe(true);
} )