import './index.css'

const AppointmentItem = props => {
  const {item, changeStar} = props
  const {id, title, date, isLike} = item

  const starImage = isLike
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  console.log(starImage)

  return (
    <li className="list-item">
      <div className="name-button-container">
        <p className="name">{title}</p>
        <button
          type="button"
          className="star-image-button"
          data-testid="star"
          onClick={() => changeStar(id)}
        >
          <img src={starImage} alt="start" className="star-image" />
        </button>
      </div>
      <p className="date-formate">{date}</p>
    </li>
  )
}

export default AppointmentItem
