import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ArrowRightIcon } from "react-native-heroicons/outline"
import RestaurantCard from './RestaurantCard'
import sanityClient from '../../sanity'

const FeaturedRow = ({ id, title, description }) => {
  const [restaurants, setRestaurants] = useState([])

  useEffect(() => {
    sanityClient
      .fetch(
        `
    *[_type == "featured" && _id == $id] {
      ...,
      restaurants[]->{
        ...,
        dishes[] ->,
        type-> {
          name
        }
          },
        }[0]
    `,
        { id }
      )
      .then((data) => {
        setRestaurants(data.restaurants)
      })
  }, [id])

  return (
    <View>
      <View className="flex-row items-center justify-between mt-4 px-4">
        <View>
          <Text className="font-bold text-lg">{title}</Text>
          <Text className="text-xs text-gray-500">{description}</Text>
        </View>
        <ArrowRightIcon color="#00CCBB"></ArrowRightIcon>
      </View>
      <ScrollView
        className="pt-2"
        contentContainerStyle={{
          paddingHorizontal: 15,
          paddingTop: 10,
        }}
        horizontal
        showsHorizontalScrollIndicator={false}>
        {restaurants?.map(restaurant => (
          <RestaurantCard
            key={restaurant._id}
            id={restaurant._id}
            imgUrl={restaurant.image}
            title={restaurant.name}
            rating={restaurant.rating}
            genre={restaurant.type?.name}
            address={restaurant.address}
            short_description={restaurant.short_description}
            dishes={restaurant.dishes}
            long={restaurant.long}
            lat={restaurant.lat}
          ></RestaurantCard>
        ))}
      </ScrollView>
    </View>
  )
}

export default FeaturedRow