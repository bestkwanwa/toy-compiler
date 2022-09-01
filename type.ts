export enum NodeTypes {
    NumberLiteral = "NumberLiteral",
    Program = "Program",
    CallExpression = "CallExpression",

    ExpressionStatement = 'ExpressionStatement',
    Identifier = 'Identifier'
}

export type ChildNode =
    | NumberLiteralNode
    | CallExpressionNode

export interface Node {
    type: NodeTypes;
}

export interface ProgramNode extends Node {
    body: ChildNode[];
    type: NodeTypes.Program;
    context?: any[];
}

export interface NumberLiteralNode extends Node {
    type: NodeTypes.NumberLiteral;
    value: string;
}

export interface CallExpressionNode extends Node {
    name: string;
    params: ChildNode[];
    type: NodeTypes.CallExpression;
    context?: any[];
}

export function generateProgramNode(): ProgramNode {
    return {
        type: NodeTypes.Program,
        body: [],
    };
}

export function generateNumberNode(value: string): NumberLiteralNode {
    return {
        type: NodeTypes.NumberLiteral,
        value,
    };
}

export function generateCallExpressionNode(name): CallExpressionNode {
    return {
        type: NodeTypes.CallExpression,
        name,
        params: [],
    };
}
