import React from 'react'
import type { Theme } from 'vite-plugin-react-pages'
import { useStaticData } from 'vite-plugin-react-pages/client'
import Error from './components/error'

const theme: Theme = ({ loadedData, loadState }) => {
  const staticData = useStaticData()
  console.log('#Theme', staticData, loadedData, loadState)

  // You can generate side nav menu from staticData
  // const sideMenuData = useMemo(() => generateSideMenu(staticData), [staticData])

  if (loadState.type === '404')
    return <Error error={`Error ${loadState.type}`} />
  if (loadState.type === 'load-error') return <Error error={'Load Error'} />
  if (loadState.type === 'loading') return <p></p>

  // loadState.type === 'loaded'
  // Runtime page data for current page
  const pageData = loadedData[loadState.routePath]
  // the default export of the main module
  const Component = pageData.main.default
  return <Component />
}

export default theme
