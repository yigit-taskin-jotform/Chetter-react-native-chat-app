// React ve gerekli bileşenleri import et
import React, { useState } from 'react';
import { View, StyleSheet, Image, Dimensions, TouchableOpacity, Text } from 'react-native'
import { Input } from 'react-native-elements';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

// Login bileşeni
const Login = ({ navigation }) => {
    // Kullanıcının girdiği e-posta ve şifreyi tutacak state'leri tanımla
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Ekran boyutlarını al
    const dimensions = Dimensions.get('window');
    const imageWidth = dimensions.width;

    // Kayıt ekranını açacak fonksiyon
    const openRegisterScreen = () => {
        navigation.navigate('Register');
    };

    // Giriş yapacak fonksiyon
    const signin = () => {
        // Firebase Authentication servisi kullanarak e-posta ve şifre ile giriş yap
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Giriş başarılı olduğunda kullanıcı ID'sini logla ve ana sekme ekranına yönlendir
                console.log(userCredential.user.uid)
                navigation.navigate('MyTab', { user_id: userCredential.user.uid });
            })
            .catch((error) => {
                // Giriş hatası durumunda hata mesajını logla ve kullanıcıya uyarı göster
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorMessage);
            });
    };

    // JSX döndüren render fonksiyonu
    return (
        <View style={styles.container}>
            {/* Giriş ekranının içeriği */}
            <View style={styles.smallScreen}>
                {/* E-posta ve şifre girişi için Input bileşenleri */}
                <Input
                    placeholder='Email Adresinizi Girin'
                    label='Email'
                    leftIcon={{ type: 'material', name: 'email' }}
                    value={email}
                    onChangeText={text => setEmail(text)}
                />
                <Input
                    placeholder='Şifrenizi Girin'
                    label='Şifre'
                    leftIcon={{ type: 'material', name: 'lock' }}
                    value={password}
                    onChangeText={text => setPassword(text)}
                    secureTextEntry
                />

                {/* Giriş yap butonu */}
                <TouchableOpacity
                    onPress={() => signin()}
                    style={{
                        backgroundColor: '#414242',
                        paddingHorizontal: 5,
                        paddingVertical: 10,
                        width: '70%', borderRadius: 15,
                        marginTop: 30,
                        marginBottom: 15
                    }}>
                    <Text style={{
                        textAlign: 'center', color: '#FFFFFF', fontSize: 18
                    }}>Giriş Yap</Text>
                </TouchableOpacity>

                {/* Kayıt ol butonu */}
                <TouchableOpacity
                    onPress={() => openRegisterScreen()}
                    style={{
                        backgroundColor: '#4E50F7',
                        paddingHorizontal: 5,
                        paddingVertical: 10,
                        width: '70%', borderRadius: 15,
                    }}>
                    <Text style={{
                        textAlign: 'center', color: '#FFFFFF', fontSize: 18
                    }}>Kayıt Ol</Text>
                </TouchableOpacity>
                <Image source={require('../assets/hero.jpg')} style={{ width: 0.9 * Dimensions.get('window').width, height: 270, marginTop: 15 }} />
            </View>
        </View>
    )
}

// Stilleri tanımla
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#4E50F7'
    },
    button: {
        width: 0.7 * Dimensions.get('window').width,
        marginTop: 10,
        // color: '#4E50F7'
    },
    smallScreen: {
        width: 0.9 * Dimensions.get('window').width,
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingTop: 40,
        marginTop: 80,
        marginBottom: 10,
        padding: 20,
        alignItems: 'center',
        borderRadius: 4,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
    }
});

// Login bileşenini dışa aktar
export default Login;
