# Knowit Folk

![Prod](https://github.com/knowit/folk-webapp/workflows/Deploy%20-%20Prod/badge.svg)
![Dev](https://github.com/knowit/folk-webapp/workflows/Deploy%20-%20Dev/badge.svg)
![Server: Lint](https://github.com/knowit/folk-webapp/workflows/Server%20Lint/badge.svg)
![Web: Lint & Build](https://github.com/knowit/folk-webapp/workflows/Web%20Lint%20%26%20Build/badge.svg)

An application that presents information about employees and customers at Knowit Objectnet, based on data gathered by
the "Dataplattform" project.

This is a [monorepo](https://monorepo.tools/), containing the following `apps`:

**Web:**

A SPA (single page application) application built with [React.js](https://reactjs.org/), that fetches and presents data from the [ Node.js ](https://nodejs.org/en/)/[ Express ](https://expressjs.com/) server (see below). The code for this web app is located under [apps/web](https://github.com/knowit/folk-webapp/tree/master/apps/web). The web app is bootstrapped and built using [Create React App](https://create-react-app.dev/).

**Server:**

[Node.js](https://nodejs.org/en/) and [Express](https://expressjs.com/) a server that acts as the middleman between the web app and AWS. It fetches and
aggregates data from the "Dataplattform" API. The code for this server is located under [apps/server](https://github.com/knowit/folk-webapp/tree/master/apps/server). [Read more](#backend-data-fetching) about how the server fetches and serves data.

---

In addition to the two `apps`, there are `packages` containing shared code and config utilized in the `apps`.

## Requirements

- **[Node.js](https://nodejs.org/en/)** – a
  version [compatible](https://docs.npmjs.com/cli/v8/configuring-npm/package-json#dependencies) with what is listed in
  the `engines.node` field in [`package.json`](package.json).

> It is recommended to use [a version manager like `nvm`](https://github.com/nvm-sh/nvm) if you need to use multiple versions of Node on your computer.

- **[Yarn](https://yarnpkg.com/)** – a
  version [compatible](https://docs.npmjs.com/cli/v8/configuring-npm/package-json#dependencies) with what is listed in
  the `engines.yarn` field in [`package.json`](package.json). A binary file to `Yarn 3.2.0` is included, so it should be sufficient to just run `yarn install`.

## Running locally

Before first launch, or whenever dependencies are changed, run the `yarn install` command _in the root_ of the project. That will bootstrap and [hoist](https://developer.mozilla.org/en-US/docs/Glossary/Hoisting) all the dependencies.

When developing locally, there are two options on how to run the application:

### Option A: running both server and web locally

This option allows you to work on both the web and server part of the application. The web will fetch data
from the locally running server.

1. For the server to be able to connect and fetch data from the Dataplattform API, it's necessary to add the correct
   credentials. [Follow these instructions on how to set this up in an `.env` file for the server.](https://github.com/knowit/folk-webapp/wiki/Backend)
2. Open two terminal windows/tabs/panes from the root of the repo, and run: `yarn server:dev:local` and `yarn web:dev:local`.

### Option B: running web locally, using server running in [the development environment](#Environments)

You can use this option if you don't need to make changes to the server app. The web will
fetch data from the `proxy` URL set in [`apps/web/package.json`](apps/web/package.json).

1. To start the web, run `yarn web:dev` in the root folder of the project.

#### Authorization

To begin with, your account is not authorized to fetch data. No data will appear on the page, and you may
see `internal server error` or `unauthorized` errors in the
console. [To fix this, do as described here](https://github.com/knowit/Dataplattform-issues/wiki/Folk-webapp:-Authorization-to-Dev-Environment)
.

### Proxies

When running locally, Create React App uses a proxy URL to redirect requests from the web to the server.
See [`apps/web/src/setupProxy.js`](apps/web/src/setupProxy.js)
and [this guide](https://create-react-app.dev/docs/proxying-api-requests-in-development) for details.

## Environments

- Development (`dev`): https://dev.folk.knowit.no/
- Production (`prod`): https://folk.knowit.no/

## Deployment

The project is set up with continuous deployment using [GitHub Actions](https://docs.github.com/en/actions)
and [Serverless](https://www.serverless.com/). The action configurations are located in
the [`.github`](.github) folder, and the Serverless configuration in [serverless.yml](serverless.yml).

### Deployment to development environment

Runs automatically on every merge to the `master` branch. Usually, this is the result of merging a pull request from a feature branch (or other type of working branch).

### Deployment to production environment

Runs automatically when a new GitHub release is
created. Please refer to [this guide](https://docs.github.com/en/repositories/releasing-projects-on-github/managing-releases-in-a-repository#creating-a-release) on how to create a new release.

### Manual commands

Note that this should not be necessary, except in rare cases.

```
# Deploy server and infrastructure
yarn server:deploy:dev

# Deploy web
yarn web:build # to create a build
yarn web:deploy:dev # to deploy the build
```

## Code Conventions

To ensure consistent code style, similar conventions and matching formatting, [ESLint](https://eslint.org/)
and [Prettier](https://prettier.io/) is used.

> It is recommended to use ESLint and Prettier plugins for your IDE. This allows having syntax error highlighting and automatic code reformatting. For those using **VSCode**, certain extensions and settings are [recommended](/.vscode) automatically.

There is a _pre-commit_ hook running (using [husky](https://typicode.github.io/husky/#/)) before code can be committed,
and it will not allow commits with convention/format/code style-breaking code. This ensures that no pull requests are
cluttered with significant amounts of whitespace-changes, line breaks and so forth.

## Server Data Fetching

When the web requests data from the server, the server connects to the Dataplattform API and fetches data from
so-called "reports"
. [You can read more about reports here, including how you can create your own.](https://github.com/knowit/Dataplattform-issues/wiki/Dataplattform:-Reports)
The server then aggregates the data from the report(s) before it is sent as a response to the web.
