# Knowit folk backend

Please see the [Wiki](https://github.com/knowit/folk-webapp/wiki/Backend).

To run tests, run
`yarn jest`
from apps/server
to ensure the AzureOpenAI test will run, add an .env file to apps/server and add

```
AZURE_OPENAI_ENDPOINT=<Azure endpoint>
AZURE_OPENAI_API_VERSION=<Azure OpenAI API version>
AZURE_OPENAI_API_KEY=<Azure OpenAI API KEY>
```
