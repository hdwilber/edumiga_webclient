import React from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'

import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import iconUrl from 'leaflet/dist/images/marker-icon.png'
import shadowUrl from 'leaflet/dist/images/marker-shadow.png'

let DefaultIcon = L.icon({
    iconUrl,
    shadowUrl,
});

L.Marker.prototype.options.icon = DefaultIcon;

const Cochabamba = {lat: -17.413977, lng: -66.165321}

const defaultLocation = { 
  point: Cochabamba,
  zoom: 14,
}

class InputLocation extends React.PureComponent {

  constructor(props) {
    super(props)
    this.map = null
    this.state = {
      currentLocation: null
    }
  }

  componentDidMount() {
    this.map.leafletElement.locate()
  }

  handleCenterChange = (e, props) => {
    const { name, onChange } = this.props
    onChange(e, {
      name: name,
      value: {
        point: e.target.getCenter(),
        zoom: e.target.getZoom(),
      }
    })
  }

  handleLocationFound = (e) => {
    this.setState({
      currentLocation: {
        point: e.latlng,
        zoom: 8,
      }
    })
  }

  render() {
    const { value } = this.props
    const { currentLocation } = this.state
    const center = value.point 
      || (currentLocation && currentLocation.point) 
      || (defaultLocation && defaultLocation.point)
    const zoom = value.zoom
      || (currentLocation && currentLocation.zoom) 
      || (defaultLocation && defaultLocation.zoom)

    return( 
      <div>
        <Map onLocationfound={this.handleLocationFound} onMoveend={this.handleCenterChange} style={{height: 300}} center={center}
          zoom={zoom}
          ref={(e) => this.map = e}
        >
          <TileLayer
            attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={center} >
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

export default InputLocation

