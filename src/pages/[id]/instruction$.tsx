import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Layout, Card, Checkbox, Input } from 'antd'
import { Link, useHistory } from 'react-router-dom'
import type { CheckboxChangeEvent } from 'antd/es/checkbox'
import Header from '../components/header$'
import Footer from '../components/footer'
import main from '../../styles/instruction.module.css'
import background from '../../styles/images/background2.jpg'
import '../../index.css'
import 'antd/dist/antd.css'

const { Search } = Input
const { Meta } = Card

function instruction() {
  const { id } = useParams<{ id: string }>()
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState(null)
  const [result, setResult] = useState([])
  const [label, setLabel] = useState([])
  const [image, setImage] = useState([])
  const [time, setTime] = useState([])
  const [link, setLink] = useState([])
  const [serving, setServing] = useState([])
  const [check, setChecked] = useState([])

  useEffect(() => {
    fetch(
      `https://api.edamam.com/api/recipes/v2/${id}?type=public&beta=false&app_id=32d889fc&app_key=48835bf785e2402c93e208cb5df68988&instructions=true`
    )
      .then((response) => response.json())
      .then(
        (data) => {
          setIsLoaded(true)
          setResult(data.recipe.ingredients)
          setTime(data.recipe.totalTime)
          setServing(data.recipe.yield)
          setLabel(data.recipe.label)
          setImage(data.recipe.image)
          setLink(data.recipe.url)
        },
        (error) => {
          setIsLoaded(true)
          setError(error)
        }
      )
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>
  } else if (!isLoaded) {
    return <h1>Loading...</h1>
  }
  console.log(time)
  console.log(result)
  console.log(image)
  console.log(label)
  console.log(link)
  const onChange = (event: CheckboxChangeEvent) => {
    var updatedList = [...check]
    if (event.target.checked) {
      updatedList = [...check, event.target.value]
    } else {
      updatedList.splice(check.indexOf(event.target.value), 1)
    }
    setChecked(updatedList)
  }
  var isChecked = (item) =>
    check.includes(item) ? main.checkedItem : 'not-checked-item'

  const data = Number(time)

  const router = useHistory()
  const onSearch = (value) =>
    router.push({ search: `q=${value}`, pathname: `/:id` })
  return (
    <Layout
      className={main.background}
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="topNav">
        <Link
          className="title"
          to=""
          onClick={() => {
            window.location.href = '/'
          }}
        >
          Recipe Hub
        </Link>

        <Search
          className={main.input}
          placeholder="Search Recipe"
          onSearch={onSearch}
          enterButton
        />
      </div>
      <Card
        className={main.card}
        style={{ width: 400 }}
        cover={
          <div className={main.imageContainer}>
            <img className={main.image} alt="example" src={`${image}`} />
          </div>
        }
      >
        <div className={main.details}>
          {data > 60 ? (
            <h3>
              Time: {Math.floor(data / 60)} Hours, {data % 60} Minutes
            </h3>
          ) : (
            <h3>Time: {data} Minutes</h3>
          )}
          <h3>Yield: {serving}</h3>
        </div>
        <p className={main.title}>{label}</p>
        <Meta
          description={result.map((item, index) => (
            <li>
              <Checkbox
                key={index}
                className={main.ingredients}
                onChange={onChange}
                value={item.text}
              >
                <p className={isChecked(item.text)}>{item.text}</p>
              </Checkbox>
            </li>
          ))}
        ></Meta>
        <button className={main.button}>
          <a className={main.link} href={`${link}`} target="_blank">
            Instructions
          </a>
        </button>
      </Card>
      <Footer />
    </Layout>
  )
}

export default instruction
