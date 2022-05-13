import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import QuestionsScreen from "./questions_screen";
import { pullTeams } from "./TBA_Interactor";

const Drawer = createDrawerNavigator();

export default function App() {
  const [teams, setTeams] = useState([{name: "Paly Robotics", number: 8}])
  useEffect(async () => {
     setTeams(await pullTeams("2022camb"));
  }, [])
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Paly Robotics">
        {
          // <Drawer.Screen name={"Paly Robotics"}>
          //   {props => <Questions name={"Paly Robotics"} number={8} />}
          // </Drawer.Screen>
          teams.map((team, i) => (
            <Drawer.Screen name={`${team.name} | ${team.number}`} key={i}>
              {props => <QuestionsScreen name={team.name} number={team.number} />}
            </Drawer.Screen>
          ))
        }
      </Drawer.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
