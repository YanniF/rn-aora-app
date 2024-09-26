import {TouchableOpacity, Text} from "react-native";

const CustomButton = ({title, handlePress, isLoading, containerStyles, textStyles}) => {
  return (
    <TouchableOpacity
      className={
        `bg-secondary rounded-xl min-h-[62px] flex flex-row justify-center items-center ${containerStyles} 
        ${isLoading ? "opacity-50" : ""
      }`}
      onPress={handlePress}
      activeOpacity={0.7}
      disabled={isLoading}
    >
      <Text className={`text-primary font-psemibold text-lg ${textStyles}`}>
        {title}
      </Text>
    </TouchableOpacity>
  )
}

export default CustomButton
