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
      'eyJraWQiOiJHbDBkd2xYZHBDcDdvcE4yWnNiV21pbHA0dnh0WjV6aHYyT0Nkcm0yK1dFPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI4MjU5ZWNmNC1iMTA3LTQ5YzktOThlYS0xNDBlY2M1M2E2ZmUiLCJjb2duaXRvOmdyb3VwcyI6WyJsZXZlbDMiXSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmV1LWNlbnRyYWwtMS5hbWF6b25hd3MuY29tXC9ldS1jZW50cmFsLTFfZkNza2VXM3N6IiwidmVyc2lvbiI6MiwiY2xpZW50X2lkIjoiMTZ1MXUwZGhnZmY0bW00a3ZnczlqZHI5Z3AiLCJvcmlnaW5fanRpIjoiMzE4MGIyN2MtMDY5NC00OTZlLTkyYWUtYjAwM2EzM2ZjZjlhIiwidG9rZW5fdXNlIjoiYWNjZXNzIiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCIsImF1dGhfdGltZSI6MTY4MzcxMjI4MSwiZXhwIjoxNjgzNzE4OTgwLCJpYXQiOjE2ODM3MTUzODAsImp0aSI6IjY3MjY2OWVkLTE0ZjEtNDFhYi1iZWYwLWE3NTViZjVhODdjZiIsInVzZXJuYW1lIjoiR29vZ2xlXzExNTg2MjM3ODA2Njk3MDY2MTI5MCJ9.kZGy83QkQFFLM1BU9EXLf9X3Z-Iva7TW9g5VsVSYnDy4xnq8YpUZ7l2YqE0ZS9A5A_5_dOi6-uJ-A1YU0pSVhTkR6IARwqplX3Uog2G6WbHgJeWZUO_rRPjS_DqxOlOvFdNh-LG5Pt_QYt4vp1C755sP0sx-mkVXpQybvz0qyxZVVjN0k-WiaYqfljFpQmDxJcVovBSBpDSJl88-7ldzpyYMPIwU7qbIFHtahB27a7L0XWuWjGmcp5ogaYpPZ1pXhiLl1-ine7pnSaw8t7_xXuzT8ceahCxdbgDg7s1ke5m0c7uE1X6NzRbRNCW8BxtxC_nVnAs1TxKySar5fEYtRg'

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
