export enum TokenTypes {
    Paren,
    Name,
    Number
}
export interface Token {
    type: TokenTypes,
    value: string
}

export function tokenizer(code: string) {

    const tokens: Token[] = []
    let current = 0

    const LETTER = /[a-z]/i
    const NUMBER = /[0-9]/i
    const SPACE = /\s/i

    /**
     * (add 1 1)
     */

    while (current < code.length) {
        let char = code[current]

        if (SPACE.test(char)) {
            current++
            continue
        }

        if (char === '(') {
            tokens.push({
                type: TokenTypes.Paren,
                value: char
            })
            current++
            continue
        }
        if (char === ')') {
            tokens.push({
                type: TokenTypes.Paren,
                value: char
            })
            current++
            continue
        }
        /**
         * add 1 1)
         */
        if (LETTER.test(char)) {
            let name = ''
            while (LETTER.test(char) && current < code.length) {
                name += char
                char = code[++current]
            }
            tokens.push({
                type: TokenTypes.Name,
                value: name
            })
            continue
        }
        if (NUMBER.test(char)) {
            let number = ''
            while (NUMBER.test(char) && current < code.length) {
                number += char
                char = code[++current]
            }
            tokens.push({
                type: TokenTypes.Number,
                value: number
            })
            continue
        }
    }
    return tokens
}