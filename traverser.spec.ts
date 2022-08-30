import { test, expect } from "vitest";
import { NodeTypes, ProgramNode } from './parser';
import { traverser, Visitor } from './traverser';

test('traverser', () => {
    const ast: ProgramNode = {
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

    const callStack: any[] = []

    const visitor: Visitor = {
        Program: {
            enter(node, parent) {
                callStack.push(['program enter', node.type, undefined]);
            },
            exit(node, parent) {
                callStack.push(['program exit', node.type, undefined]);
            }
        },
        CallExpression: {
            enter(node, parent) {
                callStack.push(['call expresion enter', node.type, parent!.type]);
            },
            exit(node, parent) {
                callStack.push(['call expresion exit', node.type, parent!.type]);
            }
        },
        NumberLiteral: {
            enter(node, parent) {
                callStack.push(['number enter', node.type, parent!.type]);
            },
            exit(node, parent) {
                callStack.push(['number exit', node.type, parent!.type]);
            }
        }
    }

    traverser(ast, visitor)

    expect(callStack).toEqual([
        ['program enter', NodeTypes.Program, undefined],
        ['call expresion enter', NodeTypes.CallExpression, NodeTypes.Program],
        ['number enter', NodeTypes.NumberLiteral, NodeTypes.CallExpression],
        ['number exit', NodeTypes.NumberLiteral, NodeTypes.CallExpression],
        ['call expresion enter', NodeTypes.CallExpression, NodeTypes.CallExpression],
        ['number enter', NodeTypes.NumberLiteral, NodeTypes.CallExpression],
        ['number exit', NodeTypes.NumberLiteral, NodeTypes.CallExpression],
        ['number enter', NodeTypes.NumberLiteral, NodeTypes.CallExpression],
        ['number exit', NodeTypes.NumberLiteral, NodeTypes.CallExpression],
        ['call expresion exit', NodeTypes.CallExpression, NodeTypes.CallExpression],
        ['call expresion exit', NodeTypes.CallExpression, NodeTypes.Program],
        ['program exit', NodeTypes.Program, undefined],
    ])
})