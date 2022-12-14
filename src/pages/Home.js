import React,{useEffect,useContext} from 'react'
import { Link } from 'react-router-dom'
import { PeopleContext } from '../context/PeopleContext'
import Homelogo from '../assets/logo.png'
// Components
import SearchSection from '../components/SearchSection'
import Slider from '../components/Slider'
import Footer from '../components/Footer'


const Home = () => {
  const { setPeopleData, cloneData, setInputValue } = useContext(PeopleContext)

  useEffect(() => {
    setInputValue('')
    setPeopleData(cloneData)
  }, []);

  return (
    <div className='wrapper'>
      <main className="search-area">
        <div className="search">
          <div className="add-button">
            <Link to='add'>
              <button className='button-add'>Add new record</button>
            </Link>
          </div>
          <div className="logo-section">
            <div className="logo">
              <img src={Homelogo} alt='company-logo' />
              <h1 className="logo-text">Search App</h1>
            </div>
          </div>
          <SearchSection />
        </div>
        <Slider />
      </main>
      <footer className="footer">
        <Footer />
      </footer>
    </div>
  )
}

export default Home
