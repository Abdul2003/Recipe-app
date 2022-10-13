import React from 'react'
import { Input } from 'antd'
import 'antd/dist/antd.css'
const { Search } = Input
function search(props) {
  const onSearch = (value: string) => props.bar(value)
  console.log(props.s)
  return <Search placeholder="Search Recipe" onSearch={onSearch} enterButton />
}
export default search
