import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, Dimensions } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";

const ScannerBarcode = ({ onDataScanned, isScanning }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scannedData, setScannedData] = useState([]);
  const [isCameraActive, setIsCameraActive] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ data }) => {
    if (isCameraActive && !scannedData.includes(data)) {
      setScannedData((prevData) => [...prevData, data]);
      onDataScanned(data);
    }
  };

  const toggleCamera = () => {
    setIsCameraActive(!isCameraActive);
  };

  return (
    <View style={styles.container}>
      {hasPermission === null ? (
        <Text>Đợi quyền truy cập máy ảnh...</Text>
      ) : hasPermission === false ? (
        <Text>Quyền truy cập máy ảnh bị từ chối.</Text>
      ) : (
        <View style={styles.scannerContainer}>
          {isCameraActive && (
            <BarCodeScanner
              onBarCodeScanned={handleBarCodeScanned}
              style={styles.scanner}
            />
          )}
          {isCameraActive && <View style={styles.scanLine}></View>}
        </View>
      )}
      <Button
        title={isCameraActive ? "Dừng quét" : "Bắt đầu quét"}
        onPress={toggleCamera}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    maxHeight: Dimensions.get("window").height * 0.6,
  },
  scannerContainer: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height * 0.5,
  },
  scanner: {
    flex: 1,
  },
  scanLine: {
    position: "absolute",
    borderBottomWidth: 2,
    width: "100%",
    borderBottomColor: "red", // Màu của đường kẻ ngang
    top: "50%", // Vị trí đường kẻ ngang
  },
});

export default ScannerBarcode;
