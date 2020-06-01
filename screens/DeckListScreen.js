import React from "react";
import { View, StyleSheet, TouchableOpacity, Button } from "react-native";
import { DeckCard } from "../components";
import { getDecks } from "../constants/Database";

class DeckListScreen extends React.Component {

    state = {
        desks: {}
    };

    fetchData = async () => {
        const data = await getDecks();
        this.setState(() => ({
            desks: data
        }));
    }

    componentDidMount() {
        this.fetchData();
    }

    render() {
        const { decks } = this.state;
        const keys = Object.keys(decks);

        return (
            <View style={styles.rootContainer}>
                {keys && keys.length > 0 && keys.map((id, index) => (
                    <TouchableOpacity key={index}>
                        <DeckCard title={decks[id].title} cards={decks[id].questions} />
                    </TouchableOpacity>
                ))}
                {keys && keys.length < 1 && (
                    <View>
                        <View><Text>No decks found</Text></View>
                        <View style={styles.btnWrapper}>
                            <Button onPress={} title="Add New Deck" style={styles.btn} />
                        </View>
                    </View>
                )}
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