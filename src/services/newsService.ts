import axios from 'axios'
import config from '../configs/botConfig'

const BASE_URL = 'https://newsapi.org/v2/everything'

export interface NewsArticle {
  title: string
  url: string
  description?: string | null
  urlToImage?: string | null
}

export interface NewsResponse {
  articles: NewsArticle[]
}

export const fetchNews = async (query: string): Promise<NewsResponse> => {
  const url = `${BASE_URL}?q=${encodeURIComponent(query)}&apiKey=${config.NEWS_API_KEY}`
  const response = await axios.get<NewsResponse>(url)
  return response.data
}

export const formatNewsDescription = (articles: NewsArticle[]) =>
  articles
    .slice(0, 5)
    .map(article => `[${article.title}](${article.url})\n${article.description || ''}`)
    .join('\n\n')
