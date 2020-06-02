import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, Alert } from "react-native";
import { getDecks } from "../constants/Database";
import { setLocalNotification, clearLocalNotification } from "../constants/utils";

export const ActiveCard = ({type,card,toggle}) => {
    if (type) {
        return (
            <View>
                <View>
                    <Text style={styles.title}>
                        {card && card.question}
                    </Text>
                </View>
                <TouchableOpacity style={{marginTop: 30}} onPress={toggle}>
                    <Text style={styles.flipText}>Show Answer</Text>
                </TouchableOpacity>
            </View> 
        );
    }
    else {
        return (
            <View>
                <View>
                    <Text style={styles.title}>
                        {card.answer}
                    </Text>
                </View>
                <TouchableOpacity style={{marginTop: 30}} onPress={toggle}>
                    <Text style={styles.flipText}>Show Question</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

class QuizScreen extends React.Component {

    state = {
        decks: {},
        title: '',
        answerCounter: 0,
        questionsCount: 0,
        questions: [],
        correct: 0,
        inCorrect: 0,
        activeCard: {},
        ask: true
    }

    syncData = async () => {
        const { title } = this.props.route.params;
        const decks = await getDecks();
        const questionsCount = decks[title].questions.length;
        const questions = decks[title].questions.reverse();
        const activeCard = questions[1];
        this.setState(() => ({ 
            title, 
            decks, 
            questionsCount, 
            questions,
            activeCard,
            answerCounter: 0,
            correct: 0,
            inCorrect: 0
        }));
    }

    componentDidMount() {
        this.syncData();
        this.props.navigation.addListener('focus', () => {
            this.syncData();
        });
    }

    flipCard = () => {
        this.setState((prev) => ({
            ask: !prev.ask
        }));
    }

    makeScore = type => {
        const { decks, title, answerCounter, questionsCount } = this.state;
        this.setState((prev) => ({ask: prev.ask === false ? true : true}));
        if (questionsCount === (answerCounter)) {
            const { correct, inCorrect, title } = this.state;
            this.props.navigation.navigate("view-score", {
                title,
                correct,
                inCorrect
            });
            Alert.alert("You have completed the quiz");
            return;
        }

        const questions = decks[title].questions;
        const activeCard = questions[answerCounter];
        this.setState((prev) => ({
            answerCounter: prev.answerCounter + 1,
            activeCard
        }));

        if (type === 'correct') {
            this.setState((prev) => ({correct: prev.correct + 1}));
        }
        if (type === 'incorrect') {
            this.setState((prev) => ({inCorrect: prev.inCorrect + 1}));
        }

        // set notification reminder for tomorrow
        clearLocalNotification().then(setLocalNotification());
    }

    render() {
        const { answerCounter, questionsCount, activeCard, ask, questions } = this.state;

        return (
            <View style={styles.rootContainer}>
                {questions && questions.length > 0 && (
                    <View>
                        <View style={styles.quizWrapper}>
                            <Text style={styles.counterText}>{answerCounter}/{questionsCount}</Text>
                        </View>
                        <View style={{marginTop: 40}}>
                            <ActiveCard card={activeCard} type={ask} toggle={this.flipCard}/>
                        </View>
                        <View style={styles.btnContainer}>
                            <TouchableOpacity style={styles.btn} onPress={() => {this.makeScore('correct')}}>
                                <Text style={styles.btnText}>Correct</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.btnStart} onPress={() => {this.makeScore('incorrect')}}>
                                <Text style={styles.btnStartText}>Incorrect</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
                {questions && questions.length < 1 && (
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20}}>
                        <Text style={{fontSize: 25,fontWeight: 'bold',textAlign: 'center'}}>
                            Sorry you cannot take a quiz because there are no cards in this deck
                        </Text>
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
    quizWrapper: {
        flex: 1,
        padding: 30
    },
    counterText: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    flipText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'red',
        textAlign: 'center'
    },
    btnContainer: {
        padding: 20,
        marginTop: 70,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    btn: {
        marginBottom: 15,
        backgroundColor: 'green',
        borderRadius: 5,
        padding: 20,
        width: 250
    },
    btnText: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
    btnStart: {
        marginBottom: 10,
        backgroundColor: 'red',
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

export default QuizScreen;