import React, { useContext } from 'react'
import { PeopleContext } from '../context/PeopleContext'
import sortIcon from '../assets/sort.png'

const SortData = ({ setDetector }) => {
  
  const { peopleData, setPeopleData } = useContext(PeopleContext)
  
  const openOrder = (e) => {
    if (e.currentTarget.nextElementSibling.style.scale == '1') {
      e.currentTarget.nextElementSibling.style.scale = '0'
      e.currentTarget.nextElementSibling.style.display = 'none'
    } else {
      e.currentTarget.nextElementSibling.style.scale = '1'
      e.currentTarget.nextElementSibling.style.display = 'flex'
    }
  }

  const sortData = (e) => {
    let buttons = document.querySelectorAll('.sort-buttons')
    buttons.forEach((each)=>each.classList.remove('sorted-one'))
    e.target.classList.add('sorted-one')

    setDetector(preVal => preVal + 1) // for trigger useEffect with 'detector' dependicies.
    
    // This function uses button values to understand which sorting method get selected.
    if (e.target.value === 'nameAsc') {
      setPeopleData(peopleData.sort((a, b) => {
        let data1 = a[0].toLowerCase(), data2 = b[0].toLowerCase()
        if (data1 > data2) return 1
        else return -1
      }))
    }
    else if (e.target.value === 'nameDes') {
      setPeopleData(peopleData.sort((a, b) => {
        let data1 = a[0].toLowerCase(), data2 = b[0].toLowerCase()
        if (data1 > data2) return -1
        else return 1
      }))  
    }
    else if (e.target.value == 'yearAsc') {
      setPeopleData(peopleData.sort((a, b) => {
        a = a[3].split('/').reverse().join('')
        b = b[3].split('/').reverse().join('')
        return a.localeCompare(b); 
      }))  
    }
    else if (e.target.value == 'yearDes') {
      setPeopleData(peopleData.sort((a, b) => {
        a = a[3].split('/').reverse().join('')
        b = b[3].split('/').reverse().join('')
        return b.localeCompare(a); 
      })) 
    }
  }

  return (
    <div className="order-button">
      <button onClick={openOrder} className='button-order'>
        <img src={sortIcon} alt='sort-icon' />
        <div className="">Order by</div>
      </button>
      <div className="sorting-ways">
        <button onClick={sortData} value='nameAsc' className="sort-buttons">Name ascending</button>
        <button onClick={sortData} value='nameDes' className="sort-buttons">Name descending</button>
        <button onClick={sortData} value='yearAsc' className="sort-buttons">Year ascending</button>
        <button onClick={sortData} value='yearDes' className="sort-buttons">Year descending</button>
      </div>
    </div>
  )
}

export default SortData
