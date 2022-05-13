import { useState, useEffect } from "react";
import { View, Text, Image } from "react-native";
import SelectMultiple from 'react-native-select-multiple'
import Images from "../img/index";



export default function CheckboxesWithImage({ question, options, image, updateData }) {
    const [selectedOptions, setSelectedOptions] = useState([]);

    const updateSelected = (value) => {
        setSelectedOptions(value)
        updateData(question, value.map((v) => v.value));
    }

    return (
        <View style={{ marginBottom: 15, marginTop: 15 }}>
            <Text style={{ marginBottom: 5, fontSize: 15 }}>{question}</Text>
            <Image source={Images[image]} style={{ width: "100%", height: undefined, aspectRatio: 1, marginBottom: 5 }}/>
            <SelectMultiple
                rowStyle={{ backgroundColor: "#DDDDDD", marginBottom: 5 }}
                items={options}
                selectedItems={selectedOptions}
                onSelectionsChange={updateSelected} 
            />
        </View>
    )
}