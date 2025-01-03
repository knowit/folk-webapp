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
[![ExpressJS][expressjs]][expressjs-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- Use -->

## Usage

### Database

A database and tables are used to handle the chat history in regard to KnowitGPT.
At the moment (13.12.2024) there isn't a setup/connection to a database in the cloud, so to properly work with the
functionality for KnowitGPT, you have to set it up locally.
There is only the possibility to connect to a PostgresSQL database, since it is the only one with a client implemented.

#### Setup

There are multiple ways to create a PostgresSQL locally, but personally I used a [Docker](https://www.docker.com/) to
pull and run a Postgres database and [PgAdmin](https://www.pgadmin.org/) to work with the database with a UI.

I used the following command to run the postgres container names dev-folk-postgres with my own defined password:

```bash
docker run --name dev-folk-postgres -e POSTGRES_PASSWORD=***** -p 5433:5432 -d postgres
```

Then I created a database using PgAdmin, but can also be done in the terminal.
You're now able to connect to the database locally.

#### Connection

In `apps/sever/.env`you'll have to add these variables:

```
# PostgresSQL Credentials
POSTGRES_HOST="localhost"
POSTGRES_PORT="5432"
POSTGRES_DATABASE_NAME="_____"
POSTGRES_PASSWORD="_____"
```

When using a Docker container, I had to switch to port 5433 for it to work.

#### Working on the database

You'll have to create two tables in you newly created database; `chat` and `chat_message`.
The columns should be as found for the corresponding classes in the file `apps/server/repository/chat-repository.ts`.

It is possible to set up the tables using an endpoint. If the connection to the database is up, you can use the endpoint
`/api/v2/database/setup`

Example tables for PostgresSQL

**chat** with columns:

- id: uuid [PKey]
- user_id: varchar (255)
- created: timestamp
- last_updated: timestamp
- title: varchar (255)

**chat_message** with columns:

- id: uuid [PKey]
- chat_id: uuid [FKey]
- user_id: varchar (255)
- message: text
- role: varchar (255)
- created: timestamp

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

[expressjs]: https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express
[expressjs-url]: https://expressjs.com/
[typescript]: https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white
[typescript-url]: https://www.typescriptlang.org/
