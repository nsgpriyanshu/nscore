import dotenv from 'dotenv'

dotenv.config()

interface BotConfig {
  BOT_TOKEN: string
  BOT_ID: string
  SERVER_ID: string
  DEVELOPER_IDS: string[]
  ERROR_CHANNEL: string
  GATE_CHANNEL: string
  PRODIA_API_KEY: string
  NEWS_API_KEY: string
}

const config: BotConfig = {
  BOT_TOKEN: process.env.AUTH_TOKEN as string,
  BOT_ID: process.env.CLIENT_ID as string,
  SERVER_ID: process.env.SERVER_ID as string,
  DEVELOPER_IDS: (process.env.DEVELOPER_IDS || '').split(','),
  ERROR_CHANNEL: process.env.ERROR_CHANNEL_ID as string,
  GATE_CHANNEL: process.env.JOIN_GATE_CHANNEL_ID as string,
  PRODIA_API_KEY: process.env.PRODIA_API as string,
  NEWS_API_KEY: process.env.NEWS_API as string,
}

export default config
