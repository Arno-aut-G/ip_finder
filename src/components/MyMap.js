import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'





const MyMap = ({ ipData, info }) => {

    const { lat, lng } = ipData.location
    const position = [lat, lng]
    const style = {
        width: '100%',
        height: 400
    }

    return (
        <MapContainer center={position} zoom={10} scrollWheelZoom={false} style={style}>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
                <Popup>
                    <div style={{ textAlign: 'center' }}>
                        <img src={info.flag} style={{ width: 100 }} alt='flag' />
                    </div>
                    <p style={{ textAlign: 'center' }}>{info.name} <br />
                    Inhabitants: {info.population} </p>


                </Popup>
            </Marker>
        </MapContainer >

    )

}



export default MyMap