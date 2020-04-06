import React, {useCallback, useContext, useEffect} from 'react';
import {Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import { ListItem } from "react-native-elements";
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { Context as TrackContext } from '../context/TrackContext';
import {SafeAreaView} from "react-native-safe-area-context";



const TrackListScreen = () => {
    const navigation = useNavigation();
    const {state, fetchTracks } = useContext(TrackContext);
    const isFocused = useIsFocused();

   useEffect(() => {
       if(isFocused){
           fetchTracks();
       }
   }, [isFocused]);

    return(
        <SafeAreaView>
            <FlatList
                data={state}
                renderItem={({item}) => {
                    return (
                        <TouchableOpacity onPress={() => navigation.navigate('TrackDetails', {id: item._id} )}>
                            <ListItem chevron={true} title={item.name}/>
                        </TouchableOpacity>
                    )
                }}
                keyExtractor={item => item._id}
                />
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({});

export default TrackListScreen;
