# Knowit folk backend

Please see the [Wiki](https://github.com/knowit/folk-webapp/wiki/Backend).

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
