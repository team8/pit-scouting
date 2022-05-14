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



const ascToken = ""

export default function QuestionsScreen({ name, number }) {
    const [data, setData] = useState({
        team_number: number
    })
    useEffect(() => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
        LogBox.ignoreLogs(['componentWillReceiveProps']);

    }, [])

    function guardarArchivo(e) {
        var file = e //the file
     
        //   var rawLog = reader.result.split(',')[1]; //extract only thee file data part
          var dataSend = { dataReq: { data: file, name: `${name} | ${number}`, filetype: '.png' }, fname: "uploadFilesToGoogleDrive" }; //preapre info to send to API
          fetch('https://script.google.com/macros/s/AKfycbxHdjFJX3-g6wotLaKQ0WY7bYcHUadx2RfgZPOzedeo4kxe6NbCM8tMKwvUrU4-9tsmcA/exec', //your AppsScript URL
            { method: "POST", body: JSON.stringify(dataSend) }) //send to Api
            .then(res => res.text()).then((a) => {
              console.log(a) //See response
            }).catch(e => console.log(e)) // Or Error in console
        
      }

    const uploadData = async () => {
        console.log(JSON.stringify(data));
        // const response1 = await axios.post("http://137.184.14.29/pit", data["picture"].slice(0, data["picture"].length / 2));
        // const response2 = await axios.post("http://137.184.14.29/pit", data["picture"].slice(data["picture"].length / 2));
        // const response2 = await axios.post("https://www.googleapis.com/upload/drive/v3/files?uploadType=media", {
        //     "body": JSON.stringify({ "name": data["team_number"] + ".jpg", parents: ["1ceMflFYCodZGzioPozOnh7_1L0w8X7Ni"] })
        // }, {
        //     headers: { 'Content-Type': 'application/json', 'Authorization': ascToken}
        // })
        // guardarArchivo(data["picture"])
        const response3 = await axios.post("http://137.184.14.29/pit", data);
    }

    const updateData = (question, answer) => {
        var localData = data;
        localData[question.toString()] = answer;
        setData(localData);
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
                            <Picture updateData={updateData} fName={`${name}-${number}`}/>
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