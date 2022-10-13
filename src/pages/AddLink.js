import React,{useRef,useState,useEffect, useContext} from 'react'
import { useNavigate,Link } from 'react-router-dom'
import smallLogo from '../assets/small_logo.png'
import returnIcon from '../assets/Arrow.png'
import closeIcon from '../assets/close.png'
import { validateEmail } from '../functions/emailValidation'
import { PeopleContext } from '../context/PeopleContext'

const AddLink = () => {
  const {peopleData,setPeopleData,cloneData,setcloneData} = useContext(PeopleContext)
  const navigate = useNavigate()
  const initialRender = useRef(true);
  const errorMessage = useRef()
  const name = useRef()
  const country = useRef()
  const city = useRef()
  const email = useRef()
  const [validName, setValidName] = useState(false)
  const [validCountry, setValidCountry] = useState(false)
  const [validCity, setValidCity] = useState(false)
  const [validEmail, setValidEmail] = useState(false)
  const [errorCheck, setErrorCheck] = useState(false)
  const [userInfo,setUserInfo] = useState([])


  const returnPage = () => {
    navigate('/result')
  }

  const formHandler = (e) => {
    e.preventDefault()
    if (e.target[0].value.length < 3 || e.target[0].value.length > 60) {
      console.log(1)
      setValidName(false)
      e.target[0].style.borderColor='red'
      e.target[0].previousElementSibling.style.color='red'
      name.current.style.display = 'list-item'
    } else {
      setValidName(true)
      e.target[0].style.borderColor='black'
      e.target[0].previousElementSibling.style.color='black'
      name.current.style.display = 'none'
    }
    if (e.target[1].value.length < 3 || e.target[1].value.length > 40) {
      setValidCountry(false)
      e.target[1].style.borderColor='red'
      e.target[1].previousElementSibling.style.color='red'
      country.current.style.display = 'list-item'
    } else {
      setValidCountry(true)
      e.target[1].style.borderColor='black'
      e.target[1].previousElementSibling.style.color='black'
      country.current.style.display = 'none'
    }
    if (e.target[2].value.length < 3 || e.target[2].value.length > 40) {
      setValidCity(false)
      e.target[2].style.borderColor='red'
      e.target[2].previousElementSibling.style.color='red'
      city.current.style.display = 'list-item'
    } else {
      setValidCity(true)
      e.target[2].style.borderColor='black'
      e.target[2].previousElementSibling.style.color='black'
      city.current.style.display = 'none'
    }
    if (!validateEmail(e.target[3].value)) {
      setValidEmail(false)
      e.target[3].style.borderColor='red'
      e.target[3].previousElementSibling.style.color='red'
      email.current.style.display = 'list-item'
    } else {
      setValidEmail(true)
      e.target[3].style.borderColor='black'
      e.target[3].previousElementSibling.style.color='black'
      email.current.style.display = 'none'
    }

    setUserInfo([
      e.target[0].value,
      'No Company',
      e.target[3].value,
      getDate(),
      e.target[1].value,
      e.target[2].value,
    ])
    setErrorCheck(!errorCheck)
  }

  function getDate() {
    let date = new Date()
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    if (month < 10) month = `0${date.getMonth() + 1}`
    let day = date.getDate()
    return `${day}/${month}/${year}`
  }

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      errorMessage.current.style.scale = '1'
      if (validName && validCountry && validCity && validEmail) {
        errorMessage.current.innerHTML = 'Record successfully added.'
        setPeopleData([...peopleData, userInfo])
        setcloneData([...cloneData, userInfo])
        setTimeout(() => {navigate('/result')},2000)
      }
    }
  }, [errorCheck]);

  return (
    <div className="add-wrapper">
      <div className="header">
        <Link to='/'>
          <img className="company-logo" src={smallLogo} alt='company-logo' />
        </Link>
        <div onClick={returnPage} className="return-section">
          <img src={returnIcon} alt='return-icon' />
          <div className="return-text">Return to List Page</div>        
        </div>
      </div>
      <form onSubmit={formHandler} className="addform">
        <div className="form-inputs">
          <div className="form-area">
            <label className="form-label">Name Surname</label>
            <input className='form-input' type='text' placeholder='Enter name and surname'/>
          </div>
          <div className="form-area">
            <label className="form-label">Country</label>
            <input className='form-input' type='text' placeholder='Enter a country'/>
          </div>
          <div className="form-area">
            <label className="form-label">City</label>
            <input className='form-input' type='text' placeholder='Enter a city'/>
          </div>
          <div className="form-area">
            <label className="form-label">Email</label>
            <input className='form-input' type='text' placeholder='Enter an e-mail (abc@xyz.com)'/>
          </div>
        </div>
        <div className="submit-area">
          <button className='submit-button' type='submit'>Add</button>
        </div>
      </form>
      <div ref={errorMessage} className="error-message">
        <div className="error-text-area">
          <div className="error-header">Error while adding link element</div>
          <ul>
            <li ref={name}> Name and surname should contain only letters and at least 2 words.</li>
            <li ref={country}>Country name should contain only letters and at least 2 words.</li>
            <li ref={city}> City name should contain only letters and at least 2 words.</li>
            <li ref={email}>Invalid email. </li>
          </ul>
        </div>
        <div className="error-show">
          <div className="error-button">Error</div>
        </div>
        <img onClick={(e)=>e.target.parentNode.style.scale='0'} className="close-icon" src={closeIcon} alt='close-icon' />
      </div>
    </div>
  )
}

export default AddLink
