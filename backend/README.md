# Knowit folk backend

## Configuration

Create your `.env` file in the backend folder with the contents:

> OAUTH_URL=''
>
> CLIENT_ID=''
>
> CLIENT_SECRET=''

and fill in the neccessary values ([AWS parameters](https://console.aws.amazon.com/systems-manager/parameters/) Choose us-east-1 from the region list in the top right corner).

## Dependencies

| Package |
|:-|
| [cross-env](https://www.npmjs.com/package/cross-env) |
| [dotenv](https://www.npmjs.com/package/dotenv) |
| [nodemon](https://www.npmjs.com/package/nodemon) |

## Available Scripts

In the project directory, you can run:

### `yarn start:local`

Runs in development mode.
