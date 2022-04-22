import React, { useLayoutEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import {Input,Button} from 'react-native-elements'
import {View} from 'react-native'
import tw from 'tailwind-react-native-classnames'
import {db} from '../firebase'


export const CreateChatScreen=({navigation})=>{

    useLayoutEffect(()=>{
        navigation.setOptions({
            headerBackTitle : 'chats',


        })
    },[])

   async function createChat(){
        await db.collection('chats').add({
            chatname: input
        }).then(()=>
        {
            navigation.goBack();
            
        }).catch(error=>alert(error))
    } 

    const [input,setInput] = useState();

    return(
        <View style={tw`bg-white w-full h-full p-10`}>
            <Input 
            placeholder='chat name'
            value={input}
            onChangeText={text=>setInput(text)}
            leftIcon={<Icon name='wechat' size={24} type='antdesign' color='black' />}
            />
            <Button disabled={!input} title='create new chat' onPress={createChat}/>
        </View>
    )
}