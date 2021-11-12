// Verbose level
const DEBUG = parseInt(process.env.DEBUG) || 0
type Params = {
  message?: string;
  type?: string;
  data?: Data | null;
  status?: number;
  error?: {status: number, message: string, external: any};
  external?: boolean | null;
}

type Data = {
  accessToken?: string,
  filterString?: string, 
  reportUrl?: string,
  reportName?: string,
  filter?: {email?: string, user_id?: string}, 
  hasToken?: boolean,
  status?: number,
  response?: string,
  parameters?: {user_id?: string, email?: string},
  reports?: any,
  endpoint?: string,
}
function output({
  type,
  error,
  message,
  data
}: Params) {
  const RED = 31
  const YELLOW = 33
  const BLUE = 34

  const color = (color: number, string: string) => {
    return '\x1b[' + color + 'm' + string + '\x1b[0m'
  }

  if (DEBUG > 0) {
    switch (type) {
    case 'error':
      console.error(color(RED, type), error, data)
      break
    case 'warning':
      if (DEBUG >= 2)
        console.warn(color(YELLOW, type), error, data)
      break
    case 'info':
      if (DEBUG >= 3)
        console.log(color(BLUE, type), message, data)
      break
    default:
      console.log(error, data)
    }
  }
}

// Issue with status code, message, type of error, and if the source of the issue is internal
const Reporting = ({
  status = 500,
  message = '',
  type = 'error',
  external = null,
  data = null
}: Params) => {
  const error = { status, message }
  if (DEBUG > 0)
    output({ type, error: {...error, external}, message, data})
  return error
}

export default Reporting
