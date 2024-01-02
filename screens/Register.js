// React ve gerekli diğer bileşenleri import et
import React, { useState, Fragment } from 'react';

// React Native bileşenlerini import et
import { View, StyleSheet, Image, Dimensions, TouchableOpacity, Text, SafeAreaView } from 'react-native'

// React Native Elements bileşenlerini import et
import { Input, Button } from 'react-native-elements';

// Firebase modülünden gerekli işlevleri import et
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { collection, addDoc, getDocs, setDoc, doc, updateDoc } from 'firebase/firestore';

// Register bileşeni
const Register = ({ navigation }) => {
    // State hook'ları kullanarak bileşenin içinde kullanılacak değişkenleri tanımla
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [avatar, setAvatar] = useState('https://robohash.org/default');
    
    // Ekranın genişliğini al
    const dimensions = Dimensions.get('window');
    const imageWidth = dimensions.width;

    // Kullanıcı kaydını gerçekleştiren fonksiyon
    const register = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                
                // Firestore'a kullanıcı bilgilerini kaydet
                setDoc(doc(db, "users", user.uid), { uid: user.uid, email: email, name: name, req: [], realFriend: [], avatar: avatar });

                // Kullanıcının profilini güncelle
                updateProfile(user, {
                    displayName: name,
                    photoURL: avatar ? avatar : 'https://robohash.org/default',
                })

                    .then(() => {
                        // Başarılı kayıt mesajı göster ve Login ekranına yönlendir
                        alert('Registered, please login.');
                        navigation.navigate('Login');
                    })
                    .catch((error) => {
                        alert(error.message);
                    })
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorMessage);
            });
    }

    // Avatar oluşturan fonksiyon
    const generate = () => {
        if (name !== '') {
            setAvatar('https://robohash.org/' + name)
            console.log(avatar)
        }
    }

    // JSX döndüren render fonksiyonu
    return (
        <Fragment>
            {/* SafeAreaView ile güvenli bir görüntüleme alanı oluştur */}
            <SafeAreaView style={{ flex: 0, backgroundColor: '#FFFFFF' }} />
            <View style={styles.container}>

                {/* Küçük ekran görünümü */}
                <View style={styles.smallScreen}>
                    {/* Kullanıcı adı, email ve şifre için Input bileşenlerini ekle */}
                    <Input
                        placeholder='Adınızı girin'
                        label='Adınız'
                        value={name}
                        onChangeText={text => setName(text)}
                    />
                    <Input
                        placeholder='Email adresinizi girin'
                        label='Email'
                        value={email}
                        onChangeText={text => setEmail(text)}
                    />
                    <Input
                        placeholder='Şifrenizi girin'
                        label='Şifre'
                        value={password} onChangeText={text => setPassword(text)}
                        secureTextEntry
                    />
                    
                    {/* Avatar oluştur ve görüntüle */}
                    <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', marginBottom: 20, alignItems: 'center', }}>
                        <Image source={{ uri: avatar }} style={{ width: 60, height: 60, marginLeft: 50 }} />
                        <TouchableOpacity
                            onPress={() => {
                                generate();
                            }}
                            style={{
                                backgroundColor: '#A8A8A8',
                                paddingHorizontal: 5,
                                paddingVertical: 10,
                                width: '50%',
                                borderRadius: 5,
                            }}>
                            <Text style={{
                                textAlign: 'center', color: '#FFFFFF'
                            }}>Rastgele Avatar Oluşturun</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Kayıt ve Geri Git butonları */}
                    <TouchableOpacity
                        onPress={() => {
                            register();
                        }}
                        style={{
                            backgroundColor: '#4E50F7',
                            paddingHorizontal: 5,
                            paddingVertical: 10,
                            width: '70%', borderRadius: 15,
                            marginBottom: 10
                        }}>
                        <Text style={{
                            textAlign: 'center', color: '#FFFFFF', fontSize: 18
                        }}>Kayıt Ol</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('Login');
                        }}
                        style={{
                            backgroundColor: '#414242',
                            paddingHorizontal: 5,
                            paddingVertical: 10,
                            width: '70%', borderRadius: 15,
                        }}>
                        <Text style={{
                            textAlign: 'center', color: '#FFFFFF', fontSize: 18
                        }}>Geri</Text>
                    </TouchableOpacity>

                {/* Arka plan görüntüsünü ekle */}
                <Image source={require('../assets/joinus.jpg')} style={{ width: 0.9 * Dimensions.get('window').width, height: 200, marginTop: 5}} />
                </View>
            </View>
        </Fragment>
    )
}

// Stilleri tanımla
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#7766F2'
    },
    button: {
        width: 370,
        marginTop: 10
    },
    smallScreen: {
        width: 0.9 * Dimensions.get('window').width,
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingTop: 40,
        padding: 20,
        marginTop: 50,
        marginBottom: 10,
        alignItems: 'center',
        borderRadius: 4,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
    }
});

// Register bileşenini dışa aktar
export default Register;
