import React, { useState, useEffect } from 'react'
import { UserOutlined, FilterOutlined } from '@ant-design/icons'
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
} from 'antd'
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
  const { Header } = Layout
  const [value, setValue] = useState(1)
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
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    provider.setCustomParameters({
      prompt: 'select_account',
    })
    auth.signInWithPopup(provider)
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
            <Radio.Group
              options={cuisineTypeOptions}
              onChange={cuisineTypeFilter}
            />
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
          label: <Radio.Group options={dietOptions} onChange={dietFilter} />,
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
            <Radio.Group options={dishTypeOptions} onChange={dishTypeFilter} />
          ),
        },
      ],
    },
  ]

  const items: MenuProps['items'] = user
    ? [
        {
          key: '1',
          label: <h1>Hi {auth.currentUser.displayName}</h1>,
        },
        {
          key: '2',
          label: (
            <Link to={'/pages/favourites'}>
              <h1>Favourites</h1>
            </Link>
          ),
        },

        {
          key: '3',
          label: (
            <button
              onClick={() => {
                auth.signOut()
                window.location.reload()
              }}
            >
              Sign out
            </button>
          ),
        },
      ]
    : [
        {
          key: '1',
          label: (
            <button onClick={signInWithGoogle}>Sign In With google</button>
          ),
        },
      ]

  return (
    <div className="topNav">
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
                >
                  <Button type="text">
                    <FilterOutlined style={{ fontSize: '20px' }} />
                  </Button>
                </Dropdown>
                <Dropdown menu={{ items }} placement="bottomLeft">
                  <Button type="text">
                    <UserOutlined style={{ fontSize: '20px' }} />
                  </Button>
                </Dropdown>
              </Menu.Item>
            </div>
          </Menu>
        </Col>
      </Row>
    </div>
  )
}
export default HomeLayout
