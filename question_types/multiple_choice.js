import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';
import { TextInput } from 'react-native-paper';

export default function MultipleChoice({ question, options, updateData }) {
    const [selected, setSelected] = useState("");
    const [response, setResponse] = useState("")

    return (
        <View style={{ marginBottom: 15, marginTop: 15 }}>
            <Text style={{ marginBottom: 5, fontSize: 15 }}>{question}</Text>
            {
                options.map((option, i) => (
                    selected === option ? 
                    (
                        <TouchableOpacity key={i} style={{ backgroundColor: "#DDDDDD", borderColor: "green", borderWidth: 3, alignItems: "center", padding: 10, marginBottom: 5 }}>
                            <Text>{option}</Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity key={i} style={{ backgroundColor: "#DDDDDD", borderColor: "grey", borderWidth: 1, alignItems: "center", padding: 10, marginBottom: 5 }} onPress={() => { setSelected(option); updateData(question, option == "Other..." ? response : option); }}>
                            <Text>{option}</Text>
                        </TouchableOpacity>
                    )
                ))
            }
            {
                selected == "Other..." &&
                <TextInput 
                    value={response}
                    onChange={(e) => { setResponse(e.nativeEvent.text); updateData(question, e.nativeEvent.text) }}
                    placeholder="Other..."
                    mode="outlined"
                    activeOutlineColor="green"
                />
            }
        </View>
    )
}