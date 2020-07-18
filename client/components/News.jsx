import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { API_KEY } from '../../secrets'

const url = `https://finnhub.io/api/v1/news?category=general&token=${API_KEY}`

const News = () => {
  const [news, setNews] = useState([])

  useEffect(() => {
    ;(async () => {
      const { data } = await axios.get(url)
      setNews(data)
      console.log('data', data)
    })()
  }, [])

  return news.length ? (
    <div>
      {news.map(article => {
        return (
          <h1 key={article.id}>
            <a href={article.url} target="blank">
              {article.headline}
            </a>
          </h1>
        )
      })}
    </div>
  ) : (
    <h1>Loading News</h1>
  )
}

export default News
