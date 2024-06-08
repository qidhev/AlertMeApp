import {getLocation} from "../uses/get-location.ts";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export class DataApiService {
    public static async getStartData() {
        const coordinates = await getLocation();

        try {
            const {data} = await axios.post<DataLocality>('https://alertme.lastlow.online/api/getData', coordinates);

            await AsyncStorage.setItem('locations', JSON.stringify(data.locations ?? []));
            await AsyncStorage.setItem('city', JSON.stringify({city: data.city, slug: data.slug}));

            return data;
        } catch (e) {
            console.log(e)
        }
    }
}
