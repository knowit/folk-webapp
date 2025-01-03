import { httpServer } from './app'

const port = 3010

httpServer.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
