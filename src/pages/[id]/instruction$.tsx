import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Layout, Card, Checkbox, Input, Row, Col } from 'antd'
import { useHistory } from 'react-router-dom'
import type { CheckboxChangeEvent } from 'antd/es/checkbox'
import Header from '../components/header'
import Footer from '../components/footer'
import className from '../../styles/instruction.module.css'
import background from '.././resturant.jpg'
import { TabTitle } from '../../../TitleName.js'
import axios from 'axios'
import Loading from '../components/loading'
import ErrorPage from '../components/error'
import Favourite from '../components/addRecipe'
import { getFirestore, doc, getDoc } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'
import firebase from 'firebase/compat/app'
import initializeFirebase from '../../../firebaseinit'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import '../../index.css'
import 'antd/dist/reset.css'

const { Search } = Input
const { Meta } = Card

function RecipePage() {
  firebase.initializeApp(initializeFirebase)
  const auth = firebase.auth()
  const [user] = useAuthState(auth as any)
  const { id } = useParams<{ id: string }>()
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState(null)
  const [result, setResult] = useState([])
  const [instructions, setInstructions] = useState([])
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
  const [recipeId, setRecipeId] = useState([])
  const [title, setTitle] = useState('🍽️ Recipe Hub')
  const [FirestoreResult, setFirestoreResult] = useState([])

  useEffect(() => {
    axios
      .get(
        `https://api.edamam.com/api/recipes/v2/${id}?type=public&beta=false&app_id=32d889fc&app_key=48835bf785e2402c93e208cb5df68988&instructions=true`
      )
      .then(
        (response) => {
          setIsLoaded(true)
          setResult(response.data.recipe.ingredients)
          //setInstructions(response.data.recipe.instructionLines)
          setTime(response.data.recipe.totalTime)
          setLabel(response.data.recipe.label)
          setImage(response.data.recipe.image)
          setLink(response.data.recipe.url)
          setSource(response.data.recipe.source)
          setDietaryLabels(response.data.recipe.healthLabels)
          setCalories(response.data.recipe.calories)
          setNutrients(response.data.recipe.digest)
          setTitle(`🍽️ ${label}`)
          setRecipeId(response.data.recipe.uri.substr(51))
          console.log(response.data.recipe)
        },
        (error) => {
          setIsLoaded(true)
          setError(error)
        }
      )
    const fetchData = async () => {
      const db = getFirestore()
      const auth = getAuth()
      onAuthStateChanged(auth, (user) => {
        const colRef = doc(db, 'Users', user.email)
        getDoc(colRef).then((doc) => {
          const getRecipe = doc.data().Favourites
          console.log(getRecipe)

          setFirestoreResult(getRecipe.map((item) => item.Id))

          return getRecipe
        })
      })
    }
    fetchData().catch(console.error)
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
          <Row>
            <Col className="flex items-center" xs={24} sm={10} md={9}>
              {' '}
              <div className={className.imageContainer}>
                <img
                  className={className.image}
                  alt={`${label}`}
                  src={`${image}`}
                />
              </div>
            </Col>
            <Col xs={24} sm={13} md={14}>
              <div className={className.holder}>
                <div className={className.title}>
                  <p>{label}</p>{' '}
                  <span>
                    {user ? (
                      <Favourite
                        id={recipeId}
                        recipe={label}
                        firestoreRecipeId={FirestoreResult}
                        image={image}
                        className={className.favouriteBtn}
                      />
                    ) : (
                      ''
                    )}
                  </span>
                </div>
                <div className={className.information}>
                  {minToHours > 60 ? (
                    <div className={className.information_text}>
                      Preparation Time
                      <p>
                        {' '}
                        {Math.floor(minToHours / 60)} Hour(s), {minToHours % 60}{' '}
                        Minutes
                      </p>
                    </div>
                  ) : (
                    <div className={className.information_text}>
                      Preparation Time
                      <p>{minToHours} Minutes</p>
                    </div>
                  )}
                  <div className={className.information_text}>
                    Servings
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
                    Calories/Serving
                    <p>
                      {TextChange == '0' || TextChange == ''
                        ? Math.floor(Number(calories) / 1)
                        : Math.floor(Number(calories) / Number(TextChange))}
                    </p>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>

        <div className={className.content}>
          <Row gutter={[48, 24]}>
            <Col xs={24} sm={12} md={12} lg={12}>
              <div className={className.ingredients}>
                <h3 className={className.ingredientsTitle}>Ingredients</h3>
                <Meta
                  description={result.map((item, index) => (
                    <li>
                      <Checkbox
                        key={index}
                        onChange={onChange}
                        value={item.text}
                      >
                        {/* WIDTH OF CHECKBOX TEXT IS MAKING THE CARD SIZES OF SOME RECIPES BIGGER THAN OTHERS,
                         CHECK "New York Shack Burger Crackers Recipe" RECIPE FOR EXAMPLE AND COMPARE WITH OTHER RECIPE CARDS */}
                        <p className={isChecked(item.text)}>{item.text}</p>
                      </Checkbox>
                    </li>
                  ))}
                ></Meta>
                {instructions.length == 0 ? (
                  <div>
                    <a className="text-white" href={`${link}`} target="_blank">
                      <button className={className.button}>
                        Instructions{' '}
                      </button>
                      <span className="ml-1 text-black">On </span>
                      <span className="ml-1 text-black hover:text-blue-600 underline">
                        {source}
                      </span>
                    </a>
                  </div>
                ) : (
                  <div className={className.instructions}>
                    <h3 className={className.instructionsTitle}>
                      Instructions
                    </h3>

                    {instructions.map((item, index) => (
                      <li>
                        <Checkbox key={index} onChange={onChange} value={item}>
                          {/* WIDTH OF CHECKBOX TEXT IS MAKING THE CARD SIZES OF SOME RECIPES BIGGER THAN OTHERS,
                        CHECK "New York Shack Burger Crackers Recipe" RECIPE FOR EXAMPLE AND COMPARE WITH OTHER RECIPE CARDS */}
                          <p className={isChecked(item)}>{item}</p>
                        </Checkbox>
                      </li>
                    ))}
                  </div>
                )}
              </div>
            </Col>

            <Col xs={24} sm={12} md={12} lg={12}>
              <div className={className.nutrition}>
                <h3 className="text-lg font-semibold border-b-2 border-black">
                  Nutrition
                </h3>
                <div>
                  <h3 className="text-sm font-semibold">Dietary Labels</h3>
                  <ul className={`${className.healthLabels}`}>
                    {dietaryLabels.map((item) => (
                      <li className="inline-block font-semibold">
                        &nbsp;{item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-semibold">Nutrients</h3>
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
            </Col>
          </Row>
        </div>
      </Card>
      <Footer />
    </Layout>
  )
}

export default RecipePage
