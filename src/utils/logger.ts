import { logInfo, logError, logSuccess, logWarn, logBuild } from 'nstypocolors'

type LogLevel = 'INFO' | 'SUCCESS' | 'WARN' | 'ERROR' | 'BUILD' | 'DEBUG'

const timestamp = () => new Date().toLocaleTimeString()

const format = (level: LogLevel, scope: string, message: string) =>
  `[${timestamp()}] [${level}] [${scope}] ${message}`

export const logger = {
  info(scope: string, message: string) {
    logInfo(format('INFO', scope, message))
  },
  success(scope: string, message: string) {
    logSuccess(format('SUCCESS', scope, message))
  },
  warn(scope: string, message: string) {
    logWarn(format('WARN', scope, message))
  },
  error(scope: string, message: string) {
    logError(format('ERROR', scope, message))
  },
  debug(scope: string, message: string) {
    logInfo(format('DEBUG', scope, message))
  },
  build(scope: string, message: string) {
    logBuild(format('BUILD', scope, message))
  },

  timer(label: string) {
    const start = process.hrtime.bigint()
    return () => {
      const end = process.hrtime.bigint()
      const ms = Number(end - start) / 1_000_000
      logBuild(`[${timestamp()}] [TIMER] ${label} completed in ${ms.toFixed(2)}ms`)
    }
  },
}
