import React, { useState } from "react";
import {
  Button,
  View,
  Modal,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

const ImagePickerComponent = ({ onSelectImage }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleImageAction = () => {
    setModalVisible(true);
  };

  const handleOptionSelected = async (option) => {
    if (option === "camera") {
      const permissions = await ImagePicker.requestCameraPermissionsAsync();
      const { status } = permissions;

      if (status === "granted") {
        const result = await ImagePicker.launchCameraAsync({
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });

        if (!result.cancelled && result.width > 1 && result.height > 1) {
          onSelectImage([result.uri]);
        }
      } else {
        alert("Quyền truy cập máy ảnh bị từ chối.");
      }
    } else if (option === "library") {
      const permissions =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      const { status } = permissions;

      if (status === "granted") {
        const result = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: false,
          aspect: [4, 3],
          quality: 1,
        });

        if (!result.cancelled && result.width > 1 && result.height > 1) {
          onSelectImage([result.uri]);
        }
      } else {
        alert("Quyền truy cập thư viện ảnh bị từ chối.");
      }
    }

    setModalVisible(false);
  };

  return (
    <View>
      <Button title="Chọn ảnh" onPress={handleImageAction} />
      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.option}
              onPress={() => handleOptionSelected("camera")}
            >
              <Text style={styles.optionText}>Chụp ảnh</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.option}
              onPress={() => handleOptionSelected("library")}
            >
              <Text style={styles.optionText}>Chọn ảnh từ thư viện</Text>
            </TouchableOpacity>
            <Button title="Hủy" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
  },
  option: {
    padding: 16,
  },
  optionText: {
    fontSize: 16,
  },
});

export default ImagePickerComponent;
