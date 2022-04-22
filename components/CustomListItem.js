import React, { useEffect,useState } from 'react'
import { ListItem, Avatar } from 'react-native-elements'
import tw from 'tailwind-react-native-classnames'
import { db } from '../firebase'

export const CustomListItem = ({ chatname, id }) => {

    const [messages, setMessages] = useState([])

    useEffect(() => {
        const unsubscribe = db.collection('chats').doc(id)
            .collection('messages')
            .onSnapshot(snapshot => {

                setMessages(snapshot.docs.map(doc => ({

                    data: doc.data()
                })))

            })

            return unsubscribe;
    }, [messages])

    return (

        <ListItem style={tw`bg-gray-100 border-t border-gray-200`}>
            <Avatar
                rounded
                size={45}
                source={{ uri:messages[0]?.data.photoURL}}
            />
            <ListItem.Content>
                <ListItem.Title style={{ fontWeight: '800' }}>{chatname}</ListItem.Title>
                <ListItem.Subtitle
                    numberOfLines={1}
                    ellipsizeMode='tail'
                >
                    {messages[0]?.data.message}
                </ListItem.Subtitle>
            </ListItem.Content>

        </ListItem>

    )
}