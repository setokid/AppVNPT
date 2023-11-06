import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";

const QRScannerComponent = ({ onQRCodeScanned, isScanning, onDataScanned }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [cameraEnabled, setCameraEnabled] = useState(true);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ data }) => {
    if (!scanned) {
      // setScanned(true);
      onQRCodeScanned(data);
      onDataScanned(data);
      setCameraEnabled(false); // Tắt máy ảnh sau khi quét thành công
    }
  };

  const handleScanAgain = () => {
    // setScanned(false);
    setCameraEnabled(true); // Mở lại máy ảnh để quét lại
  };

  const toggleCamera = () => {
    setCameraEnabled(!cameraEnabled); // Bật hoặc tắt máy ảnh
  };

  if (hasPermission === null) {
    return <Text>Đợi quyền truy cập máy ảnh...</Text>;
  }
  if (hasPermission === false) {
    return <Text>Quyền truy cập máy ảnh bị từ chối.</Text>;
  }

  return (
    <View style={styles.container}>
      <Button
        title={cameraEnabled ? "Tắt Camera" : "Bật Camera"}
        onPress={toggleCamera}
      />
      {cameraEnabled && !scanned && (
        <View style={styles.scanner}>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
        </View>
      )}
      {scanned && <Button title="Chạm để quét lại" onPress={handleScanAgain} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    maxHeight: "50%",
  },
  scanner: {
    flex: 1,
    width: "100%",
  },
});

export default QRScannerComponent;
