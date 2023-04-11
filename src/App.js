
import React from 'react'

export default function App() {

  const [date, setDate] = React.useState({
    day: '',
    month: '',
    year: ''
  })

  function collectData(event) {
    setClicked(false)
    const { name, value } = event.target
    setDate(prevData => ({
      ...prevData,
      [name]: value,
    }))
  }

  const { day, month, year } = date
  const newDate = new Date()
  const currentDay = newDate.getDate()
  const currentMonth = newDate.getMonth() + 1
  const currentYear = newDate.getFullYear()

  const birthdate = new Date(year, month - 1, day)
  const ageInMs = newDate - birthdate
  var ageInDays = Math.floor(ageInMs / (24 * 60 * 60 * 1000));
  var years = Math.floor(ageInDays / 365);
  var months = Math.floor((ageInDays % 365) / 30);
  var days = ageInDays % 30;


  const isValidDay = !isNaN(day) && day > 0 && day <= 31
  const isValidMonth = !isNaN(month) && month > 0 && month <= 12
  const isValidYear = !isNaN(year) && year >= 1907 && year <= currentYear

  const [clicked, setClicked] = React.useState(false)
  const monthswith30Days = [4, 6, 9, 11]
  const monthswith31Days = [1, 3, 5, 7, 8, 10, 12]

  function validateData(e) {
    e.preventDefault()
    if (day && month && year) {
      if (isValidDay && isValidMonth && isValidYear) {
        if ((parseInt(month) === 2 && day <= 28) || (monthswith30Days.includes(parseInt(month)) && day <= 30) || (monthswith31Days.includes(parseInt(month)) && day <= 31)) {
          if (year < currentYear || (parseInt(year) === currentYear && day <= currentDay && month <= currentMonth)) {
            setClicked(true)
          }
        }
      }
    }
  }

  const red = { color: 'red' }
  const violet = { color: 'hsl(259, 100%, 65%)' }
  const border = { border: '1px solid red', outline: 'none' }

  const checkDay = (
    (parseInt(month) === 2 && day > 28) ||
    (month && monthswith30Days.includes(parseInt(month)) && day > 30) ||
    (month && monthswith31Days.includes(parseInt(month)) && day > 31) ||
    ((parseInt(year) === currentYear) && ((month > currentMonth && day > 0) || (parseInt(month) === currentMonth && day > currentDay))) ||
    (day && !isValidDay)
  )

  return (
    <div className='form-data'>

      <form>
        <div className='input-fields'>
          <div className='first-label'>
            <label style={checkDay ? red : {}} htmlFor="day">DAY</label>
            <input
              onChange={collectData}
              type="text"
              name='day'
              value={day}
              id='day'
              placeholder="DD"
              required maxLength='2'
              style={checkDay ? border : {}}
            />
            <p style={red}>
              {parseInt(month) === 2 && day > 28 ? '28 days maximum' :
                (month && monthswith30Days.includes(parseInt(month)) && day > 30) ? '30 days maximum' :
                  (month && monthswith31Days.includes(parseInt(month)) && day > 31) ? '31 days maximum' :
                    (parseInt(year) === currentYear && ((month > currentMonth && day > 0) || (parseInt(month) === currentMonth && day > currentDay))) ? 'Must be in the past ' :
                      day && !isValidDay ? 'Must be a valid day' : ''}
            </p>
          </div>

          <div className='second-label'>
            <label style={(month && !isValidMonth) || (parseInt(year) === currentYear && month > currentMonth) ? red : {}} htmlFor="month">MONTH</label>
            <input
              onChange={collectData}
              type="text"
              name='month'
              value={month}
              id='month'
              placeholder="MM"
              required maxLength='2'
              style={(month && !isValidMonth) || (parseInt(year) === currentYear && month > currentMonth) ? border : {}}
            />
            <p style={red}>
              {month && !isValidMonth ? 'Must be a valid month' : parseInt(year) === currentYear && month > currentMonth ? 'Must be in the past' : ''}
            </p>
          </div>

          <div className='third-label'>
            <label style={year && !isValidYear ? red : {}} htmlFor="year">YEAR</label>
            <input
              onChange={collectData}
              type="text"
              name='year'
              value={year}
              id='year'
              placeholder="YYYY"
              required maxLength='4'
              style={year && !isValidYear ? border : {}}
            />
            <p style={red}>
              {year && year < 1907 ? 'Must be a valid year' : year && year > currentYear ? 'Must be in the past' : ''}
            </p>
          </div>
        </div>

        <div className='btn-area'>
          <hr />
          <button onClick={validateData} className="arrow">
            <img src={process.env.PUBLIC_URL + '/icon-arrow.svg'} alt='button' />
          </button>
        </div>

      </form>
      <div>

        <h1>{clicked ? <span style={violet}>{(years)}</span> :
          <span style={violet}>--</span>} years</h1>

        <h1>{clicked ? <span style={violet}>{(months)}</span> :
          <span style={violet}>--</span>} months</h1>

        <h1>{clicked ? <span style={violet}>{(days)}</span> :
          <span style={violet}>--</span>} days</h1>

      </div>
    </div>
  )
}
