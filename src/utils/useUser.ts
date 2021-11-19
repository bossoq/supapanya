import { useEffect } from 'react'
import Router from 'next/router'
import axios from 'axios'
import useSWR from 'swr'

const useUser = ({
  redirectTo = '',
  redirectIfFound = false,
  preventRedirect = false,
} = {}) => {
  let token = ''
  const fetcher = (url: string, token: string) =>
    axios
      .get(url, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => res.data)

  if (typeof window !== 'undefined') {
    token = window.localStorage.getItem('accesstoken') || ''
  }

  const { data: user, mutate: mutateUser } = useSWR(
    ['/api/islogin?_vercel_no_cache=1', token],
    fetcher,
    { refreshInterval: 10000 }
  )

  useEffect(() => {
    if (user && user.accessToken) {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('accesstoken', user.accessToken)
      }
    }
    let useRedirect: boolean = false
    if (redirectTo !== '') {
      useRedirect = true
    }

    // if no redirect needed, just return (example: already on /dashboard)
    // if user data not yet there (fetch in progress, logged in or not) then don't do anything yet
    if (!useRedirect || !user) return
    if (
      // If redirectTo is set, redirect if the user was not found.
      (useRedirect &&
        !redirectIfFound &&
        !user.isLoggedIn &&
        !preventRedirect) ||
      // If redirectIfFound is also set, redirect if the user was found
      (redirectIfFound && user.isLoggedIn)
    ) {
      Router.push(redirectTo)
    }
  }, [user, redirectIfFound, redirectTo, preventRedirect])

  return { user, mutateUser }
}

export default useUser
