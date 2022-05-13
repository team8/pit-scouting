import { useState } from "react";
import { View, Text } from "react-native";
import SelectMultiple from 'react-native-select-multiple'

export default function Checkboxes({ question, options, updateData }) {
    const [selectedOptions, setSelectedOptions] = useState([]);

    const updateSelected = (value) => {
        setSelectedOptions(value)
        updateData(question, value.map((v) => v.value));
    }

    return (
        <View style={{ marginBottom: 15, marginTop: 15 }}>
            <Text style={{ marginBottom: 5, fontSize: 15 }}>{question}</Text>
            <SelectMultiple
                rowStyle={{ backgroundColor: "#DDDDDD", marginBottom: 5 }}
                items={options}
                selectedItems={selectedOptions}
                onSelectionsChange={updateSelected} 
            />
        </View>
    )
}