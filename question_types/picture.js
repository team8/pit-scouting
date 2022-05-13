import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Modal } from "react-native"
import { Camera } from 'expo-camera';
import { Entypo } from '@expo/vector-icons';
import base64 from 'react-native-base64'



export default function Picture({ updateData }) {
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [modalVisible, setModalVisible] = useState(false);
    const [camera, setCamera] = useState(null);

    const cam = useRef(null);

    const takePicture = async () => {
      const options = {
        quality: 0.001,
        base64: true,
        exif: true,
        onPictureSaved: onPictureSaved
      }
      const result1 = await camera.takePictureAsync(options);
    }


    const onPictureSaved = photo => {
      // console.log(photo.base64);
      // let compressedImg = photo.base64.split('').reduce((o, c) => {
      //   if (o[o.length - 2] === c && o[o.length - 1] < 35) o[o.length - 1]++;
      //   else o.push(c, 0);
      //   return o;
      // },[]).map(_ => typeof _ === 'number' ? _.toString(36) : _).join('');
      console.log(base64.encode(photo.base64).length);
      updateData("picture", base64.encode(photo.base64));
      // console.log(photo.base64.length);
    }


    useEffect(() => {
        (async () => {
          const { status } = await Camera.requestCameraPermissionsAsync();
          setHasPermission(status === 'granted');
        })();
      }, []);

    if (hasPermission === null) {
        return <Text>No Permission :|</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }
  

    return (
        <View style={styles.container}>
            <Text style={{ marginBottom: 5, fontSize: 15 }}>Photo</Text>
            <View style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <TouchableOpacity style={{ borderWidth: 1, borderColor: "grey", backgroundColor: "#DDDDDD", padding: 5 }} onPress={() => setModalVisible(true)}>
                    <Text style={{ fontSize: 15 }}>Take Photo</Text>
                </TouchableOpacity>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                setModalVisible(!modalVisible);
                }}
                style={{ flex: 1, height: "100%" }}
            >
                <View style={{ flex: 0.9 }}>
                 <Camera style={styles.camera} type={type} ref={ref => setCamera(ref)}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.button}
                        // onPress={() => {
                        // setType(
                        //     type === Camera.Constants.Type.back
                        //     ? Camera.Constants.Type.front
                        //     : Camera.Constants.Type.back
                        // );
                        // }}
                        onPress={() => setModalVisible(!modalVisible)}
                        >
                        <Text style={styles.text}> Close </Text>
                    </TouchableOpacity>
                </View>
            </Camera>
            </View>
            <View style={{ flex: 0.1, width: "100%", backgroundColor: "white", alignItems: "center", justifyContent: "center" }}>
              <TouchableOpacity style={{ borderWidth: 1, borderColor: "black", borderRadius: "50%", padding: 5 }} onPress={() => takePicture()}>
                <Entypo name="camera" size={24} color="black" />
              </TouchableOpacity>
            </View>
            </Modal>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    camera: {
      flex: 1,
      aspectRatio: 1,
      width: "80%"
    },
    buttonContainer: {
      flex: 1,
      backgroundColor: 'transparent',
      flexDirection: 'row',
      margin: 20,
    },
    button: {
      flex: 0.1,
      alignSelf: 'flex-end',
      alignItems: 'center',
    },
    text: {
      fontSize: 18,
      color: 'white',
    },
  });