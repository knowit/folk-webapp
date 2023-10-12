import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3'
// import { fromIni } from '@aws-sdk/credential-providers'

const client = new S3Client({
  region: 'eu-west-1',
  // credentials: fromIni({ profile: '216105769281_AdministratorAccess' }),
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
  } catch (err) {
    console.log(err)
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
