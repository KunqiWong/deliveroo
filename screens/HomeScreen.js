import { View, Text, SafeAreaView, Image, TextInput, ScrollView, RefreshControl } from 'react-native'
import React, { useLayoutEffect, useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { ChevronDownIcon, UserIcon, MagnifyingGlassIcon, AdjustmentsHorizontalIcon } from "react-native-heroicons/outline"
import Categories from '../components/Categories/Categories'
import FeaturedRow from '../components/FeaturedRow/FeaturedRow'
import sanityClient from '../sanity'
const HomeScreen = () => {
  const navigation = useNavigation()
  const [FeaturedCategories, setFeaturedCategories] = useState([])
  const [isRefreshing, setIsRefreshing] = useState(false)

  useEffect(() => {
    sanityClient.fetch(
      `
        *[_type == "featured"] {
          ...,
          restaurants[]->{
            ...,
            dishes[] ->
          }
        }`
    ).then(data => {
      setFeaturedCategories(data)
    })
  }, [])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    })
  }, [])

  const onRefresh = () => {
    setIsRefreshing(true)
    sanityClient.fetch(
      `
        *[_type == "featured"] {
          ...,
          restaurants[]->{
            ...,
            dishes[] ->
          }
        }`
    ).then(data => {
      setFeaturedCategories(data)
      setIsRefreshing(false)
    })
  }

  return (
    <SafeAreaView className="bg-white pt-14">

      {/* header */}
      <View className="flex-row pb-3 items-center mx-4 space-x-2">
        <Image
          source={{ uri: 'https://links.papareact.com/wru' }}
          className="h-7 w-7 bg-gray-300 p-4 rounded-full">
        </Image>
        <View className="flex-1">
          <Text className="font-bold text-gray-400 text-xs">Deliver Now!</Text>
          <Text className="font-bold text-xl flex-row items-center">
            Current Location
            <ChevronDownIcon size={20} color="#00CCBB"></ChevronDownIcon>
          </Text>
        </View>
        <UserIcon size={35} color="#00CCBB"></UserIcon>
      </View>

      {/* search */}
      <View className="flex-row items-center space-x-2 mx-4 pb-2">
        <View className="flex-row flex-1 space-x-2 bg-gray-200 p-3">
          <MagnifyingGlassIcon color="#00CCBB"></MagnifyingGlassIcon>
          <TextInput
            placeholder='restaurants and cuisines'
            keyboardType='default'
          ></TextInput>
        </View>
        <AdjustmentsHorizontalIcon color="#00CCBB"></AdjustmentsHorizontalIcon>
      </View>

      {/* body */}
      <ScrollView
        className=" bg-gray-100"
        contentContainerStyle={{
          paddingBottom: 120,
        }}
        refreshControl={
          <RefreshControl
            // progressViewOffset={100}
            onRefresh={onRefresh} //刷新操作
            refreshing={isRefreshing} //等待加载出现加载的符号是否显示
            colors={['red', 'green', 'blue']}
          // title="正在加载中..."
          // titleColor='green'
          />
        }
      >

        {/* Categories */}
        <Categories></Categories>

        {/* Featured Rows */}
        {FeaturedCategories?.map(category => (
          <FeaturedRow
            title={category.name}
            description={category.short_description}
            id={category._id}
            key={category._id}
          ></FeaturedRow>
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen