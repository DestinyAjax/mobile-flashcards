import React from "react";
import { View, StyleSheet, TouchableOpacity, Button, Text, AsyncStorage } from "react-native";
import { DeckCard } from "../components";
import { getDecks } from "../constants/Database";

class DeckListScreen extends React.Component {

    state = {
        decks: {}
    };

    fetchData = async () => {
        const data = await getDecks();
        this.setState(() => ({
            decks: data
        }));
    }

    componentDidMount() {
        this.fetchData();
    }

    render() {
        const { decks } = this.state;
        const { navigation } = this.props;
        const keys = decks ? Object.keys(decks) : [];

        return (
            <View style={styles.rootContainer}>
                <View>
                    {keys && keys.length > 0 && keys.map((id, index) => (
                        <TouchableOpacity onPress={() => navigation.navigate("deck-details", {title: decks[id].title})} key={index}>
                            <DeckCard title={decks[id].title} cards={decks[id].questions} />
                        </TouchableOpacity>
                    ))}
                    {keys && keys.length < 1 && (
                        <View>
                            <View><Text>No decks found</Text></View>
                            <View style={styles.btnWrapper}>
                                <Button onPress={() => navigation.navigate("new-deck")} title="Add New Deck" style={styles.btn} />
                            </View>
                        </View>
                    )}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1
    },
    btnWrapper: {
        flex: 1,
        marginTop: 10
    },
    btn: {
        padding: 10,
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 5,
        color: '#000'
    }
});

export default DeckListScreen;