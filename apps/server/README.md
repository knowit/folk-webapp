<a id="readme-top"></a>

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

<br />
<div align="center">

<h3 align="center">Knowit Folk - Backend</h3>

  <p align="center">
    This is the backend of the Folk web page.
    <br />
    <a href="https://github.com/knowit/folk-webapp/wiki/Backend"><strong>Check out the wiki »</strong></a>
    <br />
  </p>
</div>

<!-- Table of contents -->
<details>
  <summary>Table of contents</summary>
  <ol>
    <li><a href="#build">Build</a></li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>

### Build

[![TypeScript][typescript]][typescript-url]
[![Serverless][serverless]][serverless-url]
[![ExpressJS][expressjs]][expressjs-url]
[![DynamoDb][dynamodb]][dynamodb-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- Use -->

## Usage

### Database

A dynamoatabase are used to handle the chat history in regard to KnowitGPT.
At this moment (13.01.2025) there is only an instance of the database in the development environment.
The development database is created in the AWS account `knowit-dataplattform-dev`.

#### Setup

In `apps/sever/.env`you'll have to add these variables:

```
# DynamoDb Credentials
DYNAMODB_TABLE_NAME="dev_knowitgpt_chathistory"
DYNAMODB_AWS_ACCESS_KEY_ID="_____"
DYNAMODB_AWS_SECRET_ACCESS_KEY="_____"
DYNAMODB_AWS_SESSION_TOKEN="_____"
```

Use the access keys for `knowit-dataplattform-dev` to work with the database locally.

### Testing

To run tests, run
`yarn jest`
from apps/server
for chromaDB tests, you need a local chromaDB instances running. Use docker image
`chromadb/chroma`
and ensure port forwarding and reset is allowed

```
docker run -p 8000:8000 -e allow_reset=true chromadb/chroma
```

to ensure the AzureOpenAI test will run, add an .env file to apps/server and add

```
AZURE_OPENAI_ENDPOINT=<Azure endpoint>
AZURE_OPENAI_API_VERSION=<Azure OpenAI API version>
AZURE_OPENAI_API_KEY=<Azure OpenAI API KEY>
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->

## Acknowledgements

- [Best-README-Template](https://github.com/othneildrew/Best-README-Template)
- [Simple Icons](https://simpleicons.org/)
- [Shields-io](https://shields.io/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[dynamodb]: https://img.shields.io/badge/DynamoDb-4053D6?style=for-the-badge&logo=amazondynamodb
[dynamodb-url]: https://aws.amazon.com/dynamodb/
[expressjs]: https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express
[expressjs-url]: https://expressjs.com/
[serverless]: https://img.shields.io/badge/Serverless-FD5750?style=for-the-badge&logo=serverless&logoColor=white
[serverless-url]: https://www.serverless.com/
[typescript]: https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white
[typescript-url]: https://www.typescriptlang.org/
