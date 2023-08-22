import React, { useState } from 'react'
import { Button } from 'antd'
import { StarFilled, StarOutlined } from '@ant-design/icons'
import { arrayUnion } from 'firebase/firestore'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import '../../styles/header.css'
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

  console.log(user)
  // useEffect(() => {
  //   if (props.firestoreRecipe.includes(props.recipe)) {
  //     setCheckFav(true)
  //     setLiked(<CheckOutlined />)
  //   }
  // }, [])
  const userRef = db.collection('Users').doc(user.uid)

  const addFavourite = () => {
    onAuthStateChanged(auth, (user) => {
      userRef.get().then((docSnapshot) => {
        if (docSnapshot.exists) {
          db.collection('Users')
            .doc(user.uid)
            .update({
              Favourites: arrayUnion({
                Recipe: props.recipe,
                id: props.id,
                image: props.image,
              }),
            })
        } else {
          userRef.set({
            Favourites: arrayUnion({
              Recipe: props.recipe,
              id: props.id,
              image: props.image,
            }),
          })
        }
      })

      setLiked(<StarFilled />)
      setdisLiked(<StarFilled />)
      setCheckFav(true)
      setCheckFav2(true)
    })
    console.log('added')
  }
  const RemoveFavourite = () => {
    userRef.update({
      Favourites: firebase.firestore.FieldValue.arrayRemove({
        Recipe: props.recipe,
        id: props.id,
        image: props.image,
      }),
    })

    setdisLiked(<StarOutlined />)
    setLiked(<StarOutlined />)
    setCheckFav(false)
    setCheckFav2(false)
    console.log('removed')
  }

  function toggleFunction() {
    checkFav == false ? addFavourite() : RemoveFavourite()
    console.log(checkFav)
  }

  function al() {
    checkFav2 == false ? addFavourite() : RemoveFavourite()
    console.log(checkFav)
  }

  console.log(props.firestoreRecipe)
  console.log(props.recipe)
  console.log(checkFav)

  return props.firestoreRecipe.includes(props.recipe) ? (
    <Button onClick={al} type="link">
      {disLiked}
    </Button>
  ) : (
    <Button onClick={toggleFunction} type="link">
      {Liked}
    </Button>
  )
}

export default addRecipe
