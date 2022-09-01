import { test, expect } from "vitest";
import { compiler } from './compiler';
test('compiler', () => {
    const source = `(add 2 (subtract 4 2))`
    const target = `add(2, subtract(4, 2));`
    expect(compiler(source)).toEqual(target)
})