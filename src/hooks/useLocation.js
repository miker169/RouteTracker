import {useState, useEffect} from 'react';
import { requestPermissionsAsync, watchPositionAsync, Accuracy } from "expo-location";

export default (shouldTrack, callback) => {

    const [err, setErr] = useState(null);

    useEffect(() => {
        let subscriber;
        const startWatching = async () => {
        try {
            const res =  await requestPermissionsAsync();
            if (res.status !== 'granted') {
                setErr('Permission to access location was denied')
            }
            subscriber = await watchPositionAsync({
                    accuracy: Accuracy.BestForNavigation,
                    timeInterval: 200,
                    distanceInterval: 5
                },
                callback
            );
        } catch(e) {
            setErr(e);
        }
    }

        console.log('starting')
        if(shouldTrack){
            startWatching();
        }else{
            if(subscriber){
                subscriber.remove();
            }
            subscriber = null;
        }

        return () => {
            if(subscriber){
                subscriber.remove();
            }
        }

    }, [shouldTrack, callback]);

    return [err]

};