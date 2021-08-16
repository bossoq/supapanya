// eslint-disable-next-line react-hooks/exhaustive-deps
import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Image from 'next/image'
import useUser from '../../../utils/useUser'
import fetchJson from '../../../utils/fetchJson'

const Navbar = (): JSX.Element => {
  const [isIntersecting, setIntersecting] = useState<boolean>(false)
  const [isLogin, setIsLogin] = useState<Boolean>(false)
  const [isAdmin, setIsAdmin] = useState<boolean>(false)
  const [preventRedirect, setPreventRedirect] = useState<boolean>(true)
  const [navBurgerActive, setNavBurgerActive] = useState<boolean>(false)
  const [showDrop1, setShowDrop1] = useState<boolean>(false)
  const [showDrop2, setShowDrop2] = useState<boolean>(false)
  const router = useRouter()

  const { user } = useUser()
  const { mutateUser } = useUser({
    redirectTo: '/',
    redirectIfFound: false,
    preventRedirect: preventRedirect,
  })

  useEffect(() => {
    setPreventRedirect(true)
    if (user) {
      if (user.isLoggedIn) {
        const { isLoggedIn, ...data } = user
        setIsLogin(user.isLoggedIn)
        setIsAdmin(data.meta.isAdmin)
      }
    }
  }, [user])

  // Add Sticky Navbar on Scroll
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) =>
      setIntersecting(entry.isIntersecting)
    )
    if (ref.current) {
      observer.observe(ref.current)
    }
    return () => {
      observer.disconnect()
    }
  }, [])

  // NavBurger
  const showHideNavBar = (force = false) => {
    if (force) {
      setNavBurgerActive(false)
      setShowDrop1(false)
    } else {
      setNavBurgerActive(!navBurgerActive)
    }
  }

  // handle logout button
  const handleLogout = async () => {
    try {
      mutateUser(
        await fetchJson('/api/logout', {
          method: 'GET',
        })
      )
      setIsLogin(false)
      setIsAdmin(false)
      setPreventRedirect(false)
    } catch (err: any) {
      console.error('Request Failed: ' + err.data.message)
    }
  }
  return (
    <div
      ref={ref}
      className="container has-text-centered"
      style={!isIntersecting ? { paddingBottom: '40px' } : {}}
    >
      <nav
        id="nav-header"
        className={isIntersecting ? 'navbar' : 'navbar is-fixed-top'}
        style={
          !isIntersecting ? { backgroundColor: 'rgba(255,255,255,0.9)' } : {}
        }
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-brand has-background-grey-lighter">
          <a
            className={`navbar-burger has-background-grey-light ${navBurgerActive ? 'is-active' : ''}`}
            aria-label="menu"
            aria-expanded="false"
            data-target="main-navbar"
            style={{ margin: 'auto' }}
            onClick={() => showHideNavBar()}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
        <div
          className={`navbar-menu is-justify-content-center is-align-items-flex-start pt-1 ${
            navBurgerActive ? 'is-active' : ''
          }`}
          id="main-navbar"
        >
          {!isIntersecting && (
            <Image
              src={'/images/stickylogo.png'}
              alt={'supapanya-sticky'}
              width={70}
              height={45}
              layout={'fixed'}
            />
          )}
          <Link href="/" passHref>
            <a
              className={
                router.pathname == '/' ? 'navbar-item is-active' : 'navbar-item'
              }
              onClick={() => showHideNavBar(true)}
            >
              หน้าหลัก
            </a>
          </Link>
          <Link href="/course" passHref>
            <a
              className={
                router.pathname == '/course'
                  ? 'navbar-item is-active'
                  : 'navbar-item'
              }
              onClick={() => showHideNavBar(true)}
            >
              คอร์สเรียน
            </a>
          </Link>
          <div className="navbar-item has-dropdown is-hoverable" onMouseEnter={() => setShowDrop1(true)} onMouseLeave={() => setShowDrop1(false)}>
            <Link href="#" passHref>
              <p
                className={
                  router.pathname == '/review' || router.pathname == 'portfolio'
                    ? 'navbar-link is-active'
                    : 'navbar-link'
                }
                // onClick={() => showDropdown()}
              >
                ประวัติของเรา
              </p>
            </Link>
            <div
              className="navbar-dropdown"
              style={showDrop1 ? { display: 'block' } : { display: 'none' }}
            >
              <Link href="/review" passHref>
                <a
                  className={
                    router.pathname == '/review'
                      ? 'navbar-item is-active'
                      : 'navbar-item'
                  }
                  onClick={() => showHideNavBar(true)}
                >
                  รีวิว
                </a>
              </Link>
              <Link href="/portfolio" passHref>
                <a
                  className={
                    router.pathname == '/portfolio'
                      ? 'navbar-item is-active'
                      : 'navbar-item'
                  }
                  onClick={() => showHideNavBar(true)}
                >
                  ความสำเร็จของเรา
                </a>
              </Link>
            </div>
          </div>
          <div className="navbar-item has-dropdown is-hoverable" onMouseEnter={() => setShowDrop2(true)} onMouseLeave={() => setShowDrop2(false)}>
            <Link href="#" passHref>
              <p
                className={
                  RegExp('/blog').test(router.pathname) ||
                  router.pathname == '/studytips'
                    ? 'navbar-link is-active'
                    : 'navbar-link'
                }
              >
                บทความ
              </p>
            </Link>
            <div
              className="navbar-dropdown"
              style={showDrop2 ? { display: 'block' } : { display: 'none' }}
            >
              <Link href="/blog" passHref>
                <a
                  className={
                    RegExp('/blog').test(router.pathname)
                      ? 'navbar-item is-active'
                      : 'navbar-item'
                  }
                  onClick={() => showHideNavBar(true)}
                >
                  บทความที่น่าสนใจ
                </a>
              </Link>
              <Link href="/studytips" passHref>
                <a
                  className={
                    router.pathname == '/studytips'
                      ? 'navbar-item is-active'
                      : 'navbar-item'
                  }
                  onClick={() => showHideNavBar(true)}
                >
                  เกร็ดความรู้
                </a>
              </Link>
            </div>
          </div>
          <Link href="/contact" passHref>
            <a
              className={
                router.pathname == '/contact'
                  ? 'navbar-item is-active'
                  : 'navbar-item'
              }
              onClick={() => showHideNavBar(true)}
            >
              ติดต่อเรา
            </a>
          </Link>
          {!isLogin ? (
            <Link href="/login" passHref>
              <a
                className={
                  router.pathname == '/login'
                    ? 'navbar-item is-active'
                    : 'navbar-item'
                }
                onClick={() => showHideNavBar(true)}
              >
                เข้าสู่ระบบ
              </a>
            </Link>
          ) : (
            <>
              <Link href="/live" passHref>
                <a
                  className={
                    router.pathname == '/live'
                      ? 'navbar-item is-active'
                      : 'navbar-item'
                  }
                  onClick={() => showHideNavBar(true)}
                >
                  ห้องเรียนออนไลน์
                </a>
              </Link>
              <Link href="/vod" passHref>
                <a
                  className={
                    router.pathname == '/vod'
                      ? 'navbar-item is-active'
                      : 'navbar-item'
                  }
                  onClick={() => showHideNavBar(true)}
                >
                  บันทึกการสอน
                </a>
              </Link>
              <Link href="#" passHref>
                <a
                  className="navbar-item"
                  onClick={() => {
                    handleLogout()
                    showHideNavBar(true)
                  }}
                >
                  ออกจากระบบ
                </a>
              </Link>
            </>
          )}
          {isAdmin && (
            <Link href="/register" passHref>
              <a
                className={
                  router.pathname == '/register'
                    ? 'navbar-item is-active'
                    : 'navbar-item'
                }
                onClick={() => showHideNavBar(true)}
              >
                ลงทะเบียน
              </a>
            </Link>
          )}
        </div>
      </nav>
    </div>
  )
}

export default Navbar
