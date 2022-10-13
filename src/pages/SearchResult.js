import React,{useContext,useState,useEffect,useRef} from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/small_logo.png'
import { PeopleContext } from '../context/PeopleContext'
import Pagination from '../components/Pagination'
import locationImage from '../assets/location.png'
import sortIcon from '../assets/sort.png'

const SearchResult = () => {
  const { inputValue, setInputValue, peopleData, setPeopleData, cloneData } = useContext(PeopleContext)
  const [currentPage, setCurrentPage] = useState(1)
  const [dataPerPage, setDataPerPage] = useState(3)
  const LastDataIndex = currentPage * dataPerPage
  const FirstDataIndex = LastDataIndex - dataPerPage
  const currentPageDatas = peopleData.slice(FirstDataIndex, LastDataIndex)
  const input = useRef()
  const [detector,setDetector] = useState(0)

useEffect(() => {
  input.current.value = inputValue
}, []);
  
  const inputHandler = (e) => {
    e.preventDefault()
    let buttons = document.querySelectorAll('.sort-buttons')
    buttons.forEach((each) => each.classList.remove('sorted-one'))
    buttons[0].parentNode.style.scale='0'
    setDetector(preval => preval + 1)
    setPeopleData(cloneData)
    setInputValue(e.target[0].value)
    setCurrentPage(1)
  }

  useEffect(() => {
    setPeopleData(peopleData.filter((each) => each[0].toLowerCase().includes(inputValue.toLowerCase())))
    if (inputValue.length === 0) setPeopleData(cloneData)
  }, [detector]);

  const openOrder = (e) => {
    e.currentTarget.nextElementSibling.style.scale == '1'
    ? e.currentTarget.nextElementSibling.style.scale = '0'
    : e.currentTarget.nextElementSibling.style.scale = '1'
  }

  const sortData = (e) => {
    let buttons = document.querySelectorAll('.sort-buttons')
    buttons.forEach((each)=>each.classList.remove('sorted-one'))
    e.target.classList.add('sorted-one')
    setDetector(preVal=>preVal + 1)
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
        //return a > b ? 1 : a < b ? -1 : 0;
        return a.localeCompare(b); 
      }))  
    }
    else if (e.target.value == 'yearDes') {
      setPeopleData(peopleData.sort((a, b) => {
        a = a[3].split('/').reverse().join('')
        b = b[3].split('/').reverse().join('')
        //return a > b ? 1 : a < b ? -1 : 0;
        return b.localeCompare(a); 
      })) 
    }
  }

  return (
    <div className='result-wrapper'>
      <div className="logo">
        <Link to='/'>
          <img src={logo} alt='company-logo' />
        </Link>
      </div>
      <div className="result-area">
        <form onSubmit={inputHandler} className="result-input">
          <input ref={input} className="search-input" type='text' placeholder='...' />
          <button className="search-button" type='submit'>Search</button>
        </form>
        <div className="results">
          {currentPageDatas.length > 0 &&
            <>
              {currentPageDatas.map((each, i) => (
                <div style={{border: i==0 ? 'none' : ''}} className='each-result' key={i}>
                  <div className="result-left">
                    <div className="icon">
                      <img src={locationImage} alt='location-icon' />
                    </div>
                    <div>
                      <div className="people-name">{each[0]}</div>
                      <div className="adress">{each[4]}, {each[5]}</div>
                    </div>
                  </div>
                  <div className="result-right">
                    <div className="people-email">{each[1]}</div>
                    <div className="date">{each[3]}</div>
                  </div>
                </div>
              ))}
            </>
            ||
            <div>No result found </div>
          }
        </div>
        <Pagination
          currentPageDatas={currentPageDatas} 
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          dataPerPage={dataPerPage}
        />
      </div>
      <div className="sort-add-area">
        <div className="add-button">
          <Link to='/add'>
            <button className="result-button">Add new record</button>
          </Link>
        </div>
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
      </div>
    </div>
  )
}

export default SearchResult