import React,{useRef,useState,useEffect, useContext} from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { PeopleContext } from '../context/PeopleContext'
// Pictures
import smallLogo from '../assets/small_logo.png'
import returnIcon from '../assets/Arrow.png'
import closeIcon from '../assets/close.png'
// Functions
import { validateEmail } from '../functions/emailValidation'
import { getDate } from '../functions/getDate'


const AddLink = () => {
  const {cloneData} = useContext(PeopleContext)
  const navigate = useNavigate()
  const initialRender = useRef(true); // This is for useEffect stops working on first render
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
  const [userInfo, setUserInfo] = useState([])
  const [counter,setCounter] = useState(0) // This checks if inputs are empty or not.Changing with onChange event.

  const returnPage = () => {
    navigate('/result')
  }

  useEffect(() => {
    // This checks if inputs are empty or not.Changing with onChange event.
    // Button is disabled if there are no value on inputs.
    var button = document.getElementsByClassName('submit-button')
    var form = document.querySelector('.addform')
    if (form[0].value.trim().length > 0 &&
      form[1].value.trim().length > 0 &&
      form[2].value.trim().length > 0 &&
      form[3].value.trim().length > 0 )
    {
      button[0].removeAttribute('disabled')
    }
    else button[0].setAttribute('disabled', 'true')
  },[counter]);

  const formHandler = (e) => {
    const onlyString = /^[a-z]+$/i;
    e.preventDefault()
    let nameValue = e.target[0].value.trim()
    let countryValue = e.target[1].value.trim()
    let cityValue = e.target[2].value.trim()
    let emailValue = e.target[3].value.trim()

    if (nameValue.match(onlyString) === null || nameValue.length < 4 || nameValue.length > 60) {
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
    if (countryValue.match(onlyString) === null || countryValue.length < 2 || countryValue.length > 40) {
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
    if (cityValue.match(onlyString) === null || cityValue.length < 2 || cityValue.length > 40) {
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
    if (!validateEmail(emailValue)) {
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

  useEffect(() => {
    //  This is for useEffect stops working on first render
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      errorMessage.current.style.scale = '1'
      if (validName && validCountry && validCity && validEmail) {
        errorMessage.current.innerHTML = 'Record successfully added.'
        let newData = [...cloneData, userInfo]
        localStorage.removeItem('persondata')
        localStorage.setItem('persondata', JSON.stringify(newData))
        setTimeout(() => {
          navigate('/result')
          window.location.reload()
        }, 2000)
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
            <label className="form-label">Name Surname*</label>
            <input className='form-input' type='text' onChange={()=>setCounter(preValue=>preValue+1)} placeholder='Enter name and surname'/>
          </div>
          <div className="form-area">
            <label className="form-label">Country*</label>
            <input className='form-input' type='text' onChange={()=>setCounter(preValue=>preValue+1)} placeholder='Enter a country'/>
          </div>
          <div className="form-area">
            <label className="form-label">City*</label>
            <input className='form-input' type='text' onChange={()=>setCounter(preValue=>preValue+1)} placeholder='Enter a city'/>
          </div>
          <div className="form-area">
            <label className="form-label">Email*</label>
            <input className='form-input' type='text' onChange={()=>setCounter(preValue=>preValue+1)} placeholder='Enter an e-mail (abc@xyz.com)'/>
          </div>
        </div>
        <div className="submit-area">
          <button className='submit-button' type='submit' disabled>Add</button>
        </div>
      </form>
      <div ref={errorMessage} className="error-message">
        <div className="error-text-area">
          <div className="error-header">Error while adding link element</div>
          <ul>
            <li ref={name}> Name and surname must contain only letters and must be at least 4 letters.</li>
            <li ref={country}>Country name must contain only letters and must be at least 2 letters.</li>
            <li ref={city}> City name must contain only letters and must be at least 2 letters.</li>
            <li ref={email}>Invalid email.</li>
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
