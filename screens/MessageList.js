import { collection, addDoc, query, orderBy, onSnapshot, where, getDoc, doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import React, { useEffect, useState, useLayoutEffect, Fragment } from 'react';
import { auth, db } from '../firebase';
// import { collection, query, where } from "firebase/firestore";
import {
  SafeAreaView,
  StatusBar,

  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  FlatList,
  ScrollView,
  Button,
  useColorScheme,
  View,
  Dimensions,


} from 'react-native';


const MessageScreen = ({ navigation, route }) => {
  const dimensions = Dimensions.get('window');
  const imageWidth = dimensions.width;
  const [notiUsers, setNotiUsers] = useState([])
  const [Users, setUsers] = useState([])

  useEffect(() => {
    const getUserContacts = () => {
      const q = query(doc(db, "users", route.params.user_id));
      const unsubscribe = onSnapshot(q, async (snapshot) => {
        const contactsObject = snapshot.data().realFriend;
        const contactsSnap = await Promise.all(contactsObject.map((c) => getDoc(doc(db, "users", c))))
        const contactDetails = contactsSnap.map((d) => ({
          id: d.uid,
          ...d.data()
        }))
        setNotiUsers(contactDetails);
      })
    }
    getUserContacts();
  }, [navigation])


  return (
    <Fragment>
      <SafeAreaView style={{ flex: 0, backgroundColor: '#FFDE59' }} />
      <View style={{ backgroundColor: '#FFDE59', flex: 1, alignItems: 'center' }}>
        <Image source={require('../assets/chat_hero.jpg')} style={{ width: imageWidth, height: 270, marginBottom: 15, marginTop: 0 }} />

        <View>
          <FlatList
            data={notiUsers}
            //   keyExtractor={(item)=>item.uid}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => navigation.navigate('Chat', { name: item.name, uid: item.uid, avatar: item.avatar })} >
                <View style={styles.card} >
                  <Image style={styles.userImageST} source={{ uri: item.avatar }} />
                  <View style={styles.textArea}>
                    <Text style={styles.nameText} >{item.name}</Text>
                    <Text style={styles.msgContent} >{item.email}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </Fragment>

  )
}

const styles = StyleSheet.create({
  Contain: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Container: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  card: {
    backgroundColor: '#F4F8FF',
    paddingVertical: 10,
    //paddingHorizontal: 10,
    borderRadius: 50,
    width: '100%',
    height: 'auto',
    marginHorizontal: 4,
    marginVertical: 6,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  userImage: {
    paddingTop: 15,
    paddingBottom: 15,
  },
  userImageST: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  textArea: {
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 5,
    paddingLeft: 10,
    width: 300,
    backgroundColor: 'transparent',
  },
  userText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nameText: {
    fontSize: 14,
    fontWeight: '900'
  },
  msgTime: {
    textAlign: 'right',
    fontSize: 11,
    marginTop: -20,
  },
  msgContent: {
    paddingTop: 5,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },

})

export default MessageScreen;
