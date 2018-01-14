import React from 'react'
import { Form } from 'semantic-ui-react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'

import 'leaflet/dist/leaflet.css'

class LocationMap extends React.Component {

  constructor(props) {
    super(props)
    this.map = null
    this.handleCenterChange = this.handleCenterChange.bind(this)
    this.handleLocationFound = this.handleLocationFound.bind(this)
  }

  componentDidMount() {
    this.map.leafletElement.locate()
  }

  handleCenterChange(e, props) {
    const { name, onCenterChange } = this.props
    onCenterChange(e, {
      name: name,
      value: {
        point: e.target.getCenter(),
        zoom: e.target.getZoom(),
      }
    })
  }

  handleLocationFound(e) {
    const { onCenterChange } = this.props
    onCenterChange(e, {
      name: 'currentLocation', value: {
        point: e.latlng,
        zoom: 8,
      }
    })
  }


  render() {
    const { data, } = this.props
    return( 
      <div>
        <Map onLocationfound={this.handleLocationFound} onMoveend={this.handleCenterChange} style={{height: 300}} center={data.point}
          zoom={data.zoom}
          ref={(e) => this.map = e}
        >
          <TileLayer
            attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={data.point} >
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
