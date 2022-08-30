import { NodeTypes, ChildNode, CallExpressionNode, NumberNode, ProgramNode } from './parser';

type Child = ProgramNode | NumberNode | CallExpressionNode
type Parent = ProgramNode | CallExpressionNode | undefined

interface VisitorMethods {
    enter(node: Child, parent: Parent)
    exit(node: Child, parent: Parent)
}

export interface Visitor {
    Program?: VisitorMethods
    CallExpression?: VisitorMethods
    NumberLiteral?: VisitorMethods
}

export function traverser(ast: ProgramNode, visitor: Visitor) {

    const traverseChild = (children: ChildNode[], parent) => {
        children.forEach(child => {
            traverseNode(child, parent)
        });
    }

    const traverseNode = (node: Child, parent: Parent) => {

        const nodeVisitor = visitor[node.type]

        if (nodeVisitor && nodeVisitor.enter) {
            nodeVisitor.enter(node, parent)
        }

        if (node.type === NodeTypes.NumberLiteral) {

        } else if (node.type === NodeTypes.CallExpression) {
            traverseChild(node.params, node)
        } else if (node.type === NodeTypes.Program) {
            traverseChild(node.body, node)
        }

        if (nodeVisitor && nodeVisitor.exit) {
            nodeVisitor.exit(node, parent)
        }
    }

    traverseNode(ast, undefined)
}