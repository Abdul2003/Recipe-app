// import React, { useState } from 'react'
// import { Button } from 'antd'
// import { StarFilled, StarOutlined } from '@ant-design/icons'
// import { arrayUnion } from 'firebase/firestore'
// import firebase from 'firebase/compat/app'
// import 'firebase/compat/auth'
// import 'firebase/compat/firestore'
// import '../../styles/header.css'
// import { useAuthState } from 'react-firebase-hooks/auth'
// import initializeFirebase from '../../../firebaseinit'
// import { onAuthStateChanged } from 'firebase/auth'

// function addRecipe(props) {
//   firebase.initializeApp(initializeFirebase)
//   const [isLiked, setIsLiked] = useState(false)
//   const [isDisliked, setIsDisliked] = useState(true)
//   const [Liked, setLiked] = useState(<StarOutlined />)
//   const [disLiked, setdisLiked] = useState(<StarFilled />)

//   const auth = firebase.auth()
//   const db = firebase.firestore()
//   const [user] = useAuthState(auth as any)

//   console.log(user)
//   // useEffect(() => {
//   //   if (props.firestoreRecipe.includes(props.recipe)) {
//   //     setCheckFav(true)
//   //     setLiked(<CheckOutlined />)
//   //   }
//   // }, [])
//   const userRef = db.collection('Users').doc(user.email)

//   const addFavourite = () => {
//     onAuthStateChanged(auth, () => {
//       userRef.get().then((docSnapshot) => {
//         if (props.firestoreRecipe.includes(props.recipe)) {
//           console.log('null')
//           alert('null')
//         }
//         if (docSnapshot.exists) {
//           userRef.update({
//             Favourites: arrayUnion({
//               Recipe: props.recipe,
//               Id: props.id,
//               Image: props.image,
//             }),
//           })
//         } else {
//           userRef.set({
//             Favourites: arrayUnion({
//               Recipe: props.recipe,
//               Id: props.id,
//               Image: props.image,
//             }),
//           })
//         }
//       })

//       setLiked(<StarFilled />)
//       setdisLiked(<StarFilled />)
//       setIsLiked(true)
//       setIsDisliked(true)
//     })
//     console.log('added')
//   }
//   const RemoveFavourite = () => {
//     userRef.update({
//       Favourites: firebase.firestore.FieldValue.arrayRemove({
//         Recipe: props.recipe,
//         Id: props.id,
//         Image: props.image,
//       }),
//     })

//     setdisLiked(<StarOutlined />)
//     setLiked(<StarOutlined />)
//     setIsLiked(false)
//     setIsDisliked(false)
//     console.log('removed')
//   }

//   function dislikeRecipe() {
//     isLiked == false ? addFavourite() : RemoveFavourite()
//     console.log(isLiked)
//   }

//   function likeRecipe() {
//     isDisliked == false ? addFavourite() : RemoveFavourite()
//     console.log(isLiked)
//   }

//   console.log(props.firestoreRecipe)
//   console.log(props.recipe)
//   console.log(isLiked)

//   return props.firestoreRecipe.includes(props.recipe) ? (
//     <Button onClick={likeRecipe} type="link">
//       {disLiked}
//     </Button>
//   ) : (
//     <Button onClick={dislikeRecipe} type="link">
//       {Liked}
//     </Button>
//   )
// }

// export default addRecipe
