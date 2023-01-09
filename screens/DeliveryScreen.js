import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { selectRestaurant } from '../features/restaurantSlice'
import { SafeAreaView } from 'react-native-safe-area-context'
import { XMarkIcon } from 'react-native-heroicons/solid'
import * as Progress from "react-native-progress"
import MapView, { Marker } from 'react-native-maps'

const DeliveryScreen = () => {
  const navigation = useNavigation()
  const restaurant = useSelector(selectRestaurant)
  return (
    <View className="bg-[#00CCBB] flex-1">
      <SafeAreaView className="z-50">
        <View className="flex-row justify-between items-center p-5">
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <XMarkIcon color="white" size={30} />
          </TouchableOpacity>
          <Text className="text-white font-light text-lg">Order Help</Text>
        </View>
        <View className="bg-white z-50 mx-5 my-2 rounded-md shadow-md p-6">
          <View className="flex-row justify-between items-center">
            <View>
              <Text className="text-lg text-gray-400">Estimated Arrival</Text>
              <Text className="text-4xl font-bold">45-55 Minutes</Text>
              <Progress.Bar size={30} color="#00CCBB" indeterminate={true} />
              <Text className="mt-3 text-gray-500">Your order at {restaurant.title} is being prepared</Text>
            </View>
            <Image
              source={{
                uri: "https://media1.giphy.com/media/gsr9MG7bDvSRWWSD1Y/200w.gif",
              }}
              className="h-20 w-20"
            />
          </View>

        </View>
      </SafeAreaView>

      <MapView
        initialRegion={{
          // latitude: restaurant.lat,
          // longitude: restaurant.long,
          latitude: 42.882004,
          longitude: 74.582748,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
        showsUserLocation={true}
        className="flex-1 -mt-10 z-0"
        mapType='standard'
      >
        <Marker
          coordinate={{
            latitude: 42.882004,
            longitude: 74.582748,
          }}
          title={restaurant.title}
          description={restaurant.short_description}
          identifier="origin"
          pinColor='#00CCBB'
        />
      </MapView>

      <SafeAreaView className="h-28  bg-white">
        <View className="flex-row space-x-5 items-center -mt-5">
          <Image
            className="h-12 w-12 rounded-full ml-5 bg-gray-300"
            source={{ uri: 'https://links.papareact.com/wru' }}
          ></Image>
          <View className="flex-1">
            <Text className="text-lg">snaladsla asdad</Text>
            <Text className="text-gray-400">你的骑手</Text>
          </View>
          <Text className="text-[#00CCBB] text-lg font-bold mr-5">Call</Text>
        </View>
      </SafeAreaView>
    </View>
  )
}

export default DeliveryScreen