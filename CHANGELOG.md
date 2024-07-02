# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.1] - 2024-07-02

### Fixed

- Fixed bug when handling HTML strings with nested list items (fix [#3](https://github.com/matteodf/html-to-slack/issues/3))

## [0.2.0] - 2024-06-26

WARNING: This release introduces some breaking changes. Please make sure to change the types path accordingly after upgrading.

### Changed

- Added support for rich text blocks (implements [#1](https://github.com/matteodf/html-to-slack/issues/1))
- Changed types folder structure
- Removed mrkdwn sections and replaced with rich text blocks

## [0.1.1] - 2024-06-14

### Fixed

- Explicitly defines the plugin as an ES module (fix [#2](https://github.com/matteodf/html-to-slack/issues/2))
- Enforces full path resolution after compiling from TypeScript

## [0.1.0] - 2024-05-28

### Added

- Initial release of `html-to-slack`.
- Function to convert HTML strings to Slack blocks.
- Support for basic HTML tags: `<b>`, `<i>`, `<em>`, `<strong>`, `<del>`, `<code>`, `<pre>`, `<a>`, `<blockquote>`, `<ul>`, `<li>`, `<p>`, `<br>`, and headers (`<h1>` to `<h6>`).
- Comprehensive test suite covering various scenarios including error handling, functional tests, performance tests, and unit tests.
