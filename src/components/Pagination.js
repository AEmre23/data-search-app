import React, { useState, useContext,useEffect } from 'react'
import { PeopleContext } from '../context/PeopleContext'

const Pagination = ({
  currentPageDatas,
  currentPage,
  setCurrentPage,
  dataPerPage }) => {
  
  const { inputValue, setInputValue, peopleData, setPeopleData, cloneData } = useContext(PeopleContext)
  const pageNumbers = []
  for (let a = 1; a <= Math.ceil(peopleData.length / dataPerPage); a++){
    pageNumbers.push(a)
  }
  const pageNumbersDotted = []
  const pageNumbers123=[1,2,3]
  for (let x = 2; x >= 0; x--){
    pageNumbersDotted.push(pageNumbers.at(-1) - x)
  }
  const pageIncrease = () => {
    if(currentPage!==pageNumbers.length) setCurrentPage(prevValue=>prevValue+1)
  }
  const pageDecrease = () => {
    if(currentPage!==1) setCurrentPage(prevValue=>prevValue-1)
  
  }
  useEffect(() => {
    let numbers = document.getElementsByName('pagenumbers')
    numbers.forEach((each) => {
      if (each.innerText == currentPage) {
        each.style.backgroundColor = '#204080'
        each.style.color = 'white'
      } else {
        each.style.backgroundColor = 'transparent'
        each.style.color = 'black'
      }
    })
  });

  return (
    <div className="pagination">
      <button onClick={pageDecrease} className="decrease-button">Previous</button>
      <div className="pagination-numbers">
      {pageNumbers.length < 7 &&
        <>
          {pageNumbers.map((number) => (
            <div name='pagenumbers' onClick={()=>setCurrentPage(number)} className="page-numbers" key={number}>
              {number}
            </div>
          ))}
        </>
          ||
        <>
            {pageNumbers123.map((number) => (
            <div name='pagenumbers' onClick={()=>setCurrentPage(number)} className="page-numbers" key={number}>
              {number}
            </div>
            ))}
            {!(pageNumbers123.includes(currentPage) || pageNumbersDotted.includes(currentPage)) &&
            <> . . . 
              <div name='pagenumbers' className='page-numbers'> {currentPage} </div>
            . . .</>
              ||
            <div className='dots'> . . . </div>
            }
            {pageNumbersDotted.map((number) => (
            <div name='pagenumbers' onClick={()=>setCurrentPage(number)} className="page-numbers" key={number}>
              {number}
            </div>
            ))}
        </>
      }
      </div>
      <button onClick={pageIncrease} className="increase-button">Next</button>
  </div>
  )
}

export default Pagination
