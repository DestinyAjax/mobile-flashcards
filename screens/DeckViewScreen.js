import React from "react";
import { View, StyleSheet } from "react-native";

class DeckViewScreen extends React.Component {
    render() {
        return (
            <View style={styles.rootContainer}></View>
        );
    }
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1
    }
});

export default DeckViewScreen;