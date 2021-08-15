import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faUser, faIdCard } from '@fortawesome/free-solid-svg-icons'
import useUser from '../utils/useUser'
import fetchJson from '../utils/fetchJson'
import type { Register } from '../types/Auth'

const RegisterPage = (): JSX.Element => {
  const [userLogin, setUsername] = useState<string>('')
  const [userPassword, setPassword] = useState<string>('')
  const [displayName, setDisplayname] = useState<string>('')
  const [isAdmin, setIsadmin] = useState<boolean>(false)
  const [role, setRole] = useState<string>('Student')
  const [live, setLive] = useState<boolean>(false)
  const [success, setSuccess] = useState<boolean>(false)

  const [regisData, setRegisData] = useState<{ [k: string]: any }>({})

  const [admin, setAdmin] = useState<boolean>(false)

  const { user } = useUser({
    redirectTo: '/login',
    redirectIfFound: false,
  })

  useEffect(() => {
    if (user) {
      if (user.isLoggedIn) {
        setAdmin(user.meta.isAdmin)
      }
    }
  }, [user])

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (admin) {
      const register: Register = {
        userLogin,
        userPassword,
        displayName,
        meta: {
          isAdmin,
          role,
          live,
        },
      }
      const registerData = await fetchJson('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(register),
      })
      console.log(registerData)
      if (registerData) {
        const { isRegistered, ...userData } = registerData
        if (isRegistered) {
          setRegisData(userData)
          setSuccess(true)
          setUsername('')
          setPassword('')
          setDisplayname('')
          setIsadmin(false)
          setRole('')
          setLive(false)
          setTimeout(() => {
            setSuccess(false)
            setRegisData({})
          }, 5000)
        }
      }
    }
  }

  const handleNotification = () => {
    setSuccess(false)
  }
  return (
    <>
      <Head>
        <title>Register - Admin Panel - สถาบันศุภปัญญาไอ.เค.</title>
        <meta property="og:title" content="Register - Admin Panel - สถาบันศุภปัญญาไอ.เค." />
      </Head>
      <section className="section">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-5-tablet is-4-desktop is-3-widescreen">
              <form onSubmit={handleRegister} className="box">
                <div className="field">
                  <label htmlFor="username" className="label">
                    Username
                  </label>
                  <div className="control has-icons-left">
                    <input
                      id="username"
                      type="text"
                      placeholder="e.g. myname"
                      className="input"
                      value={userLogin}
                      onChange={(e) =>
                        setUsername((e.target as HTMLInputElement).value)
                      }
                      required
                    />
                    <span className="icon is-left">
                      <FontAwesomeIcon icon={faUser} size="1x" />
                    </span>
                  </div>
                </div>
                <div className="field">
                  <label htmlFor="password" className="label">
                    Password
                  </label>
                  <div className="control has-icons-left">
                    <input
                      id="password"
                      type="password"
                      placeholder="********"
                      className="input"
                      value={userPassword}
                      onChange={(e) =>
                        setPassword((e.target as HTMLInputElement).value)
                      }
                      required
                    />
                    <span className="icon is-left">
                      <FontAwesomeIcon icon={faLock} size="1x" />
                    </span>
                  </div>
                </div>
                <div className="field">
                  <label htmlFor="displayname" className="label">
                    Display Name
                  </label>
                  <div className="control has-icons-left">
                    <input
                      id="displayname"
                      type="text"
                      placeholder="Display Name"
                      className="input"
                      value={displayName}
                      onChange={(e) =>
                        setDisplayname((e.target as HTMLInputElement).value)
                      }
                      required
                    />
                    <span className="icon is-left">
                      <FontAwesomeIcon icon={faIdCard} size="1x" />
                    </span>
                  </div>
                </div>
                <div className="field">
                  <label htmlFor="role" className="label">
                    Role
                  </label>
                  <div className="select" style={{ width: '100%' }}>
                    <select
                      style={{ width: '100%' }}
                      value={role}
                      onChange={(e) =>
                        setRole((e.target as HTMLSelectElement).value)
                      }
                    >
                      {!isAdmin && <option>Student</option>}
                      {!isAdmin && <option>Teacher</option>}
                      {isAdmin && <option>Administrator</option>}
                    </select>
                  </div>
                </div>
                <div className="field">
                  <label htmlFor="isadmin" className="checkbox">
                    <input
                      id="isadmin"
                      type="checkbox"
                      className="mr-2"
                      checked={isAdmin}
                      onChange={(e) =>
                        setIsadmin((e.target as HTMLInputElement).checked)
                      }
                    />
                    Administrator
                  </label>
                </div>
                <div className="field">
                  <label htmlFor="live" className="checkbox">
                    <input
                      id="live"
                      type="checkbox"
                      className="mr-2"
                      checked={live || role == 'Teacher' || isAdmin}
                      onChange={(e) =>
                        setLive((e.target as HTMLInputElement).checked)
                      }
                      disabled={role == 'Teacher' || isAdmin}
                    />
                    Live Allowed
                  </label>
                </div>
                <div className="field">
                  <button type="submit" className="button is-success">
                    Register
                  </button>
                </div>
              </form>
              {success && (
                <div className="notification is-primary">
                  <button
                    className="delete"
                    onClick={handleNotification}
                  ></button>
                  <p>User Registration Success</p>
                  <p>User: {regisData.userLogin}</p>
                  <p>Display Name: {regisData.displayName}</p>
                  <p>Role: {regisData.meta.role}</p>
                  <p>Live: {regisData.meta.live.toString()}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default RegisterPage
