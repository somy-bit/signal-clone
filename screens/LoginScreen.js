import React, { useEffect } from 'react'
import { View, Text, KeyboardAvoidingView, StyleSheet } from 'react-native'
import { Button, Image, Input, } from 'react-native-elements'
import { useState } from 'react'
import tw from 'tailwind-react-native-classnames'
import { auth } from '../firebase'

export const LoginScreen = ({ navigation }) => {

    //check if user is logged in go ot home page
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                navigation.replace('Home')
            }
        })

        return unsubscribe;

    }, []);

    function signIn() {
        auth.signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user )
                navigation.replace('Home')
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });



    }

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <KeyboardAvoidingView
            behavior='padding'
            enabled
            style={tw`flex h-full w-full justify-center items-center bg-white p-10`}>

            <Image
                source={{ uri: 'https:blog.mozilla.org/internetcitizen/files/2018/08/signal-logo.png' }}
                style={{ width: 200, height: 200, resizeMode: 'contain' }}
            />
            <View style={tw`w-full px-6`}>
                <Input style={styles.inputStyle} placeholder='email' type='email' autoFocus value={email} onChangeText={text => setEmail(text)} />
                <Input style={styles.inputStyle} placeholder='password' type='password' secureTextEntry value={password} onChangeText={e => setPassword(e)} />

            </View>
            <Button
                onPress={signIn}
                style={styles.btn} title='Login' />
            <Button
                onPress={() => navigation.navigate('Register')}
                style={styles.btn} title='Register' type='outline' />
            <View style={tw`h-24`}></View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    btn: {

        width: 200,
        paddingVertical: 4,
        paddingHorizontal: 6,
        marginTop: 10
    },
    inputStyle: {

        width: 300,

    }
});