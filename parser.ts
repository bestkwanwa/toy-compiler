import { Token, TokenTypes } from './tokenizer';
import {
    generateProgramNode,
    generateNumberNode,
    generateCallExpressionNode
} from './type';

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