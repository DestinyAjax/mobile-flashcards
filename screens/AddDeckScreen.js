import React from "react";
import { View, StyleSheet, TextInput, Button, Text } from "react-native";
import { saveDeckTitle } from "../constants/Database";

class AddDeckScreen extends React.Component {

    state = {
        title: ''
    };

    onChangeText = (event) => {
        const title = event.target.value;
        this.setState(() => ({
            title
        }));
    };

    onHandleSubmit = async () => {
        const { title } = this.state;
        await saveDeckTitle(title);
    }

    render() {
        const { title } = this.state;

        return (
            <View style={styles.rootContainer}>
                <View style={styles.textWrapper}>
                    <Text>What is the title of your new deck?</Text>
                </View>
                <View style={styles.inputWrapper}>
                    <TextInput 
                        onChange={this.onChangeText} 
                        value={title} 
                        style={styles.input} 
                    />
                </View>
                <View style={styles.btnWrapper}>
                    <Button title="Submit" onPress={} style={styles.btn} />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1
    },
    textWrapper: {
        marginBottom: 10
    },
    text: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    inputWrapper: {

    },
    input: {},
    btnWrapper: {},
    btn: {}
});

export default AddDeckScreen;