# What is "Linting"?

 > lint, or a linter, is a static code analysis tool used to flag programming errors, bugs, stylistic errors, and suspicious constructs. The term originates from a Unix utility that examined C language source code.

I.e linting is *static code analysis* process primarily. Because of it we need describe of this process. 

## How static code analysis works

Source code is just text written in some programming language. Generally, any programming language is divided into two layers - syntax and semantics.

### Syntax

Syntax of a language is the set of rules that defines the combinations of symbols that are considered to be correctly structured statements or expressions in that language. Syntax therefore refers to the *form* of the code. Syntactic correctness is not guaranteed that program will work correctly and that it will return a meaningful result.

Syntax analisis has three phases:
 - lexing phase - spilitting set of characters to set of words(also called tokens)
 - parsing phase - structuring set of words to data structure which determining how tokens are connected to each other
 - contexting - determining what objects or variables names refer to

![Lexing And Parsing](./lexing-and-parsing.png)

TODO сделать руками картинку с примером того что на каждой фазе происходит

At syntactic level static code analyzer(linter) can check form of the code. All linters can work at syntactic level and can find undesirable syntactic forms of any complexity. For example:

```js
/*eslint block-spacing: "error"*/

function foo() {return true;}
if (foo) { bar = 0;}
function baz() {let i = 0;
    return i;
}
```

```js
/*eslint func-call-spacing: ["error", "never"]*/

fn ();

fn
();

```

This kind errors can't affect result of the program execution. Because of it, in most cases, syntax errors can be automatically and safely fixed by the linter. Example:

Before autofix:

```js
/*eslint func-call-spacing: ["error", "never"]*/

fn ();

fn
();
```

After autofix:

```js
/*eslint func-call-spacing: ["error", "never"]*/

fn();

fn();
```

### Semantics

Whole information about the meaning of the program or the results of executing are located on the semantic layer. This layer is independent of syntactic layer and program form. For example, two programs can be equal by semantics, but are not equal by syntax:

```js
var a = [1,2,3]
fn(a)
```

```js
var a = [
    1,
    2,
    3,
]
fn ( a ) 
```

And furthermore, program can be syntactically correct, but has no generally accepted meaning, i.e this program are semantically incorrect:

```js
var object = {}

object.method1() // method doesn't exist

var c = false
while (c = true) {} // using = instead of ==
```

Semantic of program determines logic of program. Because of it, semantic errors determine program logic errors. Finding and fixing are very comprehensive problem. Linters can only find few kinds of undesirable semantic construction. For example:

```js
/*eslint max-depth: ["error", 4]*/
/*eslint-env es6*/

function foo() {
    for (;;) { // Nested 1 deep
        while (true) { // Nested 2 deep
            if (true) { // Nested 3 deep
                if (true) { // Nested 4 deep
                    if (true) { // Nested 5 deep
                    }
                }
            }
        }
    }
}
```

```js
/*eslint no-useless-constructor: "error"*/
/*eslint-env es6*/

class A {
    constructor () {
    }
}

class B extends A {
    constructor (...args) {
      super(...args);
    }
}
```

But linter can't find many others kinds of undesirable semantic construction or errors. Examples:

TODO примеры что нельзя проверить линтером(какие то динамические свойства)

Also, in most cases, semantic structure of program impact program behavior. Therefore linter can't safely and automatically fix undesirable semantic construction. Few examples of such construction:

примеры кода который можно прочекать но нельзя заафтофиксить

## Beoynd syntax and semantics

Semantics of programming language can be described by formal description - axiomatic, operational, denotational semantics. Semantics defines abstract meaning of program without details related to execution of program in concrete enviroment(sets of libraries, compiler and another tooling). All kinds of semantics is described by very low-level instructions. In reality, however, we create programms using high-level abstractions. Often, these abstractions are defined by user or library creator. For example:

```js
const Foo = function(props, context) {
  const {
    location
  } = context.router;

  return <div>{props.foo}</div>;
};
```

This code defines React component. But in terms of Javascript semantics we can't define something like "Component". 
Other example:

```js
const x = gql`fragment FilmFragment on Film { title } { allFilms { films { ...FilmFragment } } }`
```

This code defines GraphQL query. But for Javascript semantics it is just regular template tags.

All such concepts, patterns, extensions of language, embeded domain specific languages can be defined at the level of **pragmatics**.
Pragmatics is the third general area of language description, referring to practical aspects of how constructs and features of a language may be used to achieve various objectives. It defines what syntactic/semantic structures of code are *useful* for. For example: function definition can be used for define function or class constructor or react component or closure and so on.
Sets of syntactic/semantic structures can be connected at the level of pragmatics by a common range of use. For example, we can all syntactic/semantic constructions which are used to define React entities. So we could do for TypeScript types, Regular expression, Angular/Vue specific code, JSDoc and so on. 

Linters can recognize these pragmatic constructions and check them by special rules. For example, we can check that react component [was defined as stateless function](https://github.com/yannickcr/eslint-plugin-react/blob/0e9a193435/docs/rules/prefer-stateless-function.md): 

```js
var Hello = createReactClass({ // Error: Component should be written as a pure function
  render: function() {
    return <div>Hello {this.props.name}</div>;
  }
});
```

TODO придумать как оформить ошибки линтинга в примерах

### Summarize

We can reach several conclusions about linting, based on theory of programming language and static analysis of code:

 - all errors and undesirable construction in code are divided into two parts: syntactic and semantic parts. Linter can auto-fix syntactic part, but it can't auto-fix semantic part. Therefore, all rules in our config are divided into two parts, also.
 - any construction in our code relate to some pragmatic range of use. Because of it, all rules in our config are grouped by relation to these ranges, also.
