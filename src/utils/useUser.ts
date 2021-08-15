import { useEffect } from 'react'
import Router from 'next/router'
import useSWR from 'swr'

const useUser = ({ redirectTo = '', redirectIfFound = false, preventRedirect = false } = {}) => {
  const { data: user, mutate: mutateUser } = useSWR('/api/islogin')

  useEffect(() => {
    let useRedirect: boolean = false
    if (redirectTo !== '') {
      useRedirect = true
    }

    // if no redirect needed, just return (example: already on /dashboard)
    // if user data not yet there (fetch in progress, logged in or not) then don't do anything yet
    if (!useRedirect || !user) return
    if (
      // If redirectTo is set, redirect if the user was not found.
      (useRedirect && !redirectIfFound && !user.isLoggedIn && !preventRedirect) ||
      // If redirectIfFound is also set, redirect if the user was found
      (redirectIfFound && user.isLoggedIn)
    ) {
      Router.push(redirectTo)
    }
  }, [user, redirectIfFound, redirectTo, preventRedirect])

  return { user, mutateUser }
}

export default useUser
