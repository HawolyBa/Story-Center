import React from 'react'
import { Col } from 'reactstrap'
import { defaultLocationImage } from '../default/defaultImages'

const LocationCard = ({ location, toggle }) => {
  return (
    <Col lg="2" md="3" xs="6" onClick={toggle}>
      <figure className="item-card location-card">
        <div className="image" >
          <div className="inner-image" style={{ background: `url(${location.image ? location.image : defaultLocationImage}) no-repeat center / cover` }} id={location.id}/>
        </div>
        <figcaption>
          <h4>{location.name}</h4>
        </figcaption>
      </figure>
    </Col>
  )
}

export default LocationCard