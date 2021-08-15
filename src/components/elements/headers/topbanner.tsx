import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook } from '@fortawesome/free-brands-svg-icons'
import { faPhoneAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons'

const TopBanner = (): JSX.Element => {
  return (
    <div className="top-band">
      <div className="container">
        <div className="level is-size-5 has-text-light is-mobile">
          <div className="level-left">
            <div className="level-item">
              <span className="icon-text">
                <span className="icon mr-3">
                  <FontAwesomeIcon icon={faPhoneAlt} size="1x" />
                </span>
                <a href="tel: +6662-225-6359">062 225 6359</a>
              </span>
            </div>
            <div className="level-item is-hidden-mobile">
              <span className="icon-text">
                <span className="icon mr-3">
                  <FontAwesomeIcon icon={faEnvelope} size="1x" />
                </span>
                <a href="mailto:kittipos@picturo.us">kittipos@picturo.us</a>
              </span>
            </div>
          </div>
          <div className="level-right">
            <div className="level-item link-light">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TopBanner
