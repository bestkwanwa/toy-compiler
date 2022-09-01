import { tokenizer } from './tokenizer';
import { parser } from './parser';
import { transformer } from './transformer';
import { generator } from './generator';
export function compiler(code: string) {
    const tokens = tokenizer(code)
    const ast = parser(tokens)
    const transformedAst = transformer(ast)
    const target = generator(transformedAst)
    return target
}