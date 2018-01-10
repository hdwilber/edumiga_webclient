import React from 'react'
import { Form } from 'semantic-ui-react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'

import 'leaflet/dist/leaflet.css'

class LocationMap extends React.Component {

  constructor(props) {
    super(props)
    this.map = null
  }

  componentDidMount() {
    this.map.leafletElement.locate()
  }

  render() {
    const { onInputChange, onLocationFound, onCenterChange, position, address} = this.props
    return( 
      <div>
        <Form>
          <Form.Input value={address} name="name" onChange={onInputChange} label="Name" type="text"/>
        </Form>
        <Map onLocationfound={onLocationFound} onMoveend={onCenterChange} style={{height: 300}} center={position} 
          zoom={10}
          ref={(e) => this.map = e}
        >

          <TileLayer
            attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position} >
            <Popup>
              <span>
                A pretty CSS3 popup. <br /> Easily customizable.
              </span>
            </Popup>
          </Marker>
        </Map>
      </div>
    )
  }
}

export default LocationMap
