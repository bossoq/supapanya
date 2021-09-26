import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Select from 'react-select'
import useUser from '../../utils/useUser'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faIdCard, faVideo } from '@fortawesome/free-solid-svg-icons'
import fetchJson from '../../utils/fetchJson'
import router from 'next/router'

interface DataProps {
  data?: Record<string, any>
}

interface UserIdList {
  id: number
  userLogin: string
}

interface Options {
  value: number
  label: string
}

interface VideoData {
  id?: number
  name: string
  baseUrl: string
  type: string
  allowAll: boolean
  allowList?: number[] | null
}

const VodEdit: React.FC<DataProps> = (props): JSX.Element => {
  const router = useRouter()

  const [id, setId] = useState<number | null>()
  const [name, setName] = useState<string>('')
  const [baseUrl, setBaseUrl] = useState<string>('')
  const [type, setType] = useState<string>('vod')
  const [allowAll, setAllowAll] = useState<boolean>(false)
  const [allowList, setAllowList] = useState<number[]>([])
  const [allowListWithName, setAllowListWithName] = useState<Options[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [videoData, setVideoData] = useState<VideoData | null>()
  const [success, setSuccess] = useState<boolean>(false)

  const [allUser, setAllUser] = useState<Options[]>([])

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

  useEffect(() => {
    fetchJson('/api/getUserId', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ getAll: '*' }),
    }).then((response: Record<string, any>) => {
      const { complete, ...data } = response
      const list: Options[] = []
      if (complete) {
        Object.values(data).map((userInfo: UserIdList) => {
          const userData = {
            value: userInfo.id,
            label: userInfo.userLogin,
          }
          list.push(userData)
        })
        setAllUser(list)
      }
    })
  }, [])

  useEffect(() => {
    if (props.data && props.data.id) {
      setIsLoading(true)
      setId(props.data.id)
      setName(props.data.name)
      setBaseUrl(props.data.baseUrl)
      setType(props.data.type)
      setAllowAll(Boolean(props.data.allowAll))
      setAllowList(props.data.allowList)
      const listWithName = idToList(props.data.allowList, allUser)
      setAllowListWithName(listWithName)
      setIsLoading(false)
    } else if (allUser.length > 0) {
      setIsLoading(false)
    }
  }, [props.data, allUser])

  const idToList = (ids: number[] | string, allUser: Options[]): Options[] => {
    const userInfos: Options[] = []
    if (typeof ids == 'object' && ids && ids.length > 1 && allUser.length > 0) {
      ids.map((id) => {
        const user: Options = allUser.find((user) => user.value == id)!
        userInfos.push(user)
      })
    } else if (typeof ids == 'string' && ids && allUser.length > 0) {
      const user: Options = allUser.find((user) => user.value == parseInt(ids))!
      userInfos.push(user)
    }
    return userInfos
  }

  const handleListChange = (option: readonly Record<string, any>[]) => {
    setAllowListWithName(option as Options[])
    const newAllowList: number[] = []
    option.map((list) => {
      newAllowList.push(list.value)
    })
    setAllowList(newAllowList)
  }

  const handleVideoSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (admin) {
      if (id) {
        const videoData: VideoData = {
          id,
          name,
          baseUrl,
          type,
          allowAll,
        }
        if (!allowAll) {
          videoData.allowList = allowList
        } else {
          videoData.allowList = null
        }
        const { isUpdated, ...resp } = await fetchJson('/api/savevideo', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Upsert-Type': 'editvideo',
          },
          body: JSON.stringify(videoData),
        })
        if (isUpdated) {
          setVideoData(resp)
          setSuccess(true)
          setId(null)
          setName('')
          setBaseUrl('')
          setType('vod')
          setAllowAll(false)
          setAllowList([])
          setAllowListWithName([])
          setTimeout(() => {
            setSuccess(false)
            setVideoData(null)
          }, 5000)
        } else {
          console.log('error')
        }
      } else {
        const videoData: VideoData = {
          name,
          baseUrl,
          type,
          allowAll,
        }
        if (!allowAll) {
          videoData.allowList = allowList
        } else {
          videoData.allowList = null
        }
        const { isSaved, ...resp } = await fetchJson('/api/savevideo', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Upsert-Type': 'newvideo',
          },
          body: JSON.stringify(videoData),
        })
        if (isSaved) {
          setVideoData(resp)
          setSuccess(true)
          setId(null)
          setName('')
          setBaseUrl('')
          setType('vod')
          setAllowAll(false)
          setAllowList([])
          setAllowListWithName([])
          setTimeout(() => {
            setSuccess(false)
            setVideoData(null)
          }, 5000)
        } else {
          console.log('error')
        }
      }
    } else {
      router.push('/')
    }
  }

  const handleNotification = () => {
    setSuccess(false)
    setVideoData(null)
  }

  return (
    <>
      {!isLoading && (
        <section className="section mb-6">
          <div className="container">
            <div className="columns is-centered">
              <div className="column is-4-tablet is-6-desktop is-6-widescreen">
                <form onSubmit={handleVideoSave} className="box">
                  <div className="field">
                    <label htmlFor="id" className="label">
                      ID
                    </label>
                    <div className="control has-icons-left">
                      <input
                        id="id"
                        type="text"
                        placeholder="Autogenerated ID"
                        className="input"
                        value={id ? id : 'Auto Generated'}
                        onChange={(e) => setId(parseInt(e.target.value))}
                        disabled
                      />
                      <span className="icon is-left">
                        <FontAwesomeIcon icon={faIdCard} size="1x" />
                      </span>
                    </div>
                  </div>
                  <div className="field">
                    <label htmlFor="name" className="label">
                      Name
                    </label>
                    <div className="control has-icons-left">
                      <input
                        id="name"
                        type="text"
                        placeholder="Video Name"
                        className="input"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                      <span className="icon is-left">
                        <FontAwesomeIcon icon={faVideo} size="1x" />
                      </span>
                    </div>
                  </div>
                  <div className="field">
                    <label htmlFor="baseUrl" className="label">
                      Base URL
                    </label>
                    <div className="control has-icons-left">
                      <input
                        id="baseUrl"
                        type="text"
                        placeholder="eg. https://vod.supapanya.com/xxxxx"
                        className="input"
                        value={baseUrl}
                        onChange={(e) => setBaseUrl(e.target.value)}
                        required
                      />
                      <span className="icon is-left">
                        <FontAwesomeIcon icon={faVideo} size="1x" />
                      </span>
                    </div>
                  </div>
                  <div className="field">
                    <label htmlFor="type" className="label">
                      Type
                    </label>
                    <div className="select" style={{ width: '100%' }}>
                      <select
                        style={{ width: '100%' }}
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                      >
                        <option>vod</option>
                        <option>portfolio</option>
                        <option>studytips</option>
                      </select>
                    </div>
                  </div>
                  <div className="field">
                    <label htmlFor="allowall" className="label">
                      Allow All
                      <input
                        id="allowall"
                        type="checkbox"
                        className="ml-3"
                        checked={allowAll}
                        onChange={(e) => setAllowAll(e.target.checked)}
                      />
                    </label>
                  </div>
                  {!allowAll && (
                    <div className="field">
                      <label htmlFor="allowlist" className="label">
                        Allow List
                      </label>
                      {allowListWithName.length > 0 && allUser.length > 0 ? (
                        <Select
                          value={allowListWithName}
                          options={allUser}
                          onChange={(option: readonly Record<string, any>[]) =>
                            handleListChange(option)
                          }
                          maxMenuHeight={160}
                          isClearable
                          isMulti
                        />
                      ) : (
                        <Select
                          options={allUser}
                          onChange={(option: readonly Record<string, any>[]) =>
                            handleListChange(option)
                          }
                          maxMenuHeight={160}
                          isClearable
                          isMulti
                        />
                      )}
                    </div>
                  )}
                  <div className="field has-text-centered">
                    <button type="submit" className="button is-success mx-3">
                      Save
                    </button>
                    <button
                      type="reset"
                      className="button is-success mx-3"
                      onClick={() => router.push('/vodlist')}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
                {success && (
                  <div className="notification is-primary">
                    <button className="delete" onClick={handleNotification} />
                    <p>Save Video Success</p>
                    <p>ID: {videoData!.id}</p>
                    <p>NAME: {videoData!.name}</p>
                    <p>BASE URL: {videoData!.baseUrl}</p>
                    <p>TYPE: {videoData!.type}</p>
                    <p>ALLOW ALL: {videoData!.allowAll ? 'True' : 'False'}</p>
                    <p>
                      ALLOW LIST:{' '}
                      {[
                        idToList(videoData!.allowList!, allUser).map(
                          (data) => data.label
                        ),
                      ].join(', ')}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  )
}

export default VodEdit
