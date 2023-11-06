import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "../screens/HomeScreen";
import CccdScreen from "../screens/CccdScreen";
import BarcodeScreen from "../screens/BarcodeScreen";

const Drawer = createDrawerNavigator();

function AppNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Chụp Ảnh" component={HomeScreen} />
      <Drawer.Screen name="Quét CCCD" component={CccdScreen} />
      <Drawer.Screen name="Quét mã vạch" component={BarcodeScreen} />
    </Drawer.Navigator>
  );
}

export default AppNavigator;
