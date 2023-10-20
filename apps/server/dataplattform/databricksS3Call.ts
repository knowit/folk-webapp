import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3'
// import { fromIni } from '@aws-sdk/credential-providers'
import axios from 'axios'
import { ApiError } from '../middlewares/errorHandling'

const client = new S3Client({
  region: 'eu-west-1',
  // credentials: fromIni({ profile: '723164513951_DataplattformDeveloper' }),
})

export async function getFileFromS3(report: string): Promise<string> {
  let res: string
  // const key = getFilePath(report)
  const command = new GetObjectCommand({
    Bucket: 'knowit-databricks-u06vfj-external',
    Key: 'some/reports/' + report + '.json',
  })

  try {
    const response = await client.send(command)
    // The Body object also has 'transformToByteArray' and 'transformToWebStream' methods.
    const str = await response.Body?.transformToString()
    if (typeof str == 'string') {
      res = str
    } else {
      throw new Error('Error: Call returned empty')
    }
  } catch (e) {
    if (axios.isAxiosError(e)) {
      const err: ApiError = {
        status: e.response?.status ?? 400,
        errorType: 'API',
        error: e,
        message: e.response?.data['message'] ?? 'Could not fetch data.',
      }
      return Promise.reject(err)
    }
    return Promise.reject(e)
  }
  return Promise.resolve(ndjsonToJson(res))
}

function ndjsonToJson(data: string): string {
  if (data == undefined) {
    return '[]'
  } else {
    return '[' + data.split('\n').join(',').slice(0, -1) + ']'
  }
}
