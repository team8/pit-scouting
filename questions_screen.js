import { useEffect, useState } from "react";
import { View, LogBox, TouchableOpacity, Text, StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import ShortAnswer from "./question_types/short_answer";
import MultipleChoice from "./question_types/multiple_choice";
import Checkboxes from "./question_types/checkboxes";
import CheckboxesWithImage from "./question_types/checkboxes_with_image";
import Picture from "./question_types/picture";
import question_list from "./question_list";
import axios from "axios";
import  { supabase } from "./supabase";


export default function QuestionsScreen({ name, number }) {
    const [robotData, setRobotData] = useState({
        team_number: number
    })
    const [photo, setPhoto] = useState(null);

    useEffect(() => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
        LogBox.ignoreLogs(['componentWillReceiveProps']);
    }, [])

    const uploadData = async () => {
        console.log(`Data: ${JSON.stringify(robotData)}`);
        const response1 = await axios.post(`http://137.184.14.29/pit/2022camb/${number}`, robotData);

        const ext = photo.uri.substring(photo.uri.lastIndexOf(".") + 1);  
        var formData = new FormData();
        var fName = `${name.replace(/ /g, "_")}-${number}`;
        formData.append("files", {
            uri: photo.uri,
            name: fName + ".jpg",
            type: `image/${ext}`
        })

        const { data, error } = await supabase.storage
            .from("robot-photos")
            .upload(fName + ".jpg", formData);
            console.log(error);
            
    }

    const updateData = (question, answer) => {
        var localData = robotData;
        localData[question.toString()] = answer;
        setRobotData(localData);
    }

    const updatePhoto = (p) => {
        setPhoto(p);
    }

    return (
        <KeyboardAwareScrollView style={{ paddingLeft: 10, paddingRight: 10, flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
            {question_list && 
                question_list.map((question, i) => (
                    <View key={i}>
                        {question["type"] == "short_answer" &&
                            <ShortAnswer question={question["question"]} updateData={updateData} />
                        }
                        {question["type"] == "multiple_choice" && 
                            <MultipleChoice question={question["question"]} options={question["options"]} updateData={updateData} />
                        }
                        {question["type"] == "checkboxes" && 
                            <Checkboxes question={question["question"]} options={question["options"].map((option, i) => {return option.toString()})} updateData={updateData} />
                        }
                        {question["type"] == "checkboxes_with_image" && 
                            <CheckboxesWithImage question={question["question"]} options={question["options"].map((option, i) => {return option.toString()})} image={question["image"]} updateData={updateData} />
                        }
                        {question["type"] == "picture" && 
                            <Picture updatePhoto={updatePhoto} />
                        }
                    </View>
                ))    
            }
            <View style={{ justifyContent: "center", alignItems: "center", marginBottom: 10 }}>
                <TouchableOpacity style={styles.button} onPress={() => uploadData()}>
                    <Text style={{ color: "white", elevation: 2 }}>Submit</Text>
                </TouchableOpacity> 
            </View>           
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
    button: {
        shadowColor: 'rgba(0,100,0, 10)',
        shadowOffset: { height: 1, width: 1 },
        shadowOpacity: 1,
        shadowRadius: 1,
        elevation: 2,
        height: 50,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: "green"
    },
})