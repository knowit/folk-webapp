# Knowit folk
![Knowit Folk - Backend](https://github.com/knowit/folk-webapp/workflows/Knowit%20Folk%20-%20Backend/badge.svg)
![Knowit Folk - Frontend](https://github.com/knowit/folk-webapp/workflows/Knowit%20Folk%20-%20Frontend/badge.svg)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Deploy

Automatic deployment of `master` branch to development environment

### Manual
```
# deploy backend and infrastucture
sls deploy --stage dev 

# deploy frontend
yarn deploy:dev
```

## Environments

- `dev`: https://dev.folk.knowit.no/
- `prod`: https://folk.knowit.no/

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

When you run locally in Chrome/Firefox, you might see that it needs to be on https.
If that happens click on "Advanced" and then use un-trusted connection option.

The page will reload if you make edits.

You will also see any lint errors in the console.

### `yarn start:local`

Same as `yarn start` but routes API queries to localhost using a proxy.

###  `yarn start:screen`

Same as `yarn start:local` but starts both the frontend and backend in a screen session.
Quit using <kbd>ctrl+a</kbd> and type `:quit`.

### `yarn test`

Launches the test runner in the interactive watch mode.

See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.

It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.

Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can´t go back!**

If you aren´t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you´re on your own.

You don´t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn´t feel obligated to use this feature. However we understand that this tool wouldn´t be useful if you couldn´t customize it when you are ready for it.

### `yarn lint`

To find out errors, you can run this command. It is linting all the scripts in `./src` directory with eslint.

### `yarn format`

It formats all the scripts with prettier to standards specified in `.prettier.json` file.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
