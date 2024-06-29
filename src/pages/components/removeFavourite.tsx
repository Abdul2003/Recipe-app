import React, { useState } from 'react'
import { message } from 'antd'
import { DeleteOutlined, DeleteFilled } from '@ant-design/icons'
import '../../styles/favourites.css'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import { onAuthStateChanged } from 'firebase/auth'
function removeFavourite(props) {
  firebase.initializeApp({
    apiKey: 'AIzaSyAv5whcY5qA60ZWgj4qNJwzA7ozjVL4S60',
    authDomain: 'recipe-hub-45704.firebaseapp.com',
    projectId: 'recipe-hub-45704',
    storageBucket: 'recipe-hub-45704.appspot.com',
    messagingSenderId: '920456355985',
    appId: '1:920456355985:web:3edc2caa1fdda7a38b1f30',
    measurementId: 'G-HX1Q318XLX',
  })
  const [onHover, setOnHover] = useState(<DeleteOutlined />)
  const fireAuth = firebase.auth()
  const db = firebase.firestore()
  const [messageApi, contextHolder] = message.useMessage()
  const removeRecipe = (idx, e) => {
    e.preventDefault()
    onAuthStateChanged(fireAuth, (user) => {
      const userRef = db.collection('Users').doc(user.email)
      userRef.update({
        Favourites: firebase.firestore.FieldValue.arrayRemove({
          Recipe: props.recipe,
          Id: props.id,
          // Image: props.image,
        }),
      })
    })
    var arrayCopy = [...props.favouriteRecipes]
    arrayCopy.splice(idx, 1) //remove the the item at the specific index
    props.setFavouriteRecipes(arrayCopy)
    messageApi.info('Recipe Removed From Favourites!💔')
  }

  const mouseOver = () => {
    setOnHover(<DeleteFilled />)
  }
  const mouseLeave = () => {
    setOnHover(<DeleteOutlined />)
  }
  return (
    <>
      {contextHolder}
      <div
        onMouseOver={mouseOver}
        onMouseLeave={mouseLeave}
        className={'mr-3 sm:mr-20'}
        onClick={(e) => removeRecipe(props.index, e)}
      >
        {onHover}
      </div>
    </>
  )
}
export default removeFavourite
