import {FlatList, RefreshControl, Text, View} from 'react-native';
import {useEffect, useState} from 'react';
import {SafeAreaView} from "react-native-safe-area-context";
import {useGlobalContext} from "../../context/GlobalProvider";
import {getLikedPostByUser} from "../../lib/appwrite";
import useAppwrite from "../../lib/useAppwrite";
import {EmptyState, SearchInput, VideoCard} from "../../components";
import {useLocalSearchParams} from "expo-router";

const BookMark = () => {
  const { user } = useGlobalContext();
  const { query } = useLocalSearchParams()
  const { data: posts, refetch} = useAppwrite(() => getLikedPostByUser(user.$id))

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    refetch()
  }, [query]);

  const onRefresh = async () => {
    setRefreshing(true)

    await refetch()

    setRefreshing(false)
  }

  return (
    <SafeAreaView className="px-4 my-6 bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard
            id={item.$id}
            title={item.title}
            thumbnail={item.thumbnail}
            video={item.video}
            creator={item.creator.username}
            avatar={item.creator?.avatar}
            likedBy={item.likedBy}
          />
        )}
        ListHeaderComponent={() => (
          <View className="flex my-6 px-4">
            <Text className="font-pmedium text-gray-100 text-sm">
              Saved Videos
            </Text>

            <View className="mt-6 mb-8">
              <SearchInput placeholder="Search your saved videos" refetch={refetch} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No saved videos found"
          />
        )}
        refreshControl={(<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>)}
      />
    </SafeAreaView>
  );
}

export default BookMark
