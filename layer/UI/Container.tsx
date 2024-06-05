import {View} from "react-native";

export const Container = (props: any) => {
    return (
        <View style={{paddingHorizontal: 30, paddingBottom: 30, paddingTop: 10, gap: props.gap ?? 20}}>
            {props.children}
        </View>
    )
}