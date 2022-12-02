import React from 'react'
import { Input } from 'antd'
import 'antd/dist/reset.css'
const { Search } = Input

function search(props) {
  const onSearch = (value: string) => {
    props.search(value)
  }
  return (
    <Search
      className="input"
      placeholder="Search Recipe"
      onSearch={onSearch}
      enterButton
    />
  )
}
export default search
