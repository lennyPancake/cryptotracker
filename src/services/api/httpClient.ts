import axios, { type AxiosRequestHeaders, type Method } from 'axios'

export interface ApiRequest {
  url: string
  method?: Method
  headers?: AxiosRequestHeaders
  params?: Record<string, unknown>
  data?: unknown
}

const makeRequest = ({ url = '/', method = 'get', data, params, headers }: ApiRequest) =>
  axios({
    url,
    method,
    responseType: 'json',
    headers,
    params,
    data,
  })

export default makeRequest
