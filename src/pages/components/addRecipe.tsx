import React, { useState } from 'react'
import { Button, message } from 'antd'
import { StarFilled, StarOutlined } from '@ant-design/icons'
import { arrayUnion } from 'firebase/firestore'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'
import initializeFirebase from '../../../firebaseinit'
import { onAuthStateChanged } from 'firebase/auth'

function addRecipe(props) {
  firebase.initializeApp(initializeFirebase)
  const [isLiked, setIsLiked] = useState(false)
  const [isDisliked, setIsDisliked] = useState(true)
  const [Liked, setLiked] = useState(<StarOutlined />)
  const [disLiked, setdisLiked] = useState(<StarFilled />)

  const auth = firebase.auth()
  const db = firebase.firestore()
  const [user] = useAuthState(auth as any)
  const [messageApi, contextHolder] = message.useMessage()

  console.log(user)
  const userRef = db.collection('Users').doc(user.email)

  const addFavourite = () => {
    onAuthStateChanged(auth, () => {
      userRef.get().then((docSnapshot) => {
        console.log(docSnapshot)
        if (docSnapshot.exists) {
          userRef.update({
            Favourites: arrayUnion({
              Recipe: props.recipe,
              Id: props.id,
              //LINK OF IMAGE CHANGES SO DELETING FROM FAVOURITES WONT WORK
              //Image: props.image,
            }),
          })
        } else {
          userRef.set({
            Favourites: arrayUnion({
              Recipe: props.recipe,
              Id: props.id,
              //LINK OF IMAGE CHANGES SO DELETING FROM FAVOURITES WONT WORK
              //Image: props.image,
            }),
          })
        }
      })

      setLiked(<StarFilled />)
      setdisLiked(<StarFilled />)
      setIsLiked(true)
      setIsDisliked(true)
      messageApi.info('Recipe Added To Favourites!✔️')
    })
    console.log('added')
    console.log(props.firestoreRecipe)
    console.log(props.recipe)
  }
  const RemoveFavourite = () => {
    userRef.update({
      Favourites: firebase.firestore.FieldValue.arrayRemove({
        Recipe: props.recipe,
        Id: props.id,
        //LINK OF IMAGE CHANGES SO DELETING FROM FAVOURITES WONT WORK
        //Image: props.image,
      }),
    })

    setdisLiked(<StarOutlined />)
    setLiked(<StarOutlined />)

    setIsDisliked(false)
    setIsLiked(false)
    messageApi.info('Recipe Removed From Favourites!💔')
  }

  function dislikeRecipe(e) {
    isLiked == false ? addFavourite() : RemoveFavourite()
    console.log(isLiked)
    e.preventDefault()
  }

  function likeRecipe(e) {
    isDisliked == false ? addFavourite() : RemoveFavourite()
    console.log(isLiked)
    e.preventDefault()
  }

  console.log(props.firestoreRecipeId)
  console.log(props.recipe)
  console.log(isLiked)

  return props.firestoreRecipeId.includes(props.id) ? (
    <>
      {contextHolder}
      <Button onClick={likeRecipe} type="link">
        {disLiked}
      </Button>
    </>
  ) : (
    <>
      {contextHolder}
      <Button onClick={dislikeRecipe} type="link">
        {Liked}
      </Button>
    </>
  )
}

export default addRecipe
