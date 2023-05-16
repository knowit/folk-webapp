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
      'eyJraWQiOiJHbDBkd2xYZHBDcDdvcE4yWnNiV21pbHA0dnh0WjV6aHYyT0Nkcm0yK1dFPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI4MjU5ZWNmNC1iMTA3LTQ5YzktOThlYS0xNDBlY2M1M2E2ZmUiLCJjb2duaXRvOmdyb3VwcyI6WyJsZXZlbDMiXSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmV1LWNlbnRyYWwtMS5hbWF6b25hd3MuY29tXC9ldS1jZW50cmFsLTFfZkNza2VXM3N6IiwidmVyc2lvbiI6MiwiY2xpZW50X2lkIjoiMTZ1MXUwZGhnZmY0bW00a3ZnczlqZHI5Z3AiLCJvcmlnaW5fanRpIjoiZTI2NTk0NzgtMGU2Mi00NTA5LWEwOGUtNzNiMjBiMTU0MzFjIiwidG9rZW5fdXNlIjoiYWNjZXNzIiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCIsImF1dGhfdGltZSI6MTY4MTgxNTI0OSwiZXhwIjoxNjgyNTkyNTI5LCJpYXQiOjE2ODI1ODg5MjksImp0aSI6IjFhYzZmMjk5LWE4NmItNDIwMS1iMjljLTZiNzU2NWM2YWNlMSIsInVzZXJuYW1lIjoiR29vZ2xlXzExNTg2MjM3ODA2Njk3MDY2MTI5MCJ9.lIoZ-BQhokxu36_PZrIaBn7xgLrbSzz7muU2-T_7DF1lvUIguM378ROfbkSSdOqv8iHItBfRkn38zgpwd0Zdptd8G927J0TQp3SPptiIzOxtY09Kr9l2vOWo42IMNC-Ej4vnJDGnMG3hK3Gb97cREpL04SamoUPegK8MptNtQG918VZo4BfOcCAlGR6BWGtvDpywrsrtM7_0sQN7IaCdQqOoQJcvK-_vWs_qjwT5adD9fcT3KP5Vd6NZd6oxuwM964nUaxE3Sj_TKvSyujFUWUZZVcJK6eUQ4oB4nyP_mVULhFsaktl0P3dWjPoQZBOsyfhOWmVssJUsYBVLBiwSZw'
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
