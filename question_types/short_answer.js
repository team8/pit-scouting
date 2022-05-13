import { useState, useEffect } from "react";
import { View, Text } from "react-native"
import { TextInput } from 'react-native-paper';

export default function ShortAnswer({ question, updateData }) {
    const [response, setResponse] = useState("");
    return (
        <View style={{ marginBottom: 15, marginTop: 15 }}>
            <Text style={{ fontSize: 15 }}>{question}</Text>
            <TextInput 
                value={response}
                onChange={(e) => { setResponse(e.nativeEvent.text); updateData(question, e.nativeEvent.text) }}
                placeholder="Your Answer"
                mode="outlined"
                activeOutlineColor="green"
            />
        </View>
    )
}