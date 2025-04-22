# Contributing to ZenPOS

Thank you for considering contributing to ZenPOS! This document outlines the process for contributing to this project.

## Code of Conduct

By participating in this project, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md).

## How Can I Contribute?

### Reporting Bugs

This section guides you through submitting a bug report. Following these guidelines helps maintainers understand your report and reproduce the issue.

Before creating bug reports, please check [the issue list](https://github.com/zidanhafiz/zenpos/issues) as you might find that the issue has already been reported. When you are creating a bug report, please include as many details as possible.

**How Do I Submit A Good Bug Report?**

Bugs are tracked as [GitHub issues](https://github.com/zidanhafiz/zenpos/issues). Create an issue and provide the following information:

- **Use a clear and descriptive title** for the issue to identify the problem.
- **Describe the exact steps which reproduce the problem** in as many details as possible.
- **Provide specific examples to demonstrate the steps**.
- **Describe the behavior you observed after following the steps** and point out what exactly is the problem with that behavior.
- **Explain which behavior you expected to see instead and why.**
- **Include screenshots and animated GIFs** if possible.
- **If you're reporting a crash**, include a crash report with the stack trace.
- **If the problem is related to performance or memory**, include a CPU profile capture with your report.

### Suggesting Enhancements

This section guides you through submitting an enhancement suggestion, including completely new features and minor improvements to existing functionality.

Before creating enhancement suggestions, please check [the issue list](https://github.com/zidanhafiz/zenpos/issues) as you might find that the enhancement has already been suggested.

**How Do I Submit A Good Enhancement Suggestion?**

Enhancement suggestions are tracked as [GitHub issues](https://github.com/zidanhafiz/zenpos/issues). Create an issue and provide the following information:

- **Use a clear and descriptive title** for the issue to identify the suggestion.
- **Provide a step-by-step description of the suggested enhancement** in as many details as possible.
- **Provide specific examples to demonstrate the steps** or mockups to help illustrate.
- **Describe the current behavior** and **explain which behavior you expected to see instead** and why.
- **Explain why this enhancement would be useful** to most ZenPOS users.

### Pull Requests

The process described here has several goals:

- Maintain ZenPOS's quality
- Fix problems that are important to users
- Engage the community in working toward the best possible ZenPOS
- Enable a sustainable system for ZenPOS's maintainers to review contributions

Please follow these steps to have your contribution considered by the maintainers:

1. Follow all instructions in [the template](PULL_REQUEST_TEMPLATE.md)
2. Follow the [styleguides](#styleguides)
3. After you submit your pull request, verify that all [status checks](https://help.github.com/articles/about-status-checks/) are passing

While the prerequisites above must be satisfied prior to having your pull request reviewed, the reviewer(s) may ask you to complete additional design work, tests, or other changes before your pull request can be ultimately accepted.

## Styleguides

### Git Commit Messages

* Use the present tense ("Add feature" not "Added feature")
* Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
* Limit the first line to 72 characters or less
* Reference issues and pull requests liberally after the first line
* Consider starting the commit message with an applicable emoji:
    * 🎨 `:art:` when improving the format/structure of the code
    * ⚡️ `:zap:` when improving performance
    * 🔥 `:fire:` when removing code or files
    * 🐛 `:bug:` when fixing a bug
    * ✨ `:sparkles:` when adding a new feature
    * 📝 `:memo:` when adding or updating documentation
    * 🔀 `:twisted_rightwards_arrows:` when merging branches
    * 🚀 `:rocket:` when deploying stuff

### JavaScript/TypeScript Styleguide

* Use 2 spaces for indentation
* Prefer the use of TypeScript over JavaScript
* Follow the [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
* Prefer ES6+ features
* Use descriptive variable names

### React Styleguide

* Use functional components with hooks instead of class components
* Use the React Fragment shorthand (`<>...</>`) when appropriate
* Component names should be PascalCase
* Prop names should be camelCase
* Prefer destructuring props
* Prefer inline props for simple components

### CSS Styleguide

* Follow the [BEM naming convention](http://getbem.com/naming/) when not using Tailwind CSS
* Use Tailwind CSS utilities when possible
* Keep styling concerns separate from logical concerns

## Setting Up Your Development Environment

1. Fork and clone the repository
2. Run `npm install` to install dependencies
3. Copy `.env.example` to `.env.local` and set up your environment variables
4. Run `npm run setup-db` to set up the database
5. Run `npm run dev` to start the development server

## Additional Notes

### Issue and Pull Request Labels

This section lists the labels we use to help us track and manage issues and pull requests.

* `bug` - Issues that identify a problem in the existing code
* `documentation` - Issues and pull requests that relate to documentation
* `enhancement` - Issues that request or provide new features
* `good first issue` - Issues that are good for newcomers
* `help wanted` - Issues that need assistance
* `question` - Questions about the project or how to contribute

## Thank You!

Your contributions to open source, large or small, make great projects like this possible. Thank you for taking the time to contribute. 