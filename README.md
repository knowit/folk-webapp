# Knowit Folk

![Knowit Folk - Backend](https://github.com/knowit/folk-webapp/workflows/Knowit%20Folk%20-%20Backend/badge.svg)
![Knowit Folk - Frontend](https://github.com/knowit/folk-webapp/workflows/Knowit%20Folk%20-%20Frontend/badge.svg)

A web application that presents information about employees and customers at Knowit Objectnet, based on data gathered by
the "Dataplattform" project.

The web application is composed of two parts, both residing in this repository:

- a React SPA (single page application) frontend that fetches and presents data from the Node/Express backend (see
  below). The code for this frontend is located in the root folder of the project. The frontend is bootstrapped and
  built using [Create React App](https://create-react-app.dev/).
- a Node/Express backend-for-frontend that fetches and processes/aggregates data from the "Dataplattform" API. The code
  for this backend is located in the `/backend` folder of the project. Read more
  about [how the backend fetches and serves data](https://github.com/knowit/folk-webapp/wiki/Endpoints).

## Requirements

- **[Node.js](https://nodejs.org/en/)** – a version compatible with what is listed in the `engines.node` field
  in [`package.json`](package.json). It is recommended to use a version manager
  like [`nvm`](https://github.com/nvm-sh/nvm) if you need to use multiple versions of Node on your computer.
- **[Yarn Classic](https://classic.yarnpkg.com/lang/en/)** – a version compatible with what is listed in
  the `engines.yarn` field in [`package.json`](package.json).

## Running locally

Before first launch, or whenever dependencies are changed, run the `yarn install` command in both of these folders:

- the root folder of the project (frontend)
- the `/backend` folder

When developing locally, there are two options on how to run the application.

> See the [Available Scripts](#Available-Scripts) section for descriptions of the mentioned `yarn` commands.

---

### Option A: running frontend locally, using backend running in [the development environment](#Environments)

You can use this option if you don't need to make changes to the backend part of the application. The frontend will
fetch data from the `proxy` URL set in [`package.json`](package.json).

1. To start the frontend, run `yarn start` in the root folder of the project.

---

### Option B: running both backend and frontend locally

Use this option if you need to make changes to the backend part of the application. The frontend will fetch data from
the locally running backend.

1. For the backend to be able to connect and fetch data from the Dataplattform API, it's necessary to add the correct
   credentials. [Follow these instructions on how to set this up in an `.env` file for the backend.](https://github.com/knowit/folk-webapp/wiki/Backend)
2. **Either:** run `yarn start:local` in both the `/backend` and the root folder of the project.
   <br />**Or:** run `yarn start:screen` to start both backend and frontend with a single command.

> **Proxies**: When running locally, Create React App uses a proxy URL to redirect requests from the frontend to the backend. See [`src/setupProxy.js`](src/setupProxy.js) and [this guide](https://create-react-app.dev/docs/proxying-api-requests-in-development) for details.

## Environments

- Development (`dev`): https://dev.folk.knowit.no/
- Production (`prod`): https://folk.knowit.no/

## Deployment

The project is set up with continuous deployment using [GitHub Actions](https://docs.github.com/en/actions)
and [Serverless](https://www.serverless.com/). The action configurations are located in
the [`/.github` folder](/.github), and the Serverless configuration in [`serverless.yml`](serverless.yml).

### Deployment to development environment

Runs automatically on every merge to the `master` branch. Usually, this is the result of merging a pull request from a
feature branch (or other type of working branch).

### Deployment to production environment

Runs automatically when a new GitHub release is created. Please refer to this guide
on [how to create a new release.](https://docs.github.com/en/repositories/releasing-projects-on-github/managing-releases-in-a-repository#creating-a-release)

### Manual commands

Note that this should not be necessary, except in rare cases.

```
# deploy backend and infrastructure
sls deploy --stage dev

# deploy frontend
yarn deploy:dev
```

## Code Conventions

To ensure consistent code style, similar conventions and matching formatting, [ESLint](https://eslint.org/)
and [Prettier](https://prettier.io/) is used.

> It is recommended to use ESLint and Prettier plugins for your IDE. This allows having syntax error highlighting and automatic code reformatting. For those using **VSCode**, certain extensions and settings are [recommended](/.vscode) automatically.

There is a _pre-commit_ hook running (using [husky](https://typicode.github.io/husky/#/)) before code can be committed,
and it will not allow commits with convention/format/code style-breaking code. This ensures that no pull requests are
cluttered with significant amounts of whitespace-changes, line breaks and so forth.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

When you run locally in Chrome/Firefox, you might see that it needs to be on https. If that happens click on "Advanced"
and then use un-trusted connection option.

The page will reload if you make edits.

You will also see any lint errors in the console.

### `yarn start:local`

Same as `yarn start` but routes API queries to localhost using a proxy.

### `yarn start:screen`

Same as `yarn start:local` but starts both the frontend and backend in a screen session. Quit using <kbd>ctrl+a</kbd>
and type `:quit`.

### `yarn test`

Launches the test runner in the interactive watch mode.

See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more
information.

### `yarn build`

Builds the app for production to the `build` folder.

It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.

Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can´t go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will
remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc.) right
into your project, so you have full control over them. All the commands except `eject` will still work, but they will
point to the copied scripts, so you can tweak them. At this point you´re on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you
shouldn't feel obligated to use this feature. However, we understand that this tool wouldn't be useful if you couldn't
customize it when you are ready for it.

### `yarn lint`

To find out errors, you can run this command. It is linting all the scripts in `./src` directory with eslint.

### `yarn format`

It formats all the scripts with prettier to standards specified in `.prettier.json` file.

## Learn More

You can learn more in
the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
