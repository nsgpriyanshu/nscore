import {
  logBackPastelLavender,
  logError,
  logPastelGreen,
  logPastelLavender,
  logPastelRed,
  logPastelYellow,
  logSuccess,
  logWarning,
} from 'nstypocolors'

export const logger = {
  log: (message: string) => logSuccess(`[LOG] ${message}`),
  sLog: (message: string) => logBackPastelLavender(`[SUCCESS] ${message}`),
  warn: (message: string) => logWarning(`[WARN] ${message}`),
  error: (message: string) => logError(`[ERROR] ${message}`),
}
