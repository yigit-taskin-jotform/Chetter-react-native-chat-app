// React ve diğer gerekli bileşenleri import et
import React, { useCallback, useState, useLayoutEffect, useEffect } from 'react';

// React Native bileşenlerini import et
import { Text, View, TouchableOpacity, Avatar, StyleSheet } from 'react-native';

// React Navigation ve tab navigator'ü import et
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Proje içindeki diğer ekranları import et
import MessageScreen from './MessageList';
import NotificationScreen from './Notification';
import ExploreScreen from './Explore';

// Firebase'den çıkış işlemini import et
import { signOut } from 'firebase/auth';

// Firebase authentication objesini import et
import { auth } from '../firebase';

// Expo'dan ikonları import et
import { MaterialCommunityIcons, MaterialIcons, Ionicons } from '@expo/vector-icons';

// Bottom Tab Navigator oluştur
const Tab = createBottomTabNavigator();

// Ana tab navigator bileşeni
export default function MyTabs({ route, navigation }) {
  // Kullanıcının kimliğini al
  const user = route.params.user_id;

  // Firebase'den çıkış işlemini gerçekleştiren fonksiyon
  const signOutNow = () => {
    signOut(auth).then(() => {
      // Çıkış yapıldıktan sonra Login ekranına yönlendir
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    }).catch((error) => { });
  }

  // Header'a çıkış butonunu ekleyen ve logikini yöneten effect
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity style={{
          marginRight: 10
        }}
          onPress={signOutNow}
        >
          <Text>logout</Text>
        </TouchableOpacity>
      )
    })
  }, [navigation]);

  // Bottom Tab Navigator bileşeni
  return (
    <Tab.Navigator initialRouteName='ExploreScreen'
      screenOptions={{
        tabBarActiveTintColor: '#FF6B76',
        tabBarStyle: {
          backgroundColor: '#373838',
          padding: 10
        },
      }}
    >
      {/* ExploreScreen ekranını tanımla */}
      <Tab.Screen name="ExploreScreen" component={ExploreScreen} initialParams={{ user_id: user }}
        options={() => ({
          headerBackVisible: false,
          headerShown: false,
          tabBarLabel: 'Explore',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="explore" color={color} size={size} />
          ),
        })} />

      {/* MessageScreen ekranını tanımla */}
      <Tab.Screen name="MessageScreen" component={MessageScreen} initialParams={{ user_id: user }}
        options={() => ({
          headerBackVisible: false,
          headerShown: false,
          tabBarLabel: 'Chat',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbubbles-sharp" color={color} size={size} />
          ),
        })} />

      {/* NotificationScreen ekranını tanımla */}
      <Tab.Screen name="NotificationScreen" component={NotificationScreen} initialParams={{ user_id: user }}
        options={() => ({
          headerBackVisible: false,
          headerShown: false,
          tabBarLabel: 'Notification',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="bell" color={color} size={size} />
          ),
        })} />
    </Tab.Navigator>
  );
}
