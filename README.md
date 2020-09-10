# Knowit folk

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

When you run locally in Chrome/Firefox, you might see that it needs to be on https.
If that happens click on "Advanced" and then use un-trusted connection option.

The page will reload if you make edits.

You will also see any lint errors in the console.

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

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## Deploy

To deploy you have to install aws cli tools and serverless.

[AWS cli 2](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html)

[serverless](https://www.serverless.com/framework/docs/getting-started#via-npm)

Then run `aws configure` and fill inn the _Access key ID_ and _Secret access key_

And then run `yarn deploy:web:dev` to deploy.

## Deploy test data

By running `sls deploy function -f apiData`, you can deploy the test data to dev-server.
