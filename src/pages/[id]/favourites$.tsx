import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, List, Avatar } from 'antd'
import { DeleteOutlined, DeleteFilled } from '@ant-design/icons'
import '../../styles/favourites.css'
import { doc, getDoc } from 'firebase/firestore'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import Header from '../components/header'
import DeleteRecipe from '../components/deleteRecipe'

function favourites() {
  firebase.initializeApp({
    apiKey: 'AIzaSyAv5whcY5qA60ZWgj4qNJwzA7ozjVL4S60',
    authDomain: 'recipe-hub-45704.firebaseapp.com',
    projectId: 'recipe-hub-45704',
    storageBucket: 'recipe-hub-45704.appspot.com',
    messagingSenderId: '920456355985',
    appId: '1:920456355985:web:3edc2caa1fdda7a38b1f30',
    measurementId: 'G-HX1Q318XLX',
  })
  const [boolean, setBoolean] = useState(false)

  const [onHover, setOnHover] = useState(<DeleteOutlined />)
  const [favouriteRecipes, setFavouriteRecipes] = useState([])
  const fireAuth = firebase.auth()
  const db = firebase.firestore()
  const auth = getAuth()
  const [user] = useAuthState(fireAuth as any)

  useEffect(() => {
    const fetchData = async () => {
      onAuthStateChanged(auth, (user) => {
        const colRef = doc(db, 'Users', user.uid)
        getDoc(colRef).then((doc) => {
          setFavouriteRecipes(doc.data().Favourites)
          console.log(favouriteRecipes)
        })
      })
    }
    fetchData().catch(console.error)
  }, [])
  console.log(
    favouriteRecipes.map((item) => {
      item.Recipe
    })
  )

  console.log([...favouriteRecipes])
  console.log([favouriteRecipes])

  return (
    <>
      <Header />{' '}
      <div>
        <List
          size="small"
          bordered
          style={{ alignContent: 'center' }}
          dataSource={favouriteRecipes}
          renderItem={(item, idx) => (
            <>
              {console.log(idx)}
              <Link target="_blank" to={`/${item.id}/instruction`}>
                <List.Item className="hover:bg-slate-100">
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        className="avatar"
                        src={`${item.image}`}
                        alt="Food image"
                      />
                    }
                    title={<p className="mt-6 inline-block">{item.Recipe}</p>}
                  />

                  {/* {console.log(item.Recipe)} */}

                  {/* <div
                  className="absolute right-0 mr-3 sm:mr-20"
                  onClick={() => {
                    onAuthStateChanged(fireAuth, (user) => {
                      const userRef = db.collection('Users').doc(user.uid)
                      userRef.update({
                        Favourites: firebase.firestore.FieldValue.arrayRemove({
                          Recipe: item.Recipe,
                          id: item.id,
                        }),
                      })
                    })
                    deleteFavourite(idx)
                  }}
                >
                  {onHover} */}
                  <DeleteRecipe
                    favouriteRecipes={favouriteRecipes}
                    setFavouriteRecipes={setFavouriteRecipes}
                    index={idx}
                    recipe={item.Recipe}
                    id={item.id}
                    image={item.image}
                  />
                  {/* </div> */}
                </List.Item>
              </Link>
            </>
          )}
        />
      </div>
    </>
  )
}
export default favourites
