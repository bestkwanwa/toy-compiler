import { Token, TokenTypes } from './tokenizer';

export enum NodeTypes {
    Program,
    NumberLiteral,
    CallExpression
}

type ChildNode = NumberNode | CallExpressionNode

interface Node {
    type: NodeTypes
}

interface ProgramNode extends Node {
    body: ChildNode[]
}

interface CallExpressionNode extends Node {
    name: string,
    params: ChildNode[]
}

interface NumberNode extends Node {
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