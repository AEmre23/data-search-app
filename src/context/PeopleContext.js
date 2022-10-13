import React, { useState, createContext, useEffect } from 'react'
import mockData from '../data/mockData.json'

export const PeopleContext = createContext()

const PeopleProvider = (props) => {
  const [peopleData, setPeopleData] = useState([])
  const [cloneData, setcloneData] = useState([])
  const [inputValue, setInputValue] = useState('')
  
  useEffect(() => {
    if (localStorage.getItem('persondata') === null) {
      localStorage.setItem('persondata', JSON.stringify(mockData.data))
      let mainData = localStorage.getItem('persondata')
      setPeopleData(JSON.parse(mainData))
      setcloneData(JSON.parse(mainData))
    }
    else {
      let mainData = localStorage.getItem('persondata')
      setPeopleData(JSON.parse(mainData))
      setcloneData(JSON.parse(mainData))
    }
  }, []);

  return (
    <PeopleContext.Provider
      value={{
        peopleData,
        setPeopleData,
        cloneData,
        setcloneData,
        inputValue,
        setInputValue
      }}
    >
      {props.children}
    </PeopleContext.Provider>
  )
}

export default PeopleProvider
