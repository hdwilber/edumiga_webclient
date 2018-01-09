import React from 'react'
import { Form } from 'semantic-ui-react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'

class LocationMap extends React.Component {

  render() {
    const { onInputChange, position, address} = this.props
    return( 
      <div>
        <Form>
          <Form.Input value={address} name="name" onChange={onInputChange} label="Name" type="text"/>
        </Form>
        <Map style={{height: 300}} center={position} zoom={12}>

          <TileLayer
            attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
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
