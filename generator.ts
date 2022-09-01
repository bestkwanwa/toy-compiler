import { NodeTypes, NumberLiteralNode } from './type';
import { ExpressionStatement, TransformedCallExpression, TransformedProgramNode } from './transformer';

export function generator(node: NumberLiteralNode | ExpressionStatement | TransformedCallExpression | TransformedProgramNode) {
    switch (node.type) {
        case NodeTypes.Program:
            return node.body.map(generator).join('')
        case NodeTypes.ExpressionStatement:
            return generator(node.expression) + ';'
        case NodeTypes.NumberLiteral:
            return node.value
        case NodeTypes.CallExpression:
            return `${node.callee.name}(${node.arguments.map(generator).join(", ")})`
    }
}