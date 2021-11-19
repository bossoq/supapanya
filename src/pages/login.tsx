import React, { useState } from 'react'
import Head from 'next/head'
import useUser from '../utils/useUser'
import fetchJson from '../utils/fetchJson'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faUser } from '@fortawesome/free-solid-svg-icons'

const Login = (): JSX.Element => {
  const [userLogin, setUsername] = useState<string>('')
  const [userPassword, setPassword] = useState<string>('')
  const [invalid, setInvalid] = useState<boolean>(false)

  const { user, mutateUser } = useUser()

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      mutateUser(
        await fetchJson('/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userLogin, userPassword }),
        })
      )
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('accesstoken', user.accessToken)
        if (window.localStorage.getItem('accesstoken') === user.accessToken) {
          window.location.replace('/')
        }
      }
      setInvalid(true)
    } catch (err: any) {
      setInvalid(true)
      console.error('Request Failed: ' + err.data.message)
    }
  }
  return (
    <>
      <Head>
        <title>เข้าสู่ระบบ - สถาบันศุภปัญญาไอ.เค.</title>
        <meta
          property="og:title"
          content="เข้าสู่ระบบ - สถาบันศุภปัญญาไอ.เค."
        />
      </Head>
      <section className="section">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-5-tablet is-4-desktop is-3-widescreen">
              <form onSubmit={handleLogin} className="box">
                <div className="field">
                  <label htmlFor="username" className="label">
                    ชื่อผู้ใช้
                  </label>
                  <div className="control has-icons-left">
                    <input
                      id="username"
                      type="text"
                      placeholder="e.g. myname"
                      className="input"
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
                    รหัสผ่าน
                  </label>
                  <div className="control has-icons-left">
                    <input
                      id="password"
                      type="password"
                      placeholder="********"
                      className="input"
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
                {invalid && (
                  <div className="notification is-danger is-light has-text-centered">
                    ชื่อผู้ใช้ หรือ รหัสผ่าน ไม่ถูกต้อง
                  </div>
                )}
                <div className="field">
                  <button type="submit" className="button is-success">
                    เข้าสู่ระบบ
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Login
