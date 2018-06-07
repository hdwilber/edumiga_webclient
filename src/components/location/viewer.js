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

class LocationViewer extends React.Component {
  constructor(props) {
    super(props)
    this.map = null
    this.state= {
      currentLocation: null,
    }
  }

  renderLocations() {
    const { location, locations } = this.props
    if (location) {
      const { point, info } = location
      return (
        <Marker position={location.point} >
          <Popup>
            <span>{info}</span>
          </Popup>
        </Marker>
      )
    } else {
      return locations.map(({point, info})=> point 
        && (
          <Marker position={point} >
            <Popup>
              <span>{info}</span>
            </Popup>
          </Marker>
        )
    }
  }

  handleLocationFound = e => {
    this.setState({
      currentLocation: {
        point: e.latlng,
        zoom: 5,
      }
    })
  }

  render() {
    const {  } = this.props
    return( 
      <div>
        <Map onLocationfound={this.handleLocationFound} style={{height: 300}} center={data.point}
          zoom={data.zoom}
          ref={(e) => this.map = e}
        >
          <TileLayer
            attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          { this.renderLocations() }
        </Map>
      </div>
    )
  }
}
