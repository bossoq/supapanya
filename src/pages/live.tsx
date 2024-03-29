import React, { useState, useEffect } from 'react'
import Router from 'next/router'
import Head from 'next/head'
import Jitsi from 'react-jitsi'
import useUser from '../utils/useUser'
import fetchJson from '../utils/fetchJson'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVideo, faVideoSlash, faCommentAlt } from '@fortawesome/free-solid-svg-icons'
import type { Response } from '../types/Auth';

const JitsiLive = () => {
  const [userData, setUserData] = useState<Response>()
  const [jwt, setJwt] = useState<string>()
  const [moderator, setModerator] = useState<boolean>(false)
  const [recordStatus, setRecordStatus] = useState<boolean>(false)
  const [cloneAPI, setCloneAPI] = useState<any>()
  const [onCall, setOnCall] = useState<boolean>(false)
  const [roomNames, setRoomNames] = useState<string[]>([])
  const [roomName, setRoomName] = useState<string>()
  // const roomPassword = process.env.MEET_PASSWORD

  const { user } = useUser({
    redirectTo: '/login',
    redirectIfFound: false
  })

  useEffect(() => {
    fetchJson('https://meet.supapanya.com/nbConfPart', {
      method: 'GET',
    }).then((response: { [k: string]: any}) => {
      setRoomNames(
        response.room_census.map((room_data: { [k: string]: any }) => {
          return room_data.room_name.split('@')[0]
        })
      )
    })
  }, [userData]);

  const Roomname = (): JSX.Element => {
    return (
      <section className="section p-0 px-6">
        <div className="contaniner">
          <form className="box">
            <h2 className="is-size-4 has-text-weight-bold pb-3">กรุณาเลือกห้องเรียน</h2>
            {roomNames.length !== 0 ? roomNames.map((name, idx) => {
              return (
                <button key={idx} id={name} type="button" className="button is-success is-large m-2" onClick={() => joinRoom(name)}>ห้องเรียน {name}</button>
              )
            }) : <h2 className="is-size-6 has-text-weight-bold">ไม่มีห้องเรียนเปิดอยู่ในขณะนี้</h2>}
          </form>
        </div>
      </section>
    )
  }

  useEffect(() => {
    if (user) {
      if (user.isLoggedIn) {
        const { isLoggedIn, ...userdata } = user
        setUserData(userdata)
        if (userdata.meta.role !== 'Student') {
          setModerator(true)
          setRoomName(userdata.userLogin)
        }
      }
    }
  }, [user])

  useEffect(() => {
    if (userData) {
      if (userData.meta!.live) {
        if (roomName) {
          const data = {
            context: {
              user: {
                name: userData.displayName,
                email: `${userData.userLogin}@supapanya.com`,
                affiliation: `${moderator ? 'owner' : 'member'}`,
              },
            },
            aud: 'supapanya_jitsi_app',
            iss: 'supapanya_jitsi_app',
            nbf: Math.floor(new Date().getTime() / 1000),
            exp: Math.floor((new Date().getTime() + 2 * 60 * 1000) / 1000),
            sub: 'meet.jitsi',
            room: '*',
            moderator: moderator,
          }
          fetchJson('/api/reqjwt', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ payload: data }),
          }).then((response: { [k: string]: any }) => {
            const { getToken, token } = response
            if (getToken) {
              setJwt(token)
            }
          })
        }
      }
    }
  }, [userData, roomName, onCall, moderator])

  const handleAPI = (JitsiMeetAPI: any) => {
    const iframeElem = document.getElementById('react-jitsi-frame')
    iframeElem!.style.display = 'unset'
    setCloneAPI(JitsiMeetAPI)
    if (userData && userData.meta!.role !== 'Student') {
      JitsiMeetAPI.addEventListener('videoConferenceJoined', () => {
        setTimeout(() => {
          JitsiMeetAPI.executeCommand('toggleLobby', true)
          // JitsiMeetAPI.executeCommand('password', roomPassword)
          JitsiMeetAPI.executeCommand('setFollowMe', true)
          JitsiMeetAPI.pinParticipant(JitsiMeetAPI.getParticipantsInfo()[0].participantId)
        }, 500)
      })
    }
    JitsiMeetAPI.addEventListener('recordingStatusChanged', (status: { [k: string]: any }) => {
      setRecordStatus(status.on)
    })
    JitsiMeetAPI.addEventListener('readyToClose', () => {
      Router.push('/')
    })
  }
  
  const startRoom = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (roomName && jwt) {
      setOnCall(true)
    }
  }
  
  const handleAPIClient = (JitsiMeetAPI: any) => {
    const iframeElem = document.getElementById('react-jitsi-frame')
    iframeElem!.style.display = 'unset'
    setCloneAPI(JitsiMeetAPI)
    JitsiMeetAPI.addEventListener('recordingStatusChanged', (status: { [k: string]: any }) => {
      setRecordStatus(status.on)
    })
    JitsiMeetAPI.addEventListener('readyToClose', () => {
      Router.push('/')
    })
  }

  const joinRoom = (name: string) => {
    setRoomName(name)
    setOnCall(true)
  }

  const startRecord = () => {
    if (userData && userData.meta!.role !== 'Student') {
      setCloneAPI(cloneAPI)
      if (recordStatus) {
        cloneAPI.executeCommand('stopRecording', 'file')
      } else {
        cloneAPI.executeCommand('startRecording', {
          mode: 'file'
        })
      }
    }
  }

  if (userData && userData.meta!.role !== 'Student') {
    return (!onCall ?
      (<>
      <Head>
        <title>ห้องเรียนออนไลน์ - สร้างห้องเรียน</title>
        <meta property="og:title" content="ห้องเรียนออนไลน์ - สถาบันศุภปัญญาไอ.เค."
        />
      </Head>
      <section className="section">
        <div className="contaniner">
          <form className="box" onSubmit={startRoom}>
            <div className="field">
              <div className="columns is-align-items-flex-end">
                <div className="column is-four-fifths">
                  <label htmlFor="roomname" className="label is-size-4">
                    ชื่อห้องเรียน
                  </label>
                  <div className="control has-icons-left">
                    <input
                      id="roomname"
                      type="text"
                      placeholder="e.g. ajarnpim"
                      className="input"
                      value={roomName}
                      onChange={(e) => setRoomName((e.target as HTMLInputElement).value)}
                      required
                    />
                    <span className="icon is-left">
                      <FontAwesomeIcon icon={faCommentAlt} />
                    </span>
                  </div>
                </div>
                <div className="column has-text-centered">
                  <div className="field">
                    <button type="submit" className="button is-success">สร้างห้องเรียน</button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
      <Roomname />
      </>)
      :
      (
      <>
        <Head>
          <title>ห้องเรียนออนไลน์ - {roomName && roomName}</title>
          <meta property="og:title" content="ห้องเรียนออนไลน์ - สถาบันศุภปัญญาไอ.เค."
          />
        </Head>
        <div style={{ width: '80vw', height: '80vh', margin: 'auto' }}>
          {jwt && <Jitsi
            containerStyle={{
              width: '100%',
              height: '100%',
            }}
            onAPILoad={handleAPI}
            domain={'meet.supapanya.com'}
            roomName={roomName}
            displayName={userData!.displayName}
            config={{
              startWithAudioMuted: false,
              disableDeepLinking: false,
            }}
            noSSL={false}
            jwt={jwt}
          />}
        </div>
        <div className="has-text-centered my-2">
          <p className="is-size-5"><span className="icon-text">สถานะการบันทึก: {recordStatus ? <span><FontAwesomeIcon icon={faVideo} style={{ color: 'red' }} />กำลังบันทึก</span> : <span><FontAwesomeIcon icon={faVideoSlash} style={{ color: 'grey' }} />ไม่ได้บันทึก</span>}</span></p>
          {userData && userData.meta!.role !== 'Student' && <button onClick={startRecord} className={`button ${recordStatus ? 'is-danger' : 'is-info'}`}>{recordStatus ? 'หยุดบันทึกวิดีโอ' : 'บันทึกวิดีโอ'}</button>}
        </div>
        <div className="py-4"></div>
      </>
      )
    )
  } else {
    return (!onCall ?
      <>
        <Head>
          <title>ห้องเรียนออนไลน์ - เลือกห้องเรียน</title>
          <meta property="og:title" content="ห้องเรียนออนไลน์ - สถาบันศุภปัญญาไอ.เค."
          />
        </Head>
        <Roomname />
      </>
      :
      (
        <>
          <Head>
            <title>ห้องเรียนออนไลน์ - {roomName && roomName}</title>
            <meta property="og:title" content="ห้องเรียนออนไลน์ - สถาบันศุภปัญญาไอ.เค."
            />
          </Head>
          <div style={{ width: '80vw', height: '80vh', margin: 'auto' }}>
            {jwt && <Jitsi
              containerStyle={{
                width: '100%',
                height: '100%',
              }}
              onAPILoad={handleAPIClient}
              domain={'meet.supapanya.com'}
              roomName={roomName}
              displayName={userData!.displayName}
              config={{
                startWithAudioMuted: true,
                disableDeepLinking: false,
              }}
              interfaceConfig={{
                TOOLBAR_BUTTONS: [
                  'microphone', 'camera', 'fullscreen', 'fodeviceselection', 'chat', 'raisehand', 'hangup', 'videoquality'
                ]
              }}
              noSSL={false}
              jwt={jwt}
            />}
          </div>
          <div className="has-text-centered my-2">
            <p className="is-size-5"><span className="icon-text">สถานะการบันทึก: {recordStatus ? <span><FontAwesomeIcon icon={faVideo} style={{ color: 'red' }} />กำลังบันทึก</span> : <span><FontAwesomeIcon icon={faVideoSlash} style={{ color: 'grey' }} />ไม่ได้บันทึก</span>}</span></p>
          </div>
          <div className="py-4"></div>
        </>
      )
    )
  }
}

export default JitsiLive
