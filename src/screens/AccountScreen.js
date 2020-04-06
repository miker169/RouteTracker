import React , {useContext} from 'react';
import {Button} from 'react-native-elements';
import {  Text, StyleSheet } from 'react-native';
import Spacer from "../components/Spacer";
import {Context as AuthContext} from "../context/AuthContext";
import {SafeAreaView} from "react-native-safe-area-context";

const AccountScreen = () => {
    const { signout } = useContext(AuthContext);
    return(
        <SafeAreaView >
            <Text style={{fontSize: 48}}>Account Screen</Text>
            <Spacer><Button title="SignOut" onPress={signout} /></Spacer>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({});

export default AccountScreen;
