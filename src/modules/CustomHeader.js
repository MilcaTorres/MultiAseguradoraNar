import { StyleSheet, View, Text } from "react-native";
import AppColors from "../kernel/AppColors";

export default function CustomHeader({ title }) {
    return (
        <View style={styles.header}>
            <Text style={styles.headerText}>{title}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        padding: 30,
        backgroundColor: AppColors.MAIN_COLOR,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerText: {
        color: AppColors.TEXT_WHITE,
        fontSize: 30,
        fontFamily: "InriaSerif_Bold",
        fontWeight: 'bold'
    },
});
