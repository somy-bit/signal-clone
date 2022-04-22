import React, { useLayoutEffect, useState } from 'react'
import { KeyboardAvoidingView, View } from 'react-native'
import { Button, Input, Text } from 'react-native-elements'
import tw from 'tailwind-react-native-classnames'
import { auth } from '../firebase'


export const RegisterScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [imageURL, setImageURL] = useState('');



    //////////////////////////////////////
    useLayoutEffect(() => {

        navigation.setOptions({
            headerBackTitle:'back to login'
        })

    }, [navigation])


    function register() {
        console.log('register')

        auth.createUserWithEmailAndPassword(email,password)
        .then((authUser)=>{
            console.log('userauth',authUser)
            authUser.user.updateProfile ({
                displayName : name,
                photoURL : imageURL ||
                'https://www.bsn.eu/wp-content/uploads/2016/12/user-icon-image-placeholder.jpg'
            })
        })
        .catch(error=>console.log(error.message))
    }

    return (
        <KeyboardAvoidingView
            style={tw`flex w-full h-full bg-white p-10 justify-center items-center`}
            behavior='padding' enabled>
            <Text h4 style={tw` text-center `}>create account for signal</Text>
            <View style={tw`w-full  mt-10`}>
                <Input
                    type='text'
                    placeholder='full name'
                    onChangeText={text => setName(text)}
                    value={name}
                    autoFocus
                />
                <Input
                    type='email'
                    placeholder='email'
                    onChangeText={text => setEmail(text)}
                    value={email}

                />
                <Input
                    type='password'
                    placeholder='Password'
                    onChangeText={text => setPassword(text)}
                    value={password}
                    secureTextEntry
                />
                <Input

                    placeholder='your profile image url'
                    onChangeText={text => setImageURL(text)}
                    value={imageURL}
                    onSubmitEditing={register}
                />
            </View>
            <Button title='Register'

                onPress={register}
                style={tw` px-10 mt-10`}
            />
            <View style={tw`h-10`} />
        </KeyboardAvoidingView>
    )
}