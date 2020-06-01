import React from "react";
import { View, StyleSheet, TextInput, Button, Alert } from "react-native";
import { addCardToDeck } from "../constants/Database";
// this.props.navigation.navigate("chat", {receiverId: {receiverId:order.client_id._id, orderId:order._id}})}

class AddQuestionScreen extends React.Component {

    state = {
        question: '',
        answer: '',
        title: ''
    }

    componentDidMount() {
        const { title } = this.props.route.params.title;
        this.setState(() => ({ title }));
    }

    onSubmitHandler = async () => {
        const { question, answer, title } = this.state;
        if (question !== "" && answer !== "") {
            const card = { question, answer };
            await addCardToDeck(title, card);
        }
        else {
            Alert.alert("Please all fields are required");
        }
    }

    render() {
        const { question, answer } = this.state;

        return (
            <View style={styles.rootContainer}>
                <View style={styles.formContiner}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            onChange={(text)=>{this.setState({question: text})}}
                            value={question}
                            placeholder="Question here..."
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput 
                            onChange={(text)=>{this.setState({answer: text})}} 
                            value={answer}
                            placeholder="Your answer here..."
                        />
                    </View>
                    <View style={styles.btnContainer}>
                        <Button onPress={this.onSubmitHandler} title="Submit" />
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
    formContiner: {
        padding: 20
    },
    inputContainer: {
        marginBottom: 10
    },
    btnContainer: {
        padding: 20
    }
});

export default AddQuestionScreen;