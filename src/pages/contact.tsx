import React, { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook } from '@fortawesome/free-brands-svg-icons'
import { faPhoneAlt, faMapMarkedAlt, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'

const Contact = (): JSX.Element => {
  const [showMap, setShowMap] = useState<boolean>(false)
  const showMaps = () => {
    setShowMap(!showMap)
  }
  return (
    <>
      <Head>
        <title>รีวิว - สถาบันศุภปัญญาไอ.เค.</title>
        <meta property="og:title" content="รีวิว - สถาบันศุภปัญญาไอ.เค." />
      </Head>
      <div className="container pt-5 pb-5">
        <div className="is-flex is-flex-direction-column is-justify-content-center is-align-items-center">
          {showMap && <div id="detail" className="image-container is-flex is-flex-direction-column has-background-white" style={{ zIndex: 999 }}>
            <button className="delete is-large" onClick={showMaps}></button>
            <Image src={'/images/map.jpg'} alt={'map'} layout={'fill'} className="image" />
          </div>}
          <div className="is-flex is-flex-direction-row is-justify-content-center is-align-items-center mb-5">
            <div id="brand" className="mx-2">
              <span className="icon-text has-text-primary">
                <FontAwesomeIcon icon={faFacebook} size="8x" />
              </span>
            </div>
            <div id="detail" className="mx-2">
              <iframe src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fsupapanyaik%2F&amp;tabs&amp;width=340&amp;height=70&amp;small_header=true&amp;adapt_container_width=true&amp;hide_cover=false&amp;show_facepile=true&amp;appId=537431717232728" width="340" height="70" style={{ border: 'none', overflow: 'hidden' }} scrolling="no" frameBorder="0" allowFullScreen={true} allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
            </div>
          </div>
          <div className="is-flex is-flex-direction-row is-justify-content-center is-align-items-center mb-5">
            <div id="brand" className="mx-2">
              <span className="icon-text has-text-primary">
                <FontAwesomeIcon icon={faPhoneAlt} size="8x" />
              </span>
            </div>
            <div id="detail" className="mx-2 has-text-centered">
              <p className="is-size-4 has-text-weight-semibold">062 226 6359 (ครูก้อย​)</p>
              <p className="is-size-4 has-text-weight-semibold">02 100 6823 (สถาบัน​)</p>
            </div>
          </div>
          <div className="is-flex is-flex-direction-row is-justify-content-center is-align-items-center mb-5">
            <div id="brand" className="mx-2">
              <span className="icon-text has-text-primary">
                <FontAwesomeIcon icon={faMapMarkedAlt} size="8x" />
              </span>
            </div>
            <div id="detail" className="mx-2" style={{ position: 'relative', width: '20vw', height: '20vh'}}>
              <a>
                <Image src={'/images/map.jpg'} alt={'map'} layout={'fill'} objectFit={'contain'} onClick={showMaps} />
              </a>
            </div>
          </div>
          <div className="is-flex is-flex-direction-row is-justify-content-center is-align-items-center mb-5">
            <div id="brand" className="mx-2">
              <span className="icon-text has-text-primary">
                <FontAwesomeIcon icon={faMapMarkerAlt} size="8x" />
              </span>
            </div>
            <div id="detail" className="mx-2" style={{ position: 'relative', width: '20vw', height: '20vh'}}>
              <a href="https://goo.gl/maps/gdjEErdsk46xZTpBA" target="_blank" rel="noreferrer">
                <Image src={'/images/googlemaps.jpg'} alt={'map'} layout={'fill'} objectFit={'contain'} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Contact
