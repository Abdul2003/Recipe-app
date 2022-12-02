import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Layout, Card, Checkbox, Input } from 'antd'
import { useHistory } from 'react-router-dom'
import type { CheckboxChangeEvent } from 'antd/es/checkbox'
import Header from '../components/header$'
import Footer from '../components/footer'
import className from '../../styles/instruction.module.css'
import background from '../../styles/images/background2.jpg'
import { TabTitle } from '../../../TitleName.js'
import axios from 'axios'
import Loading from '../components/loading'
import ErrorPage from '../components/error'
import '../../index.css'
import 'antd/dist/reset.css'

const { Search } = Input
const { Meta } = Card

function RecipePage() {
  const { id } = useParams<{ id: string }>()
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState(null)
  const [result, setResult] = useState([])
  const [label, setLabel] = useState([])
  const [image, setImage] = useState([])
  const [time, setTime] = useState([])
  const [link, setLink] = useState([])
  const [source, setSource] = useState([])
  const [check, setChecked] = useState([])
  const [calories, setCalories] = useState([])
  const [TextChange, setTextChange] = useState('1')
  const [nutrients, setNutrients] = useState([])
  const [dietaryLabels, setDietaryLabels] = useState([])
  const [title, setTitle] = useState('🍽️ Recipe Hub')

  useEffect(() => {
    axios
      .get(
        `https://api.edamam.com/api/recipes/v2/${id}?type=public&beta=false&app_id=32d889fc&app_key=48835bf785e2402c93e208cb5df68988&instructions=true`
      )
      .then(
        (response) => {
          setIsLoaded(true)
          setResult(response.data.recipe.ingredients)
          setTime(response.data.recipe.totalTime)
          setLabel(response.data.recipe.label)
          setImage(response.data.recipe.image)
          setLink(response.data.recipe.url)
          setSource(response.data.recipe.source)
          setDietaryLabels(response.data.recipe.healthLabels)
          setCalories(response.data.recipe.calories)
          setNutrients(response.data.recipe.digest)
          setTitle(`🍽️ ${label}`)
        },
        (error) => {
          setIsLoaded(true)
          setError(error)
        }
      )
  }, [title])
  console.log(window.innerWidth)
  if (error) {
    TabTitle(`🍽️ Recipe Hub`)
    return <ErrorPage error={error.message} />
  } else if (!isLoaded) {
    return (
      <>
        <Header />
        <Loading />
      </>
    )
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
    check.includes(item) ? className.checkedItem : className.not_checked_item

  const minToHours = Number(time)
  const router = useHistory()
  const onSearch = (value) =>
    router.push({ search: `q=${value}`, pathname: `/:id/results` })

  TabTitle(title)

  const handleTextChange = (e) => {
    setTextChange(e.target.value)
  }
  return (
    <Layout
      className={className.background}
      style={{ backgroundImage: `url(${background})` }}
    >
      <Header input={onSearch} />

      <Card className={className.card}>
        <div className={className.cardHeader}>
          <div className={className.imageContainer}>
            <img
              className={className.image}
              alt={`${label}`}
              src={`${image}`}
            />
          </div>
          <div className={className.holder}>
            <div className={className.title}>
              <p>{label}</p>
            </div>
            <div className={className.information}>
              {minToHours > 60 ? (
                <div className={className.information_text}>
                  Preparation Time:
                  <p>
                    {' '}
                    {Math.floor(minToHours / 60)} Hour(s), {minToHours % 60}{' '}
                    Minutes
                  </p>
                </div>
              ) : (
                <div className={className.information_text}>
                  Preparation Time:
                  <p>{minToHours} Minutes</p>
                </div>
              )}
              <div className={className.information_text}>
                Servings:
                <p>
                  <input
                    className="w-7 bg-white shadow-md rounded outline-none text-center"
                    onChange={handleTextChange}
                    value={TextChange}
                    maxLength={2}
                  />
                </p>
              </div>
              <div className={className.information_text}>
                Calories/Serving:
                <p>
                  {TextChange == '0' || TextChange == ''
                    ? Math.floor(Number(calories) / 1)
                    : Math.floor(Number(calories) / Number(TextChange))}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className={className.content}>
          <div className={className.ingredients}>
            <h3 className="text-lg font-semibold">Ingredients</h3>
            <Meta
              description={result.map((item, index) => (
                <li>
                  <Checkbox key={index} onChange={onChange} value={item.text}>
                    <p className={isChecked(item.text)}>{item.text}</p>
                  </Checkbox>
                </li>
              ))}
            ></Meta>

            <div className="mt-3">
              <a className="text-white" href={`${link}`} target="_blank">
                <button className={className.button}>Instructions </button>
                <span className="ml-1 text-black">On </span>
                <span className="ml-1 text-black hover:text-slate-200 underline trains">
                  {' '}
                  {source}{' '}
                </span>
              </a>
            </div>
          </div>
          <div className={className.nutrition}>
            <h3 className="text-lg font-semibold border-b-2 border-black">
              Nutrition
            </h3>
            <div>
              <h3 className="text-sm font-semibold">Dietary Labels:</h3>
              <ul className={`${className.healthLabels}`}>
                {dietaryLabels.map((item) => (
                  <li className="inline-block font-semibold">&nbsp;{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold">Nutrients:</h3>
              {nutrients.map((item) => (
                <>
                  <p className="text-base">
                    {item.label}: {Math.floor(Number(item.daily))}
                    {item.unit}
                  </p>
                </>
              ))}
            </div>
          </div>
        </div>
      </Card>
      <Footer />
    </Layout>
  )
}

export default RecipePage
