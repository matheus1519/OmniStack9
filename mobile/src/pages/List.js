import React, {useState, useEffect } from 'react';
import { Alert, SafeAreaView,ScrollView, View, TouchableOpacity,Text,Image,StyleSheet, AsyncStorage } from 'react-native';
import socketio from 'socket.io-client';

import SpotList from '../components/SpotList';

import logo from '../assets/logo.png'

export default function List({navigation}){
    const [techs,setTechs] = useState([]);

    useEffect(()=>{
        AsyncStorage.getItem('user').then(user_id => {
            const socket = socketio('http://192.168.0.27:3333',{
                query: { user_id}
            })

            socket.on('booking_response',booking => {
                Alert.alert(`Sua reserva em ${booking.spot.company} em ${booking.date} for ${booking.approved ? 'APROVADA' : 'REJEITADA'}`)
            })
        })
    })

    useEffect(()=>{ 
        
        AsyncStorage.getItem('techs').then(storagedTechs=>{
            const techsArray = storagedTechs.split(',').map(tech => tech.trim());
            setTechs(techsArray);
        })
    },[]);

    function handleSair() {
        AsyncStorage.removeItem('user');
        navigation.navigate('Login');
    }

    return (
        <SafeAreaView style={styles.container}>
            <Image style={styles.logo} source={logo} />
            <ScrollView>
                {techs.map(tech => <SpotList key={tech} tech={tech}/>)}

            </ScrollView>
            <View style={styles.view}>
                <TouchableOpacity style={styles.buttonSair} onPress={handleSair}>
                    <Text style={styles.textSair}>Sair</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
    },
    logo:{
        height:32, 
        resizeMode:'contain',
        alignSelf:'center',
        marginTop:10
    },
    buttonSair:{
        alignSelf:'center',
        justifyContent:'flex-end',
        backgroundColor:'#888',
        paddingHorizontal:50,
        paddingVertical:10,
        margin:10,
        borderRadius:4,
    },
    textSair:{
        color:'#fff',
        shadowColor:'#000',
        shadowRadius:2,
    },
    view:{
        borderTopWidth:1,
        borderTopColor:'#000',
    }
})