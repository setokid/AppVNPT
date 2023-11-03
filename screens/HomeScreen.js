import React, { useState } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  Dimensions,
  StyleSheet,
} from "react-native";
import ImagePickerComponent from "../components/ImagePickerComponent";

const { width, height } = Dimensions.get("window");
const imageWidth = width * 0.8;

const HomeScreen = () => {
  const [selectedImages, setSelectedImages] = useState([]);

  const handleSelectImage = (uris) => {
    const newImages = [...selectedImages, ...uris];
    setSelectedImages(newImages);
  };

  const handleRemoveImage = (index) => {
    Alert.alert("Xóa ảnh", "Bạn có chắc chắn muốn xóa ảnh này?", [
      {
        text: "Hủy",
        style: "cancel",
      },
      {
        text: "Xóa",
        onPress: () => {
          const newImages = [...selectedImages];
          newImages.splice(index, 1);
          setSelectedImages(newImages);
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <ImagePickerComponent onSelectImage={handleSelectImage} isCamera={true} />
      <ScrollView horizontal={false} style={styles.imageContainer}>
        {selectedImages.map((uri, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleRemoveImage(index)}
          >
            <Image source={{ uri: uri }} style={styles.image} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 16,
  },
  imageContainer: {
    marginTop: 16,
  },
  image: {
    width: imageWidth,
    height: imageWidth * 1.33,
    margin: 8,
    borderRadius: 8,
  },
});

export default HomeScreen;
