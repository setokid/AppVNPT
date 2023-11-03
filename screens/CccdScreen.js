// CccdScreen.js
import React, { useState } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import QRScannerComponent from "../components/QRScannerComponent";

const CccdScreen = () => {
  const [qrData, setQrData] = useState(null);

  const handleQRDataScanned = (data) => {
    const qrDataArray = data.split("|");
    const formattedData = {
      "Số CCCD": qrDataArray[0],
      "Số CMND": qrDataArray[1],
      Tên: qrDataArray[2],
      "Ngày Sinh": formatDateString(qrDataArray[3]),
      "Giới tính": qrDataArray[4],
      "Địa chỉ": qrDataArray[5],
      "Ngày cấp": qrDataArray[6],
    };
    setQrData(formattedData);
  };

  const formatDateString = (dateString) => {
    const day = dateString.slice(0, 2);
    const month = dateString.slice(2, 4);
    const year = dateString.slice(4);
    return `${day}/${month}/${year}`;
  };

  return (
    <View style={styles.container}>
      <QRScannerComponent
        onQRCodeScanned={(data) => setQrData(data)}
        isScanning={true}
        onDataScanned={handleQRDataScanned}
      />
      <View>
        {qrData && (
          <ScrollView style={styles.qrDataContainer}>
            {Object.keys(qrData).map((key) => (
              <View key={key} style={styles.qrDataItem}>
                <Text style={styles.qrDataItemTitle}>{key}:</Text>
                <Text style={styles.qrDataItemValue}>{qrData[key]}</Text>
              </View>
            ))}
          </ScrollView>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    flexDirection: "column",
  },
  qrDataContainer: {
    marginTop: 10,
    backgroundColor: "#BBBBBB",
    borderRadius: 20,
    padding: 10,
  },
  qrDataItem: {
    flexDirection: "row",
    marginBottom: 5,
  },
  qrDataItemTitle: {
    fontWeight: "bold",
    width: 120,
  },
  qrDataItemValue: {
    flex: 1,
  },
});

export default CccdScreen;
