import { test, expect } from "vitest";
import { NodeTypes, ProgramNode, NumberLiteralNode } from './type';
import { transformer,ExpressionStatement ,TransformedProgramNode,TransformedCallExpression} from './transformer';

test ('transformer', () => {
    const originalAst: ProgramNode = {
        type: NodeTypes.Program,
        body: [{
            type: NodeTypes.CallExpression,
            name: 'add',
            params: [{
                type: NodeTypes.NumberLiteral,
                value: '2',
            }, {
                type: NodeTypes.CallExpression,
                name: 'subtract',
                params: [{
                    type: NodeTypes.NumberLiteral,
                    value: '4',
                }, {
                    type: NodeTypes.NumberLiteral,
                    value: '2',
                }]
            }]
        }]
    }

    const transformedAst: TransformedProgramNode = {
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

    expect(transformer(originalAst)).toEqual(transformedAst)
})