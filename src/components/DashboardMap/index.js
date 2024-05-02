import { useEffect, useRef, useState, useCallback, Fragment } from "react";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import '../DashboardMap/style.css';
import Card from "./card";

const DashboardMap = ({
}) => {

	const [position, setPosition] = useState(null);
	return (
		<Fragment>
			<MapContainer
				center={[29.9695, 76.8783]}
				zoom={13}
				scrollWheelZoom={false}
				minZoom={2}
				maxZoom={18}
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
       			 <Card />
				</MapContainer>
				</Fragment>
)
};
export default DashboardMap;
