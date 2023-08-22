import React, { useState, useEffect } from 'react'
import { UserOutlined, StarOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Button, Dropdown, Space } from 'antd'
import { Link } from 'react-router-dom'
import Search from './search'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import '../../styles/header.css'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import Password from 'antd/es/input/Password'
import initializeFirebase from '../../../firebaseinit'
import Fav from './addRecipe'

function HomeLayout(props) {
  firebase.initializeApp(initializeFirebase)
  const auth = firebase.auth()
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    provider.setCustomParameters({
      prompt: 'select_account',
    })
    auth.signInWithPopup(provider)
  }

  const [user] = useAuthState(auth as any)

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: user ? (
        <>
          <h1>Hi {auth.currentUser.displayName}</h1>
          <button onClick={() => auth.signOut()}>Sign out</button>
        </>
      ) : (
        <button onClick={signInWithGoogle}>Sign In With google</button>
      ),
    },
  ]

  return (
    <div className="topNav">
      <Link
        className="topNav-title"
        to=""
        onClick={() => {
          window.location.href = '/'
        }}
      >
        Recipe Hub
      </Link>
      <a href="#"></a>
      <Dropdown menu={{ items }} placement="bottomLeft">
        <Button type="link">
          <UserOutlined style={{ fontSize: '20px' }} />
        </Button>
      </Dropdown>

      <Search search={props.input} />
    </div>
  )
}
export default HomeLayout
