import { isTodoActive, isTodoCompleted } from ".";

test('check confirm status function', () => {
    expect(isTodoActive({
        status: 'ACTIVE'
    })).toBe(true);

    expect(isTodoCompleted({
        status: 'COMPLETED'
    })).toBe(true);
} )