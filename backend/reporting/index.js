// Verbose level
const DEBUG = parseInt(process.env.DEBUG) || 0

function output({
  type,
  error,
  message,
  data
}) {
  const RED = 31
  const YELLOW = 33
  const BLUE = 34

  const color = (color, string) => {
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
module.exports = function({
  status = 500,
  message = '',
  type = 'error',
  external = null,
  data = null
}) {
  let error = { status, message }
  if (DEBUG > 0)
    output({ type, error: {...error, external}, message, data})
  return error
}