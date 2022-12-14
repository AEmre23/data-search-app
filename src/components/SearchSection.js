import React, { useContext,useEffect,useRef } from 'react'
import { PeopleContext } from '../context/PeopleContext'
import { Link,useNavigate } from 'react-router-dom'
import searchIcon from '../assets/search.png'
import locationIcon from '../assets/location.png'

const SearchSection = () => {
  const { inputValue, setInputValue, peopleData } = useContext(PeopleContext)
  const searchInput = useRef()
  const search = useRef()
  const navigate = useNavigate()

  const inputHandler = (e) => {
    e.preventDefault()
    if (e.target.value.length >= 0) {
      setInputValue(e.target.value.trim().toLowerCase())
    }
  }

  const buttonHandler = (e) => {
    e.preventDefault()
    if (inputValue.length === 0) {
      searchInput.current.style.borderColor = 'red'
      search.current.classList.toggle('animate-icon')
      searchInput.current.classList.toggle('animate-icon')
    }
    else navigate('/result') 
  }

  return (
    <div className='search-wrapper'>
      <div className="seach-container">
        <div className="search-header">Find in records</div>
        <form onChange={inputHandler} className="search-input">
          <input autoFocus ref={searchInput} className='input-search' type='text' placeholder='...' />
          <button onClick={buttonHandler} className='submit-button' type='submit'>Search</button>
          <div className="search-icon">
            <img ref={search} src={searchIcon} alt='search-icon' />
          </div>
        </form>
        {inputValue.length > 0 ?
          <div className="search-result">
            {peopleData.filter((val) => 
              val[0].toLowerCase().includes(inputValue.trim().toLowerCase())
            ).slice(0, 3).map((each, i) => (
            <div key={i} className="search-info">
              <div className="location-icon">
                <img src={locationIcon} alt='location-icon' />
              </div>
              <div className="person">
                <div className="person-name">{each[0]}</div>
                <div className="person-location">
                  <div className="person-country">{each[4]},</div>
                  <div className="person-city">{each[5]}</div>
                </div>
              </div>
            </div>
            ))}
            {peopleData.filter((val) => 
              val[0].toLowerCase().includes(inputValue.trim().toLowerCase())
            ).length > 3 &&
              <Link className="show-more-parent" to='result'>
                <div className="show-more">
                  <div>Show more...</div>
                </div>
              </Link>
            }
            {peopleData.filter((val) => 
              val[0].toLowerCase().includes(inputValue.trim().toLowerCase())
            ).length === 0 &&
              <div className="no-result">
                <div>No result...</div>
              </div>
            }
          </div>
          : null
          }
      </div>
    </div>
  )
}

export default SearchSection
