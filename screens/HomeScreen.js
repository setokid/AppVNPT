import React, { useState } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  Dimensions,
  StyleSheet,
  Text,
  Button,
} from "react-native";
import ImagePickerComponent from "../components/ImagePickerComponent";

const { width } = Dimensions.get("window");
const imageWidth = width * 0.8;

const HomeScreen = () => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [uploadStatus, setUploadStatus] = useState(null);

  const handleSelectImage = (uris) => {
    const newImages = [...selectedImages, ...uris];
    setSelectedImages(newImages);
  };

  const handleRemoveImage = (index) => {
    const newImages = [...selectedImages];
    newImages.splice(index, 1);
    setSelectedImages(newImages);
  };

  const handleUploadImages = async () => {
    if (selectedImages.length === 0) {
      Alert.alert("Chưa có ảnh", "Hãy chọn ít nhất một ảnh để tải lên.");
      return;
    }

    const formData = new FormData();
    selectedImages.forEach((uri, index) => {
      formData.append(`image_${index}`, {
        uri: uri,
        type: "image/jpeg",
        name: `image_${index}.jpg`,
      });
    });

    try {
      const response = await fetch(
        "http://duyminhhome.tpddns.cn:3000/api/upload-mattruoc",
        {
          method: "POST",
          body: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Response Status:", response.status); // In ra status code của phản hồi từ API

      if (response.status === 200) {
        const responseJson = await response.json();
        console.log("API Response Data:", responseJson); // In ra dữ liệu từ API
        console.log("Tải ảnh lên thành công!");
        setUploadStatus("Tải ảnh lên thành công!");
      } else {
        console.log("Có lỗi xảy ra khi tải ảnh lên.");
        setUploadStatus("Có lỗi xảy ra khi tải ảnh lên.");
      }
    } catch (error) {
      console.log("Có lỗi xảy ra khi tải ảnh lên:", error); // In ra lỗi (nếu có)
      setUploadStatus("Có lỗi xảy ra khi tải ảnh lên.");
    }
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
      <Button title="Tải ảnh lên" onPress={handleUploadImages} />
      {uploadStatus && <Text>{uploadStatus}</Text>}
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
