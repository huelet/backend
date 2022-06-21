# Contribution guide

Hi! If you are reading this right now you likely
want to contribute to the development of Huelet.
If you want to help, you can:

1. Check out our [Issues tab](https://github.com/huelet/issues/) for what needs work
2. Apply as a developer at Huelet! More info soon.

When writing code, try to stick to this simple coding style:
(hint: use the Prettier extension for code formatting)
```ts
const doThis = "do this";

const function = (arrowFunctionsPls: String) => {
  console.log("tabs are 2 spaces.");
  if(huelet){
    console.log(`Try to stick to backticks \` when defining strings.
    This allows for easy use of ${es6.stringConcatenation}.
    Use "Quotes" when string concat is not needed.`);
    console.log("DO NOT" + doThis + "use es6 instead pls");
  }
}

app.get("/quotesHere", example);


// src/example/example.ts
const example = (req: express.Request, res: express.Response) => {
  res.send("Keep things organized in their own separate files.");console.log("don't do this; keep console.logs to a minimum, where they are only needed for debug.");

}

module.exports = example;
```

Put your code that you spent so long on in your own fork. Make a pull request to main.
Please use [gitmoji](https://gitmoji.dev) in your commit messages!
Make sure any conflicts are resolved by the time we get to it.
If you are a developer with us, put your code on a new branch and make a PR.