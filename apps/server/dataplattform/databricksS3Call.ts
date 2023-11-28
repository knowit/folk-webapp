import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3'
import axios from 'axios'
import { ApiError } from '../middlewares/errorHandling'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

const client = new S3Client({
  region: 'eu-west-1',
  //credentials: fromIni({ profile: '723164513951_DataplattformDeveloper' }),
})
const bucketName = 'knowit-databricks-u06vfj-external'

export async function getFileFromS3(report: string): Promise<string> {
  let res: string
  const command = new GetObjectCommand({
    Bucket: bucketName,
    Key: `some/${process.env.stage}/reports/` + report + `.json`,
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

export async function getSignedImageFromS3(imgKey: string): Promise<string> {
  try {
    const clientUrl: string = await createPresignedUrlWithClient({
      bucket: bucketName,
      key: imgKey,
    })

    return clientUrl
  } catch (err) {
    console.error(err)
  }
}

const createPresignedUrlWithClient = async ({ bucket, key }) => {
  const appendedKey = `some/${process.env.stage}/${key}`
  const command = new GetObjectCommand({ Bucket: bucket, Key: appendedKey })
  return await getSignedUrl(client, command, { expiresIn: 3600 })
}

function ndjsonToJson(data: string): string {
  if (data == undefined) {
    return '[]'
  } else {
    return '[' + data.split('\n').join(',').slice(0, -1) + ']'
  }
}
