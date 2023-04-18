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
      'eyJraWQiOiJHbDBkd2xYZHBDcDdvcE4yWnNiV21pbHA0dnh0WjV6aHYyT0Nkcm0yK1dFPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI1MTRjMGMzNS01NGJlLTQ5M2UtYjBmMC04NDhlMmVkMjM1OGQiLCJjb2duaXRvOmdyb3VwcyI6WyJsZXZlbDMiXSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmV1LWNlbnRyYWwtMS5hbWF6b25hd3MuY29tXC9ldS1jZW50cmFsLTFfZkNza2VXM3N6IiwidmVyc2lvbiI6MiwiY2xpZW50X2lkIjoiMTZ1MXUwZGhnZmY0bW00a3ZnczlqZHI5Z3AiLCJvcmlnaW5fanRpIjoiYzYxOGM3MDUtMWE5OC00MGEyLWE0MjAtZWMxNTQzNDExMDY5IiwidG9rZW5fdXNlIjoiYWNjZXNzIiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCIsImF1dGhfdGltZSI6MTY4MTgwNTAzOSwiZXhwIjoxNjgxODA4NjM5LCJpYXQiOjE2ODE4MDUwNDAsImp0aSI6IjcwOGI2YjcxLTQ1YmEtNGExNy1iOTQwLWQ5NGYzOTczNWI5ZCIsInVzZXJuYW1lIjoiR29vZ2xlXzEwNTk1Mzk4NzczNzU3MTkzMzY0MyJ9.N0gWDecP_pJKwtIr6cBdEj6lltj09bHFAQP3jugxBa599JeGdZF7fetPEj7ZjNHV2yIT9PUfJ401NIZBHS0hnSSqGUOziflrQE-IYf2TbPNplgUJwGwvdVDtyuku99FZggnYUtr-roBg5rimaVEbLA7p8SAhQToYjec9bJMJR3rdS0BsPPQ3xxkrrh1JA1wFjM_0uzx4ibFGsSBmDUJ7oBtyGB4Pvr9oKy0gjsmcZBV3qNk_V6b_gowJVT4kKHuDKvvnGFCpx1jtwFKGYAzWkoCz2nLeEYQDTdicYUvYKIXTXqJ3fgWFay8NcWKV2yqETG2ReGhML6Y92FDyRZD8uQ'

    const response = await instance2.get<T>(
      `/data/query/report/${reportName}${filterString}`,
      {
        headers: { Authorization: `Bearer ${accessToken2}` },
      }
    )

    // const response = await instance.get<T>(
    //   `/data/query/report/${reportName}${filterString}`,
    //   {
    //     headers: { Authorization: `Bearer ${accessToken}` },
    //   }
    // )

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
