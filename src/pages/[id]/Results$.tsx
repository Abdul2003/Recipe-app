import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Card, List, Button, Row, Col, Pagination, Spin } from 'antd'
import type { MenuProps } from 'antd'
import { PropertySafetyFilled, StarOutlined } from '@ant-design/icons'
import { TabTitle } from '../../../TitleName.js'
import '../../index.css'
import '../../styles/results.css'
import 'antd/dist/reset.css'
import '../../styles/header.css'
import Topnav from '../components/header'
import background from '.././resturant.jpg'
import Footer from '../components/footer'
import axios from 'axios'
import Loading from '../components/loading'
import ErrorPage from '../components/error'
import Favourite from '../components/addRecipe'
import { getFirestore, doc, getDoc } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'
import firebase from 'firebase/compat/app'
import initializeFirebase from '../../../firebaseinit'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { merge } from 'antd/es/theme/util/statistic.js'

const { Meta } = Card

function resultsPage() {
  firebase.initializeApp(initializeFirebase)
  const APP_ID = '32d889fc'
  const APP_KEY = '48835bf785e2402c93e208cb5df68988'
  const auth = firebase.auth()
  const [user] = useAuthState(auth as any)
  const params = new URLSearchParams(location.search).get('q')
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isNextResultLoaded, setIsNextResultLoaded] = useState(null)
  const [results, setResults] = useState([])
  const [FirestoreResult, setFirestoreResult] = useState([])
  const [search, setSearch] = useState()
  const [cuisineTypeFilter, setCuisineTypeFilter] = useState(null)
  const [dietFilter, setDietFilter] = useState(null)
  const [dishTypeFilter, setDishTypeFilter] = useState(null)
  const [page, setPage] = useState(1)
  const [recipeData, setRecipeData] = useState([
    `https://api.edamam.com/api/recipes/v2?type=public&q=${params}&app_id=${APP_ID}&app_key=${APP_KEY}`,
  ])
  const [nextPageLink, setNextPageLink] = useState()
  const [nextPageError, setnextPageError] = useState()

  const [route, setRoute] = useState()
  TabTitle(`🍽️ ${params} Results`)
  useEffect(() => {
    axios
      .all(recipeData.map((endpoint) => axios.get(endpoint)))
      .then(
        (response) => {
          console.log(response)
          let data = []
          response.forEach((item) => {
            data = data.concat(item.data.hits)
            console.log(data)
            console.log(item.data.hits)
            setResults(data)
            setIsLoaded(true)
            setIsNextResultLoaded(true)
            setNextPageLink(item.data._links.next.href)

            console.log(nextPageLink)
          })
        },
        (error) => {
          setError(error)
        }
      )
      .catch((error) => {
        console.log(error)
        //THIS BECOMES UNDEFINED WHEN RECIPE RESULTS LINK HAS REACHED THE END
        setnextPageError(error)
      })

    const fetchData = async () => {
      const db = getFirestore()
      const auth = getAuth()
      onAuthStateChanged(auth, (user) => {
        const colRef = doc(db, 'Users', user.email)
        getDoc(colRef).then((doc) => {
          const getRecipe = doc.data().Favourites

          setFirestoreResult(getRecipe.map((item) => item.Id))

          return getRecipe
        })
      })
    }
    fetchData().catch(console.error)
  }, [recipeData])

  if (error) {
    return (
      <div>
        <ErrorPage error={error.message} />
      </div>
    )
  } else if (isLoaded == false) {
    return (
      <>
        <Topnav
          filterCuisineType={(filter) => setCuisineTypeFilter(filter)}
          filterDiet={(filter) => setDietFilter(filter)}
          filterDishType={(filter) => setDishTypeFilter(filter)}
          input={(search) => setRecipeData(search)}
          isLoaded={(loadState) => setIsLoaded(loadState)}
        />
        <Loading />
      </>
    )
  }

  const data = results.map((item) => ({
    image: item.recipe.image,
    title: item.recipe.label,
    id: item.recipe.uri.substr(51),
    cuisinetype: item.recipe.cuisineType,
    dietLabels: item.recipe.dietLabels,
    dishType: item.recipe.dishType,
    time:
      item.recipe.totalTime > 60
        ? Math.floor(item.recipe.totalTime / 60) +
          ' Hours' +
          ', ' +
          (item.recipe.totalTime % 60) +
          ' ' +
          'Minutes'
        : item.recipe.totalTime + ' ' + 'Minutes',
  }))
  console.log(data.map((item) => item.title))

  if (results.length === 0) {
    return (
      <>
        <Topnav
          filterCuisineType={(filter) => setCuisineTypeFilter(filter)}
          filterDiet={(filter) => setDietFilter(filter)}
          filterDishType={(filter) => setDishTypeFilter(filter)}
          input={(search) => setRecipeData(search)}
          isLoaded={(loadState) => setIsLoaded(loadState)}
        />
        <div
          className="background"
          style={{
            backgroundImage: `url(${background})`,
          }}
        >
          <h1>No Recipe Found</h1>
          <Footer />
        </div>
      </>
    )
  }
  const displayItems = data
    .filter((cuisine) =>
      typeof cuisineTypeFilter == 'string'
        ? cuisine.cuisinetype.includes(cuisineTypeFilter)
        : cuisine
    )
    .filter((diet) =>
      typeof dietFilter == 'string'
        ? diet.dietLabels.includes(dietFilter)
        : diet
    )
    .filter((dish) =>
      typeof dishTypeFilter == 'string'
        ? dish.dishType.includes(dishTypeFilter)
        : dish
    )
  return (
    <div>
      <Topnav
        filterCuisineType={(filter) => setCuisineTypeFilter(filter)}
        filterDiet={(filter) => setDietFilter(filter)}
        filterDishType={(filter) => setDishTypeFilter(filter)}
        input={(search) => setRecipeData(search)}
        isLoaded={(loadState) => setIsLoaded(loadState)}
      />

      <div
        className="background"
        style={{
          backgroundImage: `url({background})`,
        }}
      >
        <List
          grid={{ xs: 1, sm: 2, md: 3, lg: 3, xl: 4, xxl: 5 }}
          dataSource={displayItems}
          // pagination={{
          //   pageSize: 10,
          //   current: page,
          //   onChange: (value) => setPage(value),
          //   total: displayItems.length,
          // }}
          renderItem={(item) => (
            <>
              <div className="card">
                <Link target="_blank" to={`/${item.id}/instruction`}>
                  {/* cover={
                  <Link target="_blank" to={`/${item.id}/instruction`}>
                    <img className="imgr" src={`${item.image}`} />
                  </Link>
                } */}
                  <Row gutter={{}}>
                    <Col xs={12} sm={24} className="imageCover">
                      <img className="cardImage" src={`${item.image}`} />
                    </Col>

                    <Col xs={12} sm={24} className="cardInfo">
                      <Meta
                        title={
                          <>
                            <h1 className="cardTitle text-lg">{item.title}</h1>
                            <p className="time">{item.time}</p>
                            {user ? (
                              <Favourite
                                id={item.id}
                                recipe={item.title}
                                firestoreRecipeId={FirestoreResult}
                                image={item.image}
                              />
                            ) : (
                              ''
                            )}
                          </>
                        }
                      />
                    </Col>
                  </Row>
                </Link>
              </div>
            </>
          )}
        />

        {
          //HIDE "NEXT" BUTTON IF THE RECIPE RESULTS IS NOT A MULTIPLE OF 20 BECAUSE IT RETURNS 20 AT A TIME AND IF "nexPageLink" BECOMES UNDEFINED WHICH MEANS THE END OF THE RECIPE LIST HAS BEEN REACHED
          displayItems.length % 20 != 0 ||
          displayItems.length == 0 ||
          nextPageError == 'TypeError: item.data._links.next is undefined' ? (
            <></>
          ) : (
            <div className="flex justify-end m-5">
              <Button
                type="primary"
                onClick={() => {
                  setRecipeData((recipeData) => recipeData.concat(nextPageLink))
                  setIsNextResultLoaded(false)
                  console.log(recipeData)
                }}
              >
                Load More
              </Button>
            </div>
          )
        }

        {isNextResultLoaded == false ? (
          <div className="loading-spinner">
            <Spin size="large" tip="Loading..." />
          </div>
        ) : (
          <></>
        )}
      </div>

      <Footer />
    </div>
  )
}

export default resultsPage
