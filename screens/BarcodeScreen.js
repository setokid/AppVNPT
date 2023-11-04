import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Button,
  Clipboard,
} from "react-native";
import ScannerBarcode from "../components/ScannerBarcode";

const BarcodeScreen = () => {
  const [scannedData, setScannedData] = useState([]);
  const scannedDataRef = useRef([]);

  const handleScannedData = (data) => {
    if (!scannedDataRef.current.includes(data)) {
      scannedDataRef.current = [...scannedDataRef.current, data];
      setScannedData(scannedDataRef.current);
    }
  };

  const handleCopyAllData = () => {
    const allData = scannedDataRef.current.join("\n");
    Clipboard.setString(allData);
  };

  const handleClearData = (data) => {
    scannedDataRef.current = scannedDataRef.current.filter(
      (item) => item !== data
    );
    setScannedData(scannedDataRef.current);
  };

  useEffect(() => {
    setScannedData(scannedDataRef.current);
  }, [scannedData]);

  return (
    <View style={styles.container}>
      <ScannerBarcode onDataScanned={handleScannedData} />
      {scannedData.length > 0 && (
        <View style={styles.scannedDataContainer}>
          <Text style={styles.scannedDataHeader}>Dữ liệu đã quét:</Text>
          <ScrollView style={styles.scannedDataList}>
            {scannedData.map((data, index) => (
              <TouchableOpacity
                key={index}
                onLongPress={() => handleClearData(data)}
                onPress={() => handleCopyAllData()}
              >
                <Text style={styles.scannedDataItem}>{data}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
      <Button title="Xóa tất cả" onPress={() => setScannedData([])} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scannedDataContainer: {
    marginTop: 10,
    padding: 10,
    margin: 10,
    borderRadius: 20,
    backgroundColor: "#BBBBBB",
  },
  scannedDataHeader: {
    fontWeight: "bold",
  },
  scannedDataList: {
    marginTop: 10,
  },
  scannedDataItem: {
    marginBottom: 10,
    fontSize: 16,
  },
});

export default BarcodeScreen;
