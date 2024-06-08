import {Linking} from "react-native";
import {getLocation} from "./get-location.ts";

// to: {latitude: string, longitude: string}

export const openYamap = async (latitude: string, longitude: string) => {

    const data = await getLocation();

    const url = `https://yandex.ru/maps/?ll=${data.longitude}%2C${data.latitude}&mode=routes&rtext=${data.latitude}%2C${data.longitude}~${longitude}%2C${latitude}&rtt=pd&ruri=~&z=12`;

    const supported = await Linking.canOpenURL(url);

    if (supported) {
        await Linking.openURL(url);

        return true;
    } else {
        return false;
    }
};