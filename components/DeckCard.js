import React from "react";
import { View, StyleSheet } from "react-native";
import PropTypes from "prop-types";

const DeckCard = props => {
    const { title, cards } = props;

    return (
        <View style={styles.container}>
            <View style={styles.titleWrapper}>
                <Text style={styles.titleText}>{title}</Text>
            </View>
            <View style={styles.counterWrapper}>
                <Text style={styles.countText}>{cards.length} cards</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: ''
    },
    titleWrapper: {
        marginBottom: 10,
        textAlign: 'center'
    },
    counterWrapper: {
        textAlign: 'center'
    },
    titleText: {
        fontSize: 20,
        color: '#000',
    },
    countText: {
        color: '#c5c5c5',
        fontSize: 14
    }
});

DeckCard.propTypes = {
    title: PropTypes.string.isRequired,
    cards: PropTypes.array.isRequired
};

export default DeckCard;