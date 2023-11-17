// Expo'nun StatusBar bileşenini import et
import { StatusBar } from 'expo-status-bar';

// React Native'den gerekli bileşenleri import et
import { StyleSheet, Text, View } from 'react-native';

// React Navigation'dan gerekli bileşenleri import et
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Proje içindeki ekranları import et
import Login from './screens/Login';
import Register from './screens/Register';
import Chat from './screens/Chat';
import MessageScreen from './screens/MessageList';
import MyTabs from './screens/TabBar';

// Stack Navigator oluştur
const Stack = createNativeStackNavigator();

// Ana uygulama bileşeni
export default function App() {
  return (
    // NavigationContainer'ı kullanarak uygulama içinde gezinmeyi başlat
    <NavigationContainer>
      {/* Stack Navigator kullanarak ekranları yönet */}
      <Stack.Navigator >
        {/* Login ekranını Stack'e ekle, özel seçenekleri belirle */}
        <Stack.Screen name='Login' component={Login} options={() => ({
          headerBackVisible: false,
          headerShown: false,
        })} />
        {/* Register ekranını Stack'e ekle, özel seçenekleri belirle */}
        <Stack.Screen name='Register' component={Register} options={() => ({
          headerBackVisible: false,
          headerShown: false,
        })} />
        {/* Chat ekranını Stack'e ekle, dinamik başlık ve özel header stilleri belirle */}
        <Stack.Screen name='Chat' component={Chat} options={
          ({ route }) => ({
            title: route.params.name, headerStyle: {
              backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          })
        } />
        {/* MessageScreen ekranını Stack'e ekle, özel seçenekleri belirle */}
        <Stack.Screen name='Messages' component={MessageScreen} options={() => ({
          headerBackVisible: false,
          headerShown: false,
        })} />
        {/* MyTabs ekranını Stack'e ekle, özel seçenekleri belirle */}
        <Stack.Screen name='MyTab' component={MyTabs} options={() => ({
          headerBackVisible: false,
          headerShown: false,
        })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// StyleSheet kullanarak stil tanımla
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
