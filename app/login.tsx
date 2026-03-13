import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from 'expo-router';
import React, { useEffect } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function LoginScreen() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const doLogin = async()=>{
        setLoading(true);
        let response = await fetch('https://dev.orderzone.net/webservice_ionic/oraApiNew/applogin',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                login_email: email,
                login_password: password
            })
        });
        if(response.ok){
            let data = (await response.json());
            if(data.token){
                alert('Login successful: ' + data.username);
                await AsyncStorage.setItem('user', JSON.stringify(data));
                router.replace('/(tabs)');
            }else{
                alert('Invalid credentials');
            }
            
        }else{
            alert('Login failed');
        }
        setLoading(false);
    }
    useEffect(() => {
        // Check if user is already logged in
        AsyncStorage.getItem('user').then(user => {
            if (user) {
                router.replace('/(tabs)');
            }
        });
    },[]);
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20}}>
      <Text>LoginScreen</Text>
      <View>
        <TextInput placeholder='Email' value={email} onChangeText={setEmail}/>
        <TextInput placeholder='Password' secureTextEntry={true} value={password} onChangeText={setPassword}/>
        <TouchableOpacity onPress={doLogin} disabled={loading} style={{ backgroundColor: loading ? 'gray' : 'blue', padding: 10, marginTop: 10 }}>
            <Text style={{ color: 'white', textAlign: 'center' }}>{loading ? 'Logging in...' : 'Login'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({})