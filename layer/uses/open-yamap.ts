import {Linking} from "react-native";
import {getLocation} from "./get-location.ts";

export const openYamap = async (latitude: number, longitude: number) => {

    const data = await getLocation();

    const url = `https://yandex.ru/maps/?ll=${data.longitude}%2C${data.latitude}&mode=routes&rtext=${data.latitude}%2C${data.longitude}~${latitude}%2C${longitude}&rtt=pd&ruri=~&z=12`;

    await Linking.openURL(url);
};