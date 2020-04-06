import React, {useContext} from 'react';
import { Text, StyleSheet } from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import MapView, {Polyline} from "react-native-maps";
import { Context as TrackContext } from '../context/TrackContext';

const TrackDetailScreen = ({route: {params: {id}}}) => {
    const { state } = useContext(TrackContext);
    const track = state.find(t => t._id === id);
    const initialCoords = track.locations[0].coords;
    console.log(track.locations.length);
    return(
        <SafeAreaView>
            <Text style={{fontSize: 48}}>Track Detail Screen for {track.name}</Text>
            <MapView
                style={styles.map}
                initialRegion={{
                longitudeDelta: 0.01,
                latitudeDelta: 0.01,
                ...initialCoords
            }}>
                <Polyline coordinates={track.locations.map(loc => loc.coords)}/>
            </MapView>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    map: {
        height: 300
    }
});

export default TrackDetailScreen;
