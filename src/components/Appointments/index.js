import {Component} from 'react'
import {v4} from 'uuid'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {isStar: false, title: '', date: '', appointmentsData: []}

  getTitle = e => {
    this.setState({title: e.target.value})
  }

  getDate = e => {
    this.setState({date: e.target.value})
  }

  changeStateIsStar = () => {
    this.setState(prevState => ({isStar: !prevState.isStar}))
  }

  addAppointment = e => {
    e.preventDefault()
    const {title, date} = this.state
    const formatedDate = format(new Date(date), 'dd MMMM yyyy, EEEE')
    const newAppointment = {
      id: v4(),
      isLike: false,
      title,
      date: formatedDate,
    }

    this.setState(prevState => ({
      appointmentsData: [...prevState.appointmentsData, newAppointment],
      title: '',
      date: '',
    }))
  }

  changeStar = id => {
    this.setState(prevState => ({
      appointmentsData: prevState.appointmentsData.map(item => {
        if (item.id === id) {
          return {...item, isLike: !item.isLike}
        }
        return item
      }),
    }))
  }

  render() {
    const {title, isStar, date, appointmentsData} = this.state
    let filterData = []
    if (isStar === true) {
      filterData = appointmentsData.filter(item => item.isLike === true)
    } else {
      filterData = appointmentsData
    }

    return (
      <div className="bg-container">
        <div className="card">
          <div className="appointments-data-containers">
            <form className="data-container" onSubmit={this.addAppointment}>
              <h1 className="heading">Add Appointment</h1>
              <label htmlFor="name" className="label-element">
                TITLE
              </label>
              <br />
              <input
                id="name"
                className="input-element"
                type="text"
                onChange={this.getTitle}
                value={title}
                placeholder="TITLE"
              />
              <br />
              <br />
              <label htmlFor="date" className="label-element">
                DATE
              </label>
              <br />
              <input
                id="date"
                className="input-element"
                type="date"
                onChange={this.getDate}
                value={date}
              />
              <br />
              <br />
              <button className="button" type="submit">
                Add
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="image"
            />
          </div>
          <hr className="line" />
          <div className="heading-star-container">
            <h2 className="heading2">Appointments</h2>
            {isStar ? (
              <button
                type="button"
                className="star-button-fill"
                onClick={this.changeStateIsStar}
              >
                Starred
              </button>
            ) : (
              <button
                type="button"
                className="star-button"
                onClick={this.changeStateIsStar}
              >
                Starred
              </button>
            )}
          </div>
          <ul className="appointments-container">
            {filterData.map(item => (
              <AppointmentItem
                key={item.id}
                item={item}
                changeStar={this.changeStar}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
