import { logPastelGreen, logPastelLavender, logPastelRed, logPastelYellow } from 'nstypocolors'

export const logger = {
  log: (message: string) => logPastelGreen(`[LOG] ${message}`),
  sLog: (message: string) => logPastelLavender(`[SUCCESS] ${message}`),
  warn: (message: string) => logPastelYellow(`[WARN] ${message}`),
  error: (message: string) => logPastelRed(`[ERROR] ${message}`),
}
