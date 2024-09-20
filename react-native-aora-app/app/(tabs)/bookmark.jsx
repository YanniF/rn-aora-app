import { Text } from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import {useGlobalContext} from "../../context/GlobalProvider";
import {getAllPosts, getLikedPostByUser} from "../../lib/appwrite";
import useAppwrite from "../../lib/useAppwrite";

const BookMark = () => {
  const { user } = useGlobalContext();
  const { data: posts} = useAppwrite(() => getLikedPostByUser(user.$id))

  return (
    <SafeAreaView className="px-4 my-6 bg-primary h-full">
      <Text className="text-2xl text-white font-psemibold">Bookmark</Text>
      <Text className="text-xl text-white mt-10">Coming Soon...</Text>
    </SafeAreaView>
  );
}

export default BookMark
