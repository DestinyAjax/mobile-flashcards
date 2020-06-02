import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';

import useCachedResources from './hooks/useCachedResources';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import LinkingConfiguration from './navigation/LinkingConfiguration';

const Stack = createStackNavigator();

import DeckViewScreen from "./screens/DeckViewScreen";
import AddQuestionScreen from "./screens/AddQuestionScreen";
import QuizView from "./screens/QuizScreen";
import ScoreViewScreen from "./screens/ScoreViewScreen";

import { setLocalNotification } from "./constants/utils";

class App extends React.Component {

  componentDidMount() {
    setLocalNotification();
  }

  render() {
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="dark-content" />}
        <NavigationContainer linking={LinkingConfiguration}>
          <Stack.Navigator>
            <Stack.Screen name="Decks" component={BottomTabNavigator} />
            <Stack.Screen options={{ headerTitle: 'Deck Details' }} name="deck-details" component={DeckViewScreen} />
            <Stack.Screen options={{ headerTitle: 'Add Card' }} name="add-card" component={AddQuestionScreen} />
            <Stack.Screen options={{ headerTitle: 'Quiz View' }} name="add-quiz" component={QuizView} />
            <Stack.Screen options={{ headerTitle: 'Quiz Score' }} name="view-score" component={ScoreViewScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App;
