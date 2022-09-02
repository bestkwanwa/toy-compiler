# ⛄ Welcome.
A toy compiler based on https://github.com/jamiebuilds/the-super-tiny-compiler. Just for fun!

## Parsing
- Lexical Analysis
    由tokenizer将代码转换成tokens
- Syntactic Analysis
    由parser将tokens转换成ast
## Transformation
由transformer将ast改成符合想要的语言
## Code Generation
由code generator将修改过的ast转换成对应代码