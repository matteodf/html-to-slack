# HTML to Slack

[![version](https://img.shields.io/github/package-json/v/matteodf/html-to-slack?color=blue)](https://img.shields.io/github/package-json/v/matteodf/html-to-slack)
[![npm downloads](https://img.shields.io/npm/dy/html-to-slack)](https://www.npmjs.com/package/html-to-slack)

A module to convert HTML strings to Slack blocks.

## Installation

To install the package, use npm:

```bash
npm install html-to-slack
```

Or yarn:

```bash
yarn add html-to-slack
```

## Usage

### Example

```ts
import htmlToSlack from 'html-to-slack';

const html = `
  <h1>List of Items</h1>
  <ul>
    <li>First item</li>
    <li>Second item with a <a href="http://example.com">link</a></li>
    <li>Third item<ul><li>Nested item 1</li><li>Nested item 2</li></ul></li>
  </ul>
  <h2>Code Block Example</h2>
  <pre><code>function helloWorld() { console.log("Hello, world!"); }</code></pre>
`;

const blocks = htmlToSlack(html);
console.log(blocks);
```

## Contributing

We welcome contributions! Here are some ways you can help:

1. **Report bugs**: If you find a bug, please open an issue.
2. **Suggest new features**: If you have a feature request, please open an issue.
3. **Submit pull requests**: If you want to contribute code, please submit a pull request.

Before submitting a pull request, please make sure to:

- Fork the repository and create your branch from **`main`**.
- Run **`npm install`** or **`yarn install`** to install dependencies.
- Run the tests with **`npm test`** or **`yarn test`** to ensure all tests pass.
- Add tests to cover your changes.
- Ensure your code lints with **`npm run lint`** or **`yarn lint`**.

## License

This project is licensed under the GPL-3.0 License. See the [LICENSE](LICENSE) file for more details.
