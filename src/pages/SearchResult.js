import React,{useContext,useState,useEffect,useRef} from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/small_logo.png'
import { PeopleContext } from '../context/PeopleContext'
import locationImage from '../assets/location.png'
// Components
import Pagination from '../components/Pagination'
import SortData from '../components/SortData'

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
    setDetector(preval => preval + 1)
    setPeopleData(cloneData)
    setInputValue(e.target[0].value)
    setCurrentPage(1)
  }

  useEffect(() => {
    // each[0] is the data first item, which is fullname.
    setPeopleData(peopleData.filter((each) => each[0].toLowerCase().includes(inputValue.trim().toLowerCase())))
  }, [detector]);


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
                <div style={{border: i===0 ? 'none' : ''}} className='each-result' key={i}>
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
        <button onClick={() => { localStorage.removeItem('persondata'); window.location.reload()}} className="delete-button">Clear new records</button>
        <SortData setDetector={setDetector} />
      </div>
    </div>
  )
}

export default SearchResult