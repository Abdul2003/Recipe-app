import React, { useState } from 'react'
import { Input } from 'antd'
import 'antd/dist/reset.css'
import { useHistory } from 'react-router-dom'
import { stat } from 'fs'
const { Search } = Input

function search(props) {
  const [placeholder, setPlaceholder] = useState('Search A Recipe')
  const [status, setStatus] = useState(null)
  const router = useHistory()
  const onSearch = (value: string) => {
    if (value == '') {
      setPlaceholder('This Field Should Not Be Empty')
      setStatus('error')
    } else {
      const APP_ID = '32d889fc'
      const APP_KEY = '48835bf785e2402c93e208cb5df68988'

      props.search([
        `https://api.edamam.com/api/recipes/v2?type=public&q=${value}&app_id=${APP_ID}&app_key=${APP_KEY}`,
      ])
      router.push({ search: `q=${value}` })
      props.setLoad(false)
      props.inputValue(value)
      // props.search(value)
      // window.location.reload()
    }
  }
  return (
    <Search
      className="input"
      placeholder={placeholder}
      status={status}
      onSearch={onSearch}
      enterButton
    />
  )
}
export default search
