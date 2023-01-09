import { View, Text, SafeAreaView, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useMemo, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { removeFromBasket, selectBasketItems, selectBasketTotal } from '../features/basketSlice'
import { selectRestaurant } from '../features/restaurantSlice'
import { useDispatch, useSelector } from "react-redux"
import { XCircleIcon } from 'react-native-heroicons/solid'
import { urlFor } from '../sanity'

const BasketScreen = () => {
  const navigation = useNavigation()
  const items = useSelector(selectBasketItems)
  const restaurant = useSelector(selectRestaurant)
  const count = useSelector(selectBasketTotal)
  const [groupItemsInBasket, setGroupItemsInBasket] = useState([])
  const dispatch = useDispatch()

  useMemo(() => {
    const groupItems = items.reduce((results, item) => {
      (results[item.id] = results[item.id] || []).push(item)
      return results
    }, {})
    setGroupItemsInBasket(groupItems)
  }, [items])

  return (
    <SafeAreaView className="flex-1 pt-10">
      <View className="flex-1 bg-gray-100">

        <View className="border-b border-[#00CCBB] bg-white p-5">
          <View>
            <Text className="text-lg font-bold text-center">Basket</Text>
            <Text className=" text-center text-gray-400">{restaurant.title}</Text>
          </View>
          <TouchableOpacity
            onPress={navigation.goBack}
            className="rounded-full bg-gray-100 absolute top-3 right-5"
          >
            <XCircleIcon color="#00CCBB" height={50} width={50} />
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center space-x-4 px-4 py-3 bg-white my-5">
          <Image
            source={{ uri: 'https://links.papareact.com/wru' }}
            className="h-7 w-7 bg-gray-300 p-4 rounded-full">
          </Image>
          <Text className="flex-1">Deliver in 50-70 min</Text>
          <TouchableOpacity>
            <Text className="text-[#00CCBB]">Change</Text>
          </TouchableOpacity>
        </View>

        <ScrollView className=" divide-y divide-gray-200">
          {Object.entries(groupItemsInBasket).map(([key, items]) => (
            <View key={key} className="flex-row items-center space-x-3 py-2 px-5 bg-white">
              <Text className="text-[#00CCBB]">{items.length} x</Text>
              <Image
                source={{ uri: urlFor(items[0].image).url() }}
                className="h-12 w-12 rounded-full">
              </Image>
              <Text className="flex-1">{items[0].name}</Text>
              <Text className="text-gray-600">${items[0].price}</Text>
              <TouchableOpacity>
                <Text
                  className="text-[#00CCBB] text-xs"
                  onPress={() => dispatch(removeFromBasket({ id: key }))}
                >Remove</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        <View className="p-5 bg-white mt-5 space-y-4">
          <View className="flex-row justify-between ">
            <Text className="text-gray-400">费用</Text>
            <Text className="text-gray-400">${count}</Text>
          </View>
          <View className="flex-row justify-between ">
            <Text className="text-gray-400">送餐费</Text>
            <Text className="text-gray-400">$10</Text>
          </View>
          <View className="flex-row justify-between ">
            <Text>总计</Text>
            <Text className="font-extrabold">${count + 10}</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('PreparingOrder')}>
            <Text
              className="bg-[#00CCBB] text-xl font-bold text-white rounded-lg p-5 text-center"
            >结算</Text>
          </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
  )
}

export default BasketScreen