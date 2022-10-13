import React, { useState, createContext } from 'react'
import mockData from '../data/mockData.json'

export const PeopleContext = createContext()

const PeopleProvider = (props) => {
  const mainData = mockData
  const [peopleData, setPeopleData] = useState(mainData.data)
  const [cloneData, setcloneData] = useState(mainData.data)
  const [inputValue,setInputValue] = useState('')

  return (
    <PeopleContext.Provider value={{ peopleData, setPeopleData, cloneData, setcloneData,inputValue,setInputValue}}>
      {props.children}
    </PeopleContext.Provider>
  )
}

export default PeopleProvider
