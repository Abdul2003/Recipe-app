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
  const [checkFav, setCheckFav] = useState(false)
  const [checkFav2, setCheckFav2] = useState(true)
  const [Liked, setLiked] = useState(<StarOutlined />)
  const [disLiked, setdisLiked] = useState(<StarFilled />)

  const auth = firebase.auth()
  const db = firebase.firestore()
  const [user] = useAuthState(auth as any)
  const [messageApi, contextHolder] = message.useMessage()

  console.log(user)
  // useEffect(() => {
  //   if (props.firestoreRecipe.includes(props.recipe)) {
  //     setCheckFav(true)
  //     setLiked(<CheckOutlined />)
  //   }
  // }, [])
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
      setCheckFav(true)
      setCheckFav2(true)
      messageApi.info('Recipe Added To Favourites!❤️')
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
    setCheckFav(false)
    setCheckFav2(false)
    messageApi.info('Recipe Removed From Favourites!💔')
  }

  function dislikeRecipe(e) {
    checkFav == false ? addFavourite() : RemoveFavourite()
    console.log(checkFav)
    e.preventDefault()
  }

  function likeRecipe(e) {
    checkFav2 == false ? addFavourite() : RemoveFavourite()
    console.log(checkFav)
    e.preventDefault()
  }

  console.log(props.firestoreRecipe)
  console.log(props.recipe)
  console.log(checkFav)

  return props.firestoreRecipe.includes(props.recipe) ? (
    <>
      {contextHolder}
      <Button onClick={likeRecipe} type="link">
        {disLiked}
      </Button>
    </>
  ) : (
    <>
      <Button onClick={dislikeRecipe} type="link">
        {Liked}
      </Button>
    </>
  )
}

export default addRecipe
