import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Input, Card, List, Layout, Spin } from 'antd'
import '../index.css'
import '../styles/results.css'
import '../styles/header.css'
import 'antd/dist/antd.css'
import Topnav from './components/header$'
import background from './resturant.jpg'
import Footer from './components/footer'
import axios from 'axios'

const { Search } = Input
const { Meta } = Card

function Random() {
  const params = new URLSearchParams(location.search)

  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [results, setResults] = useState([])
  const [search, setSearch] = useState(params.get('q'))
  const [load, setLoad] = useState(null)

  useEffect(() => {
    const APP_ID = '32d889fc'
    const APP_KEY = '48835bf785e2402c93e208cb5df68988'
    axios
      .get(
        `https://api.edamam.com/search?q=${search}&app_id=${APP_ID}&app_key=${APP_KEY}&from=0&to=6&random=true`
      )
      .then(
        (res) => {
          setResults(res.data.hits)
          setIsLoaded(true)
        },
        (error) => {
          setError(error)
        }
      )
      .catch((error) => {
        console.log(error)
      })
  }, [search])

  console.log(results)
  console.log(search)
  if (load) {
    return <h1>loading</h1>
  }
  if (error) {
    return <div>Error: {error.message}</div>
  } else if (!isLoaded) {
    return (
      <div>
        <Topnav />

        <Spin className="spin" size="large" tip="Loading..." />
      </div>
    )
  }

  const data = results.map((item) => ({
    title: <img className="imgr" src={`${item.recipe.image}`} />,
    description: <h1 className="text-lg">{item.recipe.label}</h1>,
    id: item.recipe.uri.substr(51),
    time: (
      <p>
        {item.recipe.totalTime > '60' ? (
          <p>
            {Math.floor(item.recipe.totalTime / 60)} Hours,{' '}
            {item.recipe.totalTime % 60} Minutes
          </p>
        ) : (
          <p>{item.recipe.totalTime} Minutes</p>
        )}
      </p>
    ),
  }))
  if (results.length === 0) {
    return (
      <>
        <Topnav input={(search) => setSearch(search)} />
        <h1>No Recipe Found</h1>
        <Footer />
      </>
    )
  }
  return (
    <>
      <Topnav input={(search) => setSearch(search)} />

      <div
        className="background"
        style={{
          backgroundImage: `url(${background})`,
        }}
      >
        <List
          grid={{ xs: 1, sm: 1, md: 2, lg: 3, xl: 3, xxl: 3 }}
          dataSource={data}
          renderItem={(item) => (
            <>
              <Card
                style={{ width: 300 }}
                cover={
                  <Link
                    target="_blank"
                    to=""
                    onClick={() => {
                      window.location.href = `${item.id}/instruction`
                    }}
                  >
                    {item.title}
                  </Link>
                }
              >
                <Link
                  target={'_blank'}
                  to=""
                  onClick={() => {
                    window.location.href = `${item.id}/instruction`
                  }}
                >
                  <Meta description={item.description} title={item.time} />
                </Link>
              </Card>
            </>
          )}
        />
      </div>
      <Footer />
    </>
  )
}

export default Random
