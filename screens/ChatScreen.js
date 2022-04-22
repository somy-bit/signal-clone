import React, { useLayoutEffect, useState } from 'react'
import { View, Text, KeyboardAvoidingView, Platform, ScrollView, TextInput, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons'
import tw from 'tailwind-react-native-classnames'
import { TouchableOpacity } from 'react-native'
import { auth, db } from '../firebase'
import * as firebase from 'firebase/compat';
import { Avatar } from 'react-native-elements'



export const ChatScreen = ({ route, navigation }) => {

    const { chatId, chatname } = route.params;

    const [message, setMessage] = useState();
    const [messages, setMessages] = useState();


    useLayoutEffect(() => {
        navigation.setOptions({

            headerTitle: chatname,
            headerLeftBackVisible: false,

        })

    }, [])


    function sendMessage() {

        Keyboard.dismiss()
        db.collection('chats').doc(chatId).collection('messages').add({
            timestamp: firebase.database.ServerValue.TIMESTAMP,
            message: message,
            displayName: auth.currentUser.displayName,
            email: auth.currentUser.email,
            photoURL: auth.currentUser.photoURL
        })

        

        setMessage('')
    }

    useLayoutEffect(() => {

        let unsubscribe = db.collection('chats')
            .doc(chatId)
            .collection('messages')
            .orderBy('timestamp', 'asc')
            .onSnapshot(snapshot => {
                setMessages(
                    snapshot.docs.map(doc => ({
                        id: doc.id,
                        data: doc.data()
                    }))
                )
                
            });

        return unsubscribe;

    }, [route])
    /////////////////////////////////

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS ? 'padding' : 'height'}
            keyboardVerticalOffset={90}
            style={tw`h-full w-full`} >


            <TouchableWithoutFeedback >
                <>
                    <ScrollView style={styles.container}>
                        {messages?.map(({ id, data }) => (
                            data.email === auth.currentUser.email ?

                                <View key={id} style={styles.reciever}>
                                    <Avatar
                                        containerStyle={{
                                            position: 'absolute',
                                            bottom: -30,
                                            right: -20
                                        }}
                                        position='absolute'
                                        bottom={-30}
                                        right={-20}
                                        rounded source={{ uri: data.photoURL }} />
                                    <Text style={styles.sentMsg}>{data.message}</Text>
                                    


                                </View>
                                :
                                <View key={id} style={styles.sender}>
                                    <Avatar
                                        containerStyle={{
                                            position: 'absolute',
                                            bottom: -35,
                                            left: -18
                                        }}
                                        position='absolute'
                                        bottom={-35}
                                        Left={-18}
                                        rounded source={{ uri: data.photoURL}} />
                                    <Text style={tw`text-white`}>{data.message}</Text>
                                </View>
                        ))}
                    </ScrollView>


                    <View style={styles.footer}>
                        <TextInput placeholder='message...' style={styles.input} value={message} onChangeText={text => setMessage(text)} />
                        <TouchableOpacity onPress={sendMessage}>
                            <Ionicons name='send' size={24} color='#2b68e6' />
                        </TouchableOpacity>
                    </View>
                </>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 8
    },
    footer: {
        width: '100%',

        flexDirection: 'row',
        padding: 15,
        alignItems: 'center',
        backgroundColor: 'white'

    },
    input: {
        height: 40,
        bottom: 0,
        borderColor: 'transparent',
        padding: 10,
        borderRadius: 30,
        flex: 1,
        backgroundColor: '#ececec',
        borderWidth: 1,
        color: 'grey',
        marginRight: 15

    },
    reciever: {
        padding: 15,
        alignSelf: 'flex-end',
        marginRight: 15,
        maxWidth: '80%',
        position: 'relative',
        backgroundColor: '#ececec',
        marginBottom: 33,
        borderRadius: 20
    },
    sender: {

        padding: 15,
        alignSelf: 'flex-start',
        marginLeft: 15,
        maxWidth: '80%',
        position: 'relative',
        backgroundColor: '#2b68e6',
        marginBottom: 37,
        borderRadius: 20

    }
})