import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook } from '@fortawesome/free-brands-svg-icons'
import { faChevronCircleUp } from '@fortawesome/free-solid-svg-icons'
import ScrollToTop from 'react-scroll-up'

const Footer = (): JSX.Element => {
  return (
    <nav className="navbar is-fixed-bottom">
      <footer className="footer pt-5 pb-5" style={{ minWidth: '100%' }}>
        <div className="container">
          <div className="columns">
            <div className="column is-half">
              <span>© 2021 สงวนลิขสิทธิ์ โดย สถาบันศุภปัญญา ไอ.เค.</span>
            </div>
            <div className="column is-half has-text-right">
              <a
                target="_blank"
                href="https://www.facebook.com/supapanyaik"
                title="facebook"
                rel="noreferrer"
              >
                <span className="icon-text">
                  <span className="icon mr-3">
                    <FontAwesomeIcon icon={faFacebook} size="1x" />
                  </span>
                  <span>สถาบันศุภปัญญาไอ.เค.</span>
                </span>
              </a>
              <ScrollToTop showUnder={160} style={{ bottom: 15 }}>
                <span id="scrollToTop" className="icon ml-3">
                  <FontAwesomeIcon icon={faChevronCircleUp} size="2x" />
                </span>
              </ScrollToTop>
            </div>
          </div>
        </div>
      </footer>
    </nav>
  )
}

export default Footer
