import { test, expect } from "vitest";
import { NodeTypes } from './type';
import { TransformedProgramNode } from './transformer';
import { generator } from "./generator";

test('generator', () => {
    const ast: TransformedProgramNode = {
        type: NodeTypes.Program,
        body: [{
            type: NodeTypes.ExpressionStatement,
            expression: {
                type: NodeTypes.CallExpression,
                callee: {
                    type: NodeTypes.Identifier,
                    name: 'add'
                },
                arguments: [{
                    type: NodeTypes.NumberLiteral,
                    value: '2'
                }, {
                    type: NodeTypes.CallExpression,
                    callee: {
                        type: NodeTypes.Identifier,
                        name: 'subtract'
                    },
                    arguments: [{
                        type: NodeTypes.NumberLiteral,
                        value: '4'
                    }, {
                        type: NodeTypes.NumberLiteral,
                        value: '2'
                    }]
                }]
            }
        }]
    }

    const code = 'add(2, subtract(4, 2));'

    expect(generator(ast)).toMatchInlineSnapshot(`"${code}"`)
})

test('two statements', () => {
    const ast: TransformedProgramNode = {
        type: NodeTypes.Program,
        body: [{
            type: NodeTypes.ExpressionStatement,
            expression: {
                type: NodeTypes.CallExpression,
                callee: {
                    type: NodeTypes.Identifier,
                    name: 'add'
                },
                arguments: [{
                    type: NodeTypes.NumberLiteral,
                    value: '2'
                }, {
                    type: NodeTypes.CallExpression,
                    callee: {
                        type: NodeTypes.Identifier,
                        name: 'subtract'
                    },
                    arguments: [{
                        type: NodeTypes.NumberLiteral,
                        value: '4'
                    }, {
                        type: NodeTypes.NumberLiteral,
                        value: '2'
                    }]
                }]
            }
        }, {
            type: NodeTypes.ExpressionStatement,
            expression: {
                type: NodeTypes.CallExpression,
                callee: {
                    type: NodeTypes.Identifier,
                    name: 'add'
                },
                arguments: [{
                    type: NodeTypes.NumberLiteral,
                    value: '2'
                }, {
                    type: NodeTypes.CallExpression,
                    callee: {
                        type: NodeTypes.Identifier,
                        name: 'subtract'
                    },
                    arguments: [{
                        type: NodeTypes.NumberLiteral,
                        value: '4'
                    }, {
                        type: NodeTypes.NumberLiteral,
                        value: '2'
                    }]
                }]
            }
        }]
    }

    const code = 'add(2, subtract(4, 2));add(2, subtract(4, 2));'

    expect(generator(ast)).toMatchInlineSnapshot(`"${code}"`)
})