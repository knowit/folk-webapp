import axios from 'axios'

type QueryParams = Record<string, any>
export interface ReportParams {
  accessToken: string
  reportName: string
  queryParams?: QueryParams
}

const BASE_URL =
  process.env.API_URL || 'https://api.new-dev.dataplattform.knowit.no'

const instance = axios.create({ baseURL: BASE_URL })

export const getReport = async <T>({
  accessToken,
  reportName,
  queryParams,
}: ReportParams) => {
  try {
    // Attempt to fetch report with params
    const params = formatParamsAsEncodedURIComponent(queryParams)
    const filterString = params ? `?filter=${params}` : ''

    const response = await instance.get<T>(
      `/data/query/report/${reportName}${filterString}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    )

    return response.data
  } catch (e) {
    if (axios.isAxiosError(e)) {
      const err = {
        status: e.response?.status ?? 400,
        message: e.message,
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
