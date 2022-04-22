import React, { useEffect, useLayoutEffect, useState } from 'react'
import { SafeAreaView, Text, View, ScrollView } from 'react-native'
import { CustomListItem } from '../components/CustomListItem'
import tw from 'tailwind-react-native-classnames'
import { Avatar } from 'react-native-elements'
import { auth, db } from '../firebase'
import { TouchableOpacity } from 'react-native'
import { AntDesign, SimpleLineIcons } from '@expo/vector-icons'

export const HomeScreen = ({ navigation }) => {

    const [chats, setChats] = useState([]);

    useEffect(() => {

        let unsubscribe = db.collection('chats').onSnapshot((snapshot) => {

            setChats(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })
            )
            );
        })
        return unsubscribe;

    }, [])

    function signOut() {

        auth.signOut().then(() => {
            navigation.replace('Login')
        }).catch(error => alert(error))
    }
    ////////////////////////
    useLayoutEffect(() => {

        navigation.setOptions({
            headerStyle: { backgroundColor: 'white' },
            headerTitleStyle: { color: 'black' },
            title: "signal",
            headerLeft: () => (
                <TouchableOpacity onPress={signOut}>
                    <Avatar
                        rounded
                        source={{ uri: auth?.currentUser?.photoURL }}
                    />
                </TouchableOpacity>
            ),
            headerRight: () => (
                <View style={tw`flex-row justify-between w-16 `}>
                    <TouchableOpacity>
                        <AntDesign size={22} name='camerao' color='black' />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('CreateChat')}>
                        <SimpleLineIcons size={20} name='pencil' color='black' />
                    </TouchableOpacity>
                </View>
            )

        })
    }, [])

    return (
        <SafeAreaView style={tw`bg-red-100 w-full h-full`}>
            <ScrollView>
                {chats &&
                    chats.map(({id,data:{chatname}}) => (
                        <TouchableOpacity  key={id} onPress={()=>navigation.navigate('chatScreen',{chatId:id,chatname})}>
                            <CustomListItem
                               
                                chatname={chatname}
                                id={id}
                            />
                        </TouchableOpacity>

                    )
                    )
                }

            </ScrollView>
        </SafeAreaView>
    )
}