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
      'eyJraWQiOiJHbDBkd2xYZHBDcDdvcE4yWnNiV21pbHA0dnh0WjV6aHYyT0Nkcm0yK1dFPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI1NGUyMjA2Mi05YWM4LTQyZGEtYWVjYi0zNTUyMTYxY2VmNGQiLCJjb2duaXRvOmdyb3VwcyI6WyJsZXZlbDMiXSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmV1LWNlbnRyYWwtMS5hbWF6b25hd3MuY29tXC9ldS1jZW50cmFsLTFfZkNza2VXM3N6IiwidmVyc2lvbiI6MiwiY2xpZW50X2lkIjoiMTZ1MXUwZGhnZmY0bW00a3ZnczlqZHI5Z3AiLCJvcmlnaW5fanRpIjoiOTIxZDMxMzAtNWE2Yy00NDYwLWEyYTUtYTdjMjQ2NDM0Nzk5IiwidG9rZW5fdXNlIjoiYWNjZXNzIiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCIsImF1dGhfdGltZSI6MTY4NDU5OTM2NiwiZXhwIjoxNjg0NjE1MzU0LCJpYXQiOjE2ODQ2MTE3NTQsImp0aSI6ImQ5NjI5ZTdmLTVjM2MtNDM4NS1hY2VlLWZlOGRjY2YyNjIwNyIsInVzZXJuYW1lIjoiR29vZ2xlXzEwNzk1OTU3MTc2Nzc4Njc4MDY1MiJ9.fjbiMTniBjUp3Acd5DTzFECpS37BGHJZkH4x3cRjyyrSCBZxgDnlf-Ux0La6MDyrsB6hAeYiHABiyp2xVRJi0bF5WVoIApfWFZCvM1__NNkcqa8Mfz_7lNcTf6JidJ79Eu0DQTxkmiroJE0G-D0umznj-xLeotNQS86rv_Y9Mq4bCyT5RlSEofZildtZfgtecv15Rskl17yoSg8VncxqZPBOMe1VXpInEZTmqQouABVEEWRUe2th5nDnUCsTDL2ze9_vG7hw3YjU8E_DWrWu_Q8FK7GdjqPY0Wgg_XoM0edDxFE8TbhqlmzHXotP0uBv81W5QjmyAp_cXAVR8jo8eA'

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
