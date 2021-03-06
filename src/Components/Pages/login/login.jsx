import React, { useState } from "react"
import { Link } from "react-router-dom"

// import "./login.css"
import DisplayMassage from "../../Controls/massage/massage"
import Logo from "../60x60.svg"
import { setUserSession } from "../../Utils/Common.js"

const Login = (props) => {
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [massage, setMassage] = useState(null)
  const [loading, setLoading] = useState(false)

  const submitForm = async (e) => {
    e.preventDefault()
    setLoading(true)
    const login = { email, password }
    const result = await fetch(
      "https://backend-hippo-club.herokuapp.com/api/auth/login",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(login),
      }
    )
    const response = await result.json()

    setLoading(false)

    const userInfo = {
      firstname: response.firstname,
      lastname: response.lastname,
      email: response.email,
      avatar: response.avatar,
    }
    if (response.error) return setMassage(response.error)

    setUserSession(response.userId, userInfo)

    props.history.push("./")
  }

  return (
    <div className="container">
      {massage ? <DisplayMassage massage={massage} /> : ""}
      <div className="card_above">
        <div className="Logo">
          <img src={Logo} alt="Logo" />
        </div>
        <form onSubmit={submitForm}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <br />
            <input
              type="text"
              placeholder="john@doe.com"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <br />
            <input
              type="password"
              placeholder="**********"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn" disabled={loading}>
              {loading ? "Loading..." : "Sign up"}
            </button>
          </div>
        </form>
      </div>
      <div className="card_bellow">
        <p>Have an account?</p>
        <Link to="/register">
          <span>Register</span>
        </Link>
      </div>
    </div>
  )
}

export default Login
