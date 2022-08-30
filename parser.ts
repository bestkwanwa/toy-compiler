import { Token, TokenTypes } from './tokenizer';

export enum NodeTypes {
    Program = "Program",
    NumberLiteral = 'NumberLiteral',
    CallExpression = 'CallExpression'
}

export type ChildNode = NumberNode | CallExpressionNode

interface Node {
    type: NodeTypes
}

export interface ProgramNode extends Node {
    type: NodeTypes.Program
    body: ChildNode[]
}

export interface CallExpressionNode extends Node {
    type: NodeTypes.CallExpression
    name: string,
    params: ChildNode[]
}

export interface NumberNode extends Node {
    type: NodeTypes.NumberLiteral
    value: string
}

const generateProgramNode = (): ProgramNode => {
    return {
        type: NodeTypes.Program,
        body: []
    }
}

const generateNumberNode = (value: string): NumberNode => {
    return {
        type: NodeTypes.NumberLiteral,
        value
    }
}

const generateCallExpressionNode = (name: string): CallExpressionNode => {
    return {
        type: NodeTypes.CallExpression,
        name,
        params: []
    }
}

export function parser(tokens: Token[]) {
    let current = 0
    let token = tokens[current]
    const programNode = generateProgramNode()

    const handleToken = (token: Token) => {
        if (token.type === TokenTypes.Number) {
            return generateNumberNode(token.value)
        }
        if (token.value === '(') {
            token = tokens[++current] // skip left parenthesis
            const node = generateCallExpressionNode(token.value)
            token = tokens[++current] // start handling token
            while (token.value !== ')') {
                node.params.push(handleToken(token))
                token = tokens[++current]
            }
            return node
        }

        throw new Error(`Unrecognized type: ${token.type}`);
    }

    while (current < tokens.length) {
        programNode.body.push(handleToken(token))
        current++   // handle next token or jump out the loop
    }

    return programNode
}