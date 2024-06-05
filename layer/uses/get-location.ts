import GetLocation from "react-native-get-location";

export const getLocation = async () => {
    const data = await GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 60000,
    })

    return {
        latitude: data.latitude,
        longitude: data.longitude
    }
}