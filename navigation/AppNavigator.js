import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "../screens/HomeScreen";
import CccdScreen from "../screens/CccdScreen";
import BarcodeScreen from "../screens/BarcodeScreen";

const Drawer = createDrawerNavigator();

function AppNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="HomeScreen" component={HomeScreen} />
      <Drawer.Screen name="CccdScreen" component={CccdScreen} />
      <Drawer.Screen name="BarcodeScreen" component={BarcodeScreen} />
    </Drawer.Navigator>
  );
}

export default AppNavigator;
