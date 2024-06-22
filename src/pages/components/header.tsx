import React, { useState, useEffect } from 'react'
import {
  UserOutlined,
  FilterOutlined,
  GoogleOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
} from '@ant-design/icons'
import {
  MenuProps,
  Row,
  Col,
  Button,
  Dropdown,
  Radio,
  RadioChangeEvent,
  Layout,
  Menu,
  Input,
  Modal,
  message,
} from 'antd'
import { Link } from 'react-router-dom'
import Search from './search'
import firebase from 'firebase/compat/app'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import { getFirestore, setDoc, doc } from 'firebase/firestore'
import '../../styles/header.css'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import Password from 'antd/es/input/Password'
import initializeFirebase from '../../../firebaseinit'
import Fav from './addRecipe'

function HomeLayout(props) {
  const { Header } = Layout
  const [value, setValue] = useState(1)
  const [messageApi, contextHolder] = message.useMessage()

  function cuisineTypeFilter(cuisineType: RadioChangeEvent) {
    console.log('checked = ', cuisineType.target.value)
    props.filterCuisineType(cuisineType.target.value)
    setValue(cuisineType.target.value)
  }
  function dietFilter(diet: RadioChangeEvent) {
    console.log('checked = ', diet.target.value)
    props.filterDiet(diet.target.value)
    setValue(diet.target.value)
  }
  function dishTypeFilter(dishType: RadioChangeEvent) {
    console.log('checked = ', dishType.target.value)
    props.filterDishType(dishType.target.value)
    setValue(dishType.target.value)
  }

  firebase.initializeApp(initializeFirebase)
  const auth = firebase.auth()
  const db = firebase.firestore()
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    provider.setCustomParameters({
      prompt: 'select_account',
    })
    auth.signInWithPopup(provider)
  }

  // Modal Box And SignUp Fields
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [signUpEmail, setSignUpEmail] = useState('')
  const [signUpPassword, setSignUpPassword] = useState('')
  const [EmailPlaceholder, setEmailPlaceholder] = useState('Email')
  const [PasswordPlaceholder, setPasswordPlaceholder] = useState('Password')
  const [emailStatus, setEmailStatus] = useState(null)
  const [passwordStatus, setPasswordStatus] = useState(null)
  const [signUpPasswordType, setSignUpPasswordType] = useState('password')
  const [signUpEye, setSignUpEye] = useState(<EyeOutlined />)

  const toggleSignupPassword = () => {
    if (signUpPasswordType == 'password') {
      setSignUpPasswordType('text')
      setSignUpEye(<EyeInvisibleOutlined />)
    } else {
      setSignUpPasswordType('password')
      setSignUpEye(<EyeOutlined />)
    }
  }

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = () => {
    if (signUpPassword.length < 6) {
      messageApi.info('Password Should Be At Least Six Characters')
      if (signUpEmail == '') {
        setEmailPlaceholder('This Field Should Not Be Empty')
        setEmailStatus('error')
      }
      if (signUpPassword == '') {
        setPasswordPlaceholder('This Field Should Not Be Empty')
        setPasswordStatus('error')
      }
    } else {
      createUserWithEmailAndPassword(auth, signUpEmail, signUpPassword)
      messageApi.info('Account Created')
      handleCancel()
    }
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  // Handle SignIn
  const [signInEmail, setSignInEmail] = useState('')
  const [signInPassword, setSignInPassword] = useState('')
  const [signInEmailPlaceholder, setSignInEmailPlaceholder] = useState('Email')
  const [signInPasswordPlaceholder, setSignInPasswordPlaceholder] =
    useState('Password')
  const [signInEmailStatus, setSignInEmailStatus] = useState(null)
  const [signInPasswordStatus, setSignInPasswordStatus] = useState(null)
  const [signInPasswordType, setSignInPasswordType] = useState('password')
  const [signInEye, setSignInEye] = useState(<EyeOutlined />)

  const signIn = () => {
    if (signInEmail == '') {
      setSignInEmailPlaceholder('This Field Should Not Be Empty')
      setSignInEmailStatus('error')
    }
    if (signInPassword == '') {
      setSignInPasswordPlaceholder('This Field Should Not Be Empty')
      setSignInPasswordStatus('error')
    } else {
      signInWithEmailAndPassword(auth, signInEmail, signInPassword)
        .then(() => {
          messageApi.info('Sign In Successful')
        })
        .catch((error) => {
          messageApi.info(error.message)
        })
    }
  }

  const toggleSigninPassword = () => {
    if (signInPasswordType == 'password') {
      setSignInPasswordType('text')
      setSignInEye(<EyeInvisibleOutlined />)
    } else {
      setSignInPasswordType('password')
      setSignInEye(<EyeOutlined />)
    }
  }

  const [user] = useAuthState(auth as any)
  const cuisineTypeOptions = [
    { label: 'None', value: 1 },
    { label: 'American', value: 'american' },
    { label: 'Asian', value: 'asian' },
    { label: 'British', value: 'british' },
    { label: 'Caribbean', value: 'caribbean' },
    { label: 'Central Europe', value: 'central europe' },
    { label: 'Chinese', value: 'chinese' },
    { label: 'Eastern europe', value: 'eastern europe' },
    { label: 'French', value: 'french' },
    { label: 'Greek', value: 'greek' },
    { label: 'Indian', value: 'indian' },
    { label: 'Italian', value: 'italian' },
    { label: 'Japanese', value: 'japanese' },
    { label: 'Korean', value: 'korean' },
    { label: 'Kosher', value: 'kosher' },
    { label: 'Mediterranean', value: 'mediterranean' },
    { label: 'Mexican', value: 'mexican' },
    { label: 'Middle Eastern', value: 'middle eastern' },
    { label: 'Nordic', value: 'nordic' },
    { label: 'South American', value: 'south american' },
    { label: 'South East Asian', value: 'south east asian' },
    { label: 'World', value: 'world' },
  ]

  const dietOptions = [
    { label: 'None', value: 1 },
    { label: 'Balanced', value: 'Balanced' },
    { label: 'High-Fiber', value: 'High-Fiber' },
    { label: 'High-Protein', value: 'High-Protein' },
    { label: 'Low-Carb', value: 'Low-Carb' },
    { label: 'Low-Fat', value: 'Low-Fat' },
    { label: 'Low-Sodium', value: 'Low-Sodium' },
  ]

  const dishTypeOptions = [
    { label: 'None', value: 1 },
    { label: 'Alcohol Cocktail', value: 'alcohol cocktail' },
    { label: 'Biscuits And Cookies', value: 'biscuits and cookies' },
    { label: 'Bread', value: 'bread' },
    { label: 'Cereals', value: 'cereals' },
    { label: 'Condiments and Sauces', value: 'condiments and sauces' },
    { label: 'Desserts', value: 'desserts' },
    { label: 'Drinks', value: 'drinks' },
    { label: 'Egg', value: 'egg' },
    { label: 'Ice Cream And Custard', value: 'ice cream and custard' },
    { label: 'Main Course', value: 'main course' },
    { label: 'Pancake', value: 'pancake' },
    { label: 'Pasta', value: 'pasta' },
    { label: 'Pastry', value: 'pastry' },
    { label: 'Pies And Tarts', value: 'pies and tarts' },
    { label: 'Pizza', value: 'pizza' },
    { label: 'Preps', value: 'preps' },
    { label: 'Preserve', value: 'preserve' },
    { label: 'Salad', value: 'salad' },
    { label: 'Sandwiches', value: 'sandwiches' },
    { label: 'Seafood', value: 'seafood' },
    { label: 'Side Dish', value: 'side dish' },
    { label: 'Soup', value: 'soup' },
    { label: 'Special Occasions', value: 'special occasions' },
    { label: 'Starter', value: 'starter' },
    { label: 'Sweets', value: 'sweets' },
  ]

  const filterDropdown: MenuProps['items'] = [
    {
      key: '1',
      label: 'Cuisine Type',
      type: 'group',
      children: [
        {
          key: '1-1',
          label: (
            <div onClick={(e) => e.stopPropagation()}>
              <Radio.Group
                options={cuisineTypeOptions}
                onChange={cuisineTypeFilter}
              />
            </div>
          ),
        },
      ],
    },
    {
      key: '2',
      label: 'Diet Type',
      type: 'group',
      children: [
        {
          key: '2-1',
          label: (
            <div onClick={(e) => e.stopPropagation()}>
              <Radio.Group options={dietOptions} onChange={dietFilter} />
            </div>
          ),
        },
      ],
    },
    {
      key: '3',
      label: 'Dish Type',
      type: 'group',
      children: [
        {
          key: '3-1',
          label: (
            <div onClick={(e) => e.stopPropagation()}>
              <Radio.Group
                options={dishTypeOptions}
                onChange={dishTypeFilter}
              />
            </div>
          ),
        },
      ],
    },
  ]
  console.log(auth.currentUser)
  const items: MenuProps['items'] = user
    ? [
        {
          key: '1',
          label: (
            <>
              {auth.currentUser.displayName == null ? (
                <h1 className="text-base font-normal">
                  Signed In As{' '}
                  <p className="inline text-gray-500">
                    {auth.currentUser.email}
                  </p>
                </h1>
              ) : (
                <h1 className="text-base font-normal">
                  Hi {auth.currentUser.displayName}
                </h1>
              )}
            </>
          ),
        },
        {
          key: '2',
          label: (
            <Link to={'/pages/favourites'}>
              <h1 className="text-base font-normal">Favourites</h1>
            </Link>
          ),
        },

        {
          key: '3',
          label: (
            <div className="flex justify-center">
              <Button
                type="primary"
                danger
                onClick={() => {
                  auth.signOut()
                  window.location.reload()
                }}
              >
                Sign out
              </Button>
            </div>
          ),
        },
      ]
    : [
        {
          key: '1',
          label: (
            <div
              className="flex justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <Input
                value={signInEmail}
                onChange={(e) => setSignInEmail(e.target.value)}
                placeholder={signInEmailPlaceholder}
                status={signInEmailStatus}
              />
            </div>
          ),
        },
        {
          key: '2',
          label: (
            <div className="" onClick={(e) => e.stopPropagation()}>
              <Input
                className="w-10/12"
                type={signInPasswordType}
                value={signInPassword}
                onChange={(e) => setSignInPassword(e.target.value)}
                placeholder={signInPasswordPlaceholder}
                status={signInPasswordStatus}
              />
              <p className="inline" onClick={toggleSigninPassword}>
                {' '}
                {signInEye}
              </p>
            </div>
          ),
        },
        {
          key: '3',
          label: (
            <div
              className="flex justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <Button type="primary" onClick={signIn}>
                Sign In
              </Button>
            </div>
          ),
        },
        {
          key: '4',
          label: (
            <div className="flex justify-center">
              <Button onClick={signInWithGoogle}>
                <GoogleOutlined /> Sign In With Google
              </Button>
            </div>
          ),
        },
        {
          key: '5',
          label: (
            <div className="flex justify-center">
              <a onClick={showModal}>Sign Up</a>
            </div>
          ),
        },
      ]

  return (
    <div className="topNav">
      {contextHolder}
      <Row gutter={{ xs: 0 }}>
        <Col xs={10} sm={8}>
          <Link
            to=""
            onClick={() => {
              window.location.href = '/'
            }}
          >
            <h1 className="topNav-title">Recipe Hub</h1>
          </Link>
        </Col>

        <Col xs={9} sm={8}>
          <Search
            inputValue={props.title}
            search={props.input}
            setLoad={props.isLoaded}
          />
        </Col>

        <Col xs={5} sm={8}>
          <Menu className="menu" mode="horizontal">
            <div className="user">
              <Menu.Item>
                <Dropdown
                  placement="bottomLeft"
                  menu={{ items: filterDropdown }}
                  trigger={['click']}
                >
                  <Button type="text">
                    <FilterOutlined style={{ fontSize: '20px' }} />
                  </Button>
                </Dropdown>
                <Dropdown
                  menu={{ items }}
                  placement="bottomLeft"
                  trigger={['click']}
                >
                  <Button type="text">
                    <UserOutlined style={{ fontSize: '20px' }} />
                  </Button>
                </Dropdown>
              </Menu.Item>
            </div>
          </Menu>
        </Col>
      </Row>
      <Modal
        title="Sign Up"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <label />
        Email
        <Input
          className="m-2"
          placeholder={EmailPlaceholder}
          value={signUpEmail}
          onChange={(e) => setSignUpEmail(e.target.value)}
          status={emailStatus}
        />
        <label>Password</label>
        <Input
          className="m-2 w-11/12"
          type={signUpPasswordType}
          placeholder={PasswordPlaceholder}
          value={signUpPassword}
          onChange={(e) => setSignUpPassword(e.target.value)}
          status={passwordStatus}
        />
        <p className="inline" onClick={toggleSignupPassword}>
          {signUpEye}
        </p>
      </Modal>
    </div>
  )
}
export default HomeLayout
