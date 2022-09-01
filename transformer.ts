import { traverser, Visitor } from './traverser';
import { NodeTypes, ProgramNode, NumberLiteralNode } from './type';

export interface ExpressionStatement {
    type: NodeTypes.ExpressionStatement;
    expression: TransformedCallExpression
}

export interface TransformedProgramNode {
    body: ExpressionStatement[];
    type: NodeTypes.Program;
}

export interface TransformedCallExpression {
    type: NodeTypes.CallExpression,
    callee: {
        type: NodeTypes.Identifier,
        name: string
    },
    arguments: (NumberLiteralNode | TransformedCallExpression)[]
}

export function transformer(ast: ProgramNode) {
    const newAst = {
        type: NodeTypes.Program,
        body: []
    }

    ast.context = newAst.body

    const visitor: Visitor = {
        CallExpression: {
            enter(node, parent) {
                if (node.type === NodeTypes.CallExpression) {
                    let expression: TransformedCallExpression | ExpressionStatement = {
                        type: NodeTypes.CallExpression,
                        callee: {
                            type: NodeTypes.Identifier,
                            name: node.name
                        },
                        arguments: []
                    }

                    node.context = expression.arguments

                    if (parent?.type !== NodeTypes.CallExpression) {
                        expression = {
                            type: NodeTypes.ExpressionStatement,
                            expression
                        }
                    }
                    parent?.context?.push(expression)
                }
            }
        },
        NumberLiteral: {
            enter(node, parent) {
                if (node.type === NodeTypes.NumberLiteral) {
                    const numberNode = {
                        type: NodeTypes.NumberLiteral,
                        value: node.value
                    }
                    parent?.context?.push(numberNode)
                }
            }
        }
    }

    traverser(ast, visitor)

    return newAst
}   