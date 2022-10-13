import React from 'react'
import { Input, Card, Space } from 'antd'
import { useHistory } from 'react-router-dom'
import '../styles/home.css'
import 'antd/dist/antd.css'
import '../index.css'

import viteConfig from 'vite.config'
const { Search } = Input

const { Meta } = Card

function landing() {
  const router = useHistory()

  const onSearch = (value) =>
    router.push({ search: `q=${value}`, pathname: `/:id` })
  return (
    <>
      <div className={'background'}></div>
      <Card style={{ width: 450, height: 450 }}>
        <h2 className="text-center font-medium text-3xl top-0">Recipe Hub</h2>
        <Search placeholder="Search Recipe" onSearch={onSearch} enterButton />
      </Card>
    </>
  )
}
export default landing
