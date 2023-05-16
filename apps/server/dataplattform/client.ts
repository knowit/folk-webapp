import axios from 'axios'
import { ApiError } from '../middlewares/errorHandling'
type QueryParams = Record<string, any>
export interface ReportParams {
  accessToken: string
  reportName: string
  queryParams?: QueryParams
}
const BASE_URL =
  process.env.API_URL || 'https://api.new-dev.dataplattform.knowit.no'
const instance = axios.create({ baseURL: BASE_URL })
const instance2 = axios.create({
  baseURL: 'https://ep6xucm4i3.execute-api.eu-central-1.amazonaws.com/prod',
})
export const getReport = async <T>({
  accessToken,
  reportName,
  queryParams,
}: ReportParams) => {
  try {
    // Attempt to fetch report with params
    const params = formatParamsAsEncodedURIComponent(queryParams)
    const filterString = params ? `?filter=${params}` : ''
    const accessToken2 =
      'eyJraWQiOiJHbDBkd2xYZHBDcDdvcE4yWnNiV21pbHA0dnh0WjV6aHYyT0Nkcm0yK1dFPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJkOTE0ODBkNy1hODRkLTQ3NzQtYjQxNS1hMzY2MzRkNDIxMDEiLCJjb2duaXRvOmdyb3VwcyI6WyJsZXZlbDMiXSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmV1LWNlbnRyYWwtMS5hbWF6b25hd3MuY29tXC9ldS1jZW50cmFsLTFfZkNza2VXM3N6IiwidmVyc2lvbiI6MiwiY2xpZW50X2lkIjoiMTZ1MXUwZGhnZmY0bW00a3ZnczlqZHI5Z3AiLCJvcmlnaW5fanRpIjoiZmJiZWVhNWEtZTYyMC00OTllLWJlZDEtMTQ0NjJmYmM0ODdjIiwidG9rZW5fdXNlIjoiYWNjZXNzIiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCIsImF1dGhfdGltZSI6MTY4NDE0ODQ1NywiZXhwIjoxNjg0MjI3OTk4LCJpYXQiOjE2ODQyMjQzOTgsImp0aSI6IjI4MzM4ZjJiLTIwMDQtNDllMS04MjQ1LWU1YThmYTY1MWZiYSIsInVzZXJuYW1lIjoiR29vZ2xlXzEwOTQyNjE3MTA1NDA1ODIxNDYzMyJ9.YYlJJoATnNXiSVp1rNjXJ2IWUK9FDgw3eE9vISHyKkLOpZrHhQ4bBysJccByLyhEoMtfuB3zpXPa-Al7g8t3AQJF371aiBayEY0tf5fk_wBMmCabfFm8uBiwMGWpI2-hiHUAruKfCLmAqsQ62uHzysB2wCUXyR6RVyRmoT2n7x2UhCMKcPRr0pq_tfRYUGkN1HfzeNmyIUOTtgSFHDq_jAHE6MHApv6OJZvYkgyzByeUFshpzm2vccaSjljjydaBqQVW4vKsKgHgm-J7P8VpirdZ1xPqoY_yFtWnuyCztxzlO_XkLblKfn7YsRloOsBO9XrRIcLbg6udSc7yOr-HKQ'
    const response = await instance2.get<T>(
      `/data/query/report/${reportName}${filterString}`,
      {
        headers: { Authorization: `Bearer ${accessToken2}` },
      }
    )
    return response.data
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
}
const formatParamsAsEncodedURIComponent = (params: QueryParams) => {
  if (!params) return ''
  return Object.entries(params)
    .map(([key, value]) => {
      const val = typeof value === 'string' ? `'${value}'` : value
      return `${encodeURIComponent(key)}:${encodeURIComponent(val)}`
    })
    .join('&')
}
