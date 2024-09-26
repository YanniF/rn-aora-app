import {View, TextInput, TouchableOpacity, Image, Alert} from "react-native";
import {useState} from 'react'

import {icons} from "../constants";
import {router, usePathname} from "expo-router";

const SearchInput = ({ initialQuery }) => {
  const pathName = usePathname()
  const [query, setQuery] = useState(initialQuery ?? "")

  const getResults = () => {
    if (!query) {
      return Alert.alert('Missing search query', 'Please input something to search results across database')
    }

    if (pathName.startsWith('/search')) {
      router.setParams({ query })
    }
    else {
      router.push(`/search/${query}`)
    }
  }

  return (
    <View
      className="w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-secondary flex flex-row items-center space-x-4">
      <TextInput
        className="text-base mt-.5 text-white flex-1 font-pregular"
        placeholder="Search..."
        placeholderTextColor="#cdcde0"
        value={query}
        onChangeText={(e) => setQuery(e)}
      />
      <TouchableOpacity onPress={getResults}>
        <Image
          source={icons.search}
          className="w-5 h-5"
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  )
}

export default SearchInput
