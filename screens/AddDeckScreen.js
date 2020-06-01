import React from "react";
import { View, StyleSheet, TextInput, Text, Alert } from "react-native";
import { saveDeckTitle } from "../constants/Database";
import { TouchableOpacity } from "react-native-gesture-handler";

class AddDeckScreen extends React.Component {

    state = {
        title: ''
    };

    onHandleSubmit = async () => {
        const { title } = this.state;
        if (title === "") {
            Alert.alert("Please enter deck title");
            return;
        }

        await saveDeckTitle(title);
        this.setState({title: ''});
        this.props.navigation.navigate("Decks");
    }

    render() {
        const { title } = this.state;

        return (
            <View style={styles.rootContainer}>
                <View style={styles.textWrapper}>
                    <Text style={styles.text}>
                        What is the title of your new deck?
                    </Text>
                </View>
                <View style={styles.inputWrapper}>
                    <TextInput 
                        onChangeText={(value) => {this.setState({title: value})}} 
                        value={title} 
                        style={styles.input} 
                        placeholder="Enter deck title..."
                    />
                </View>
                <TouchableOpacity style={styles.btnWrapper} onPress={this.onHandleSubmit}>
                    <Text style={styles.btnText}>Submit</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 30
    },
    textWrapper: {
        marginBottom: 10
    },
    text: {
        fontSize: 35,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    inputWrapper: {
        padding: 10,
        marginBottom: 10
    },
    input: {
        width: 300,
        padding: 5,
        borderColor: '#c5c5c5',
        borderWidth: 1,
        borderRadius: 5,
        fontSize: 16
    },
    btnWrapper: {
        padding: 10,
        backgroundColor: '#000'
    },
    btnText: {
        width: 200,
        padding: 5,
        color: '#fff',
        textAlign: 'center',
        fontSize: 20
    }
});

export default AddDeckScreen;