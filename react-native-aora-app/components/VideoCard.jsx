import {Text, View, Image, TouchableOpacity, Alert} from 'react-native'
import {useState} from 'react'
import {ResizeMode, Video} from "expo-av";

import { icons } from "../constants";
import {useGlobalContext} from "../context/GlobalProvider";
import {likePost} from "../lib/appwrite";

const VideoCard = ({ id, title, creator, avatar, thumbnail, video, likedBy = [] }) => {
  const { user } = useGlobalContext();

  const [play, setPlay] = useState(false);
  const [showBookmarkButton, setShowBookmarkButton] = useState(!likedBy?.includes(user.id));

  const handleFavorite = async () => {
    setShowBookmarkButton(false)

    try {
      await likePost(id, user.$id);
    }
    catch(error) {
      Alert.alert('Error', error.message);
      setShowBookmarkButton(true)
    }
  }

  return (
    <View className="flex flex-col items-center px-4 mb-14">
      <View className="flex flex-row gap-3 items-start">
        <View className="flex justify-center items-center flex-row flex-1">
          <View className="w-[46px] h-[46px] rounded-lg border border-secondary flex justify-center items-center p-0.5">
            <Image
              source={{ uri: avatar }}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />
          </View>

          <View className="flex justify-center flex-1 ml-3 gap-y-1">
            <Text
              className="font-psemibold text-sm text-white"
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text
              className="text-xs text-gray-100 font-pregular"
              numberOfLines={1}
            >
              {creator}
            </Text>
          </View>
        </View>

        {showBookmarkButton && (
          <View className="pt-2">
            <TouchableOpacity
              onPress={handleFavorite}
              activeOpacity={0.7}
            >
              <Image source={icons.bookmark} className="w-5 h-5" resizeMode="contain" />
            </TouchableOpacity>
          </View>
        )}
      </View>

      {play ? (
        <Video
          source={{ uri: video }}
          className="w-full h-60 rounded-xl mt-3"
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status) => {
            if (status.didJustFinish) {
              setPlay(false);
            }
          }}
        />
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          className="w-full h-60 rounded-xl mt-3 relative justify-center items-center"
          onPress={() => setPlay(true)}
        >
          <Image
            source={{ uri: thumbnail }}
            className="w-full h-full rounded-xl mt-3"
            resizeMode="cover"
          />
          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="cover"
          />
        </TouchableOpacity>
      )}

    </View>
  )
}

export default VideoCard
