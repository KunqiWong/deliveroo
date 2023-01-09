import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { urlFor } from '../../sanity'
const CategoryCard = ({ imgUrl, title }) => {
  return (
    <TouchableOpacity className="relative mr-2">
      <Image source={{ uri: urlFor(imgUrl).width(200).url() }} className="h-20 w-20 rounded"></Image>
      {/* <Image source={{ uri: 'https://links.papareact.com/wru' }} className="h-20 w-20 rounded"></Image> */}
      <Text className="absolute bottom-1 left-1 text-white font-bold">{title}</Text>
    </TouchableOpacity>
  )
}

export default CategoryCard