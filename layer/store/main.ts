import {create} from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {findClosestCoordinate} from "../uses/findClosesCoordiante.ts";
import {getLocation} from "../uses/get-location.ts";

interface Store {
    notification: Notification|null;
    setNotification: (notify: Notification) => void;
    localities: Locality[]|null;
    init: () => void;
    loadLocations: () => void;
    currentLocation: Locality|null;
    getCurrentLocation: () => void;
}

export const useMainStore = create<Store>((set, get) => ({
    notification: null,
    setNotification: (notify: Notification) => set(state => (
        {
            notification: notify
        }
    )),
    localities: [],
    currentLocation: null,
    init: async () => {
        const notify = await AsyncStorage.getItem('notification');


        if (notify !== null) {
            const {notification} = JSON.parse(notify) as DataNotification

            if (notification.id !== get().notification?.id) {
                set(state => (
                    {
                        notification
                    }
                ))
            }
        }
    },
    loadLocations: async () => {
        const inter = setInterval(async () => {
            const localities = await AsyncStorage.getItem('locations');

            if (localities !== null) {
                const locations = JSON.parse(localities) as Locality[];

                set(state => (
                    {
                        localities: locations
                    }
                ))

                clearInterval(inter);
            }
        }, 1000);
    },
    getCurrentLocation: async () => {
        const notification = get().notification;
        const localities = get().localities;

        if (!notification || !localities) return;

        if (notification.type_location_id === null || !localities.length) {
            set(state => ({
                currentLocation: null
            }))

            return;
        }

        const localitiesWithAddress = localities.filter((locality: any) => {
            return !!locality.address && locality.type_id === notification.type_location_id;
        });

        const coords = await getLocation();

        set(state => ({
            currentLocation: localitiesWithAddress.length
                ? findClosestCoordinate(localitiesWithAddress, coords)
                : (localities.find(locality => locality.type_id === notification.type_location_id)
                    ?? null)
        }))
    }
}));