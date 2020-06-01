import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { getDecks } from "../constants/Database";

class DeckViewScreen extends React.Component {

    state = {
        title: '',
        decks: {}
    }

    async componentDidMount() {
        const { title } = this.props.route.params;
        console.log(title)
        const decks = await getDecks();
        this.setState(() => ({ title, decks }));
    }

    render() {
        const { navigation } = this.props;
        const { title, decks } = this.state;

        return (
            <View style={styles.rootContainer}>
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <View style={styles.titleWrapper}>
                    <Text style={styles.titleText}>{decks && title && decks[title].title}</Text>
                </View>
                <View style={styles.counterWrapper}>
                    <Text style={styles.countText}>{decks && title && decks[title].questions.length} cards</Text>
                </View>
                <View style={styles.btnContainer}>
                    <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate("add-card", {title: title})}>
                        <Text style={styles.btnText}>Add Card</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnStart} onPress={() => navigation.navigate("add-quiz", {title: title})}>
                        <Text style={styles.btnStartText}>Start Quiz</Text>
                    </TouchableOpacity>
                </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1
    },
    titleWrapper: {
        marginBottom: 10,
        textAlign: 'center'
    },
    counterWrapper: {
        textAlign: 'center'
    },
    titleText: {
        fontSize: 35,
        fontWeight: 'bold',
        color: '#000',
    },
    countText: {
        color: '#c5c5c5',
        fontSize: 20
    },
    btnContainer: {
        padding: 20,
        marginTop: 20,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    btn: {
        marginBottom: 15,
        borderWidth: 2,
        borderColor: '#000',
        borderRadius: 5,
        color: '#000',
        padding: 20,
        width: 250
    },
    btnText: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold'
    },
    btnStart: {
        marginBottom: 10,
        backgroundColor: '#000',
        color: '#fff',
        borderRadius: 5,
        padding: 20,
        width: 250
    },
    btnStartText: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff'
    }
});

export default DeckViewScreen;