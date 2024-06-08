import {Linking} from "react-native";
import {getLocation} from "./get-location.ts";

export const openTel = async (phone: string|number) => {
    const url = `tel:${phone}`;

    const supported = await Linking.canOpenURL(url);

    if (supported) {
        await Linking.openURL(url);

        return true;
    } else {
        return false;
    }
};