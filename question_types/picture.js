import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Modal, Image } from "react-native"
import { Camera } from 'expo-camera';
import { Entypo } from '@expo/vector-icons';
import { createClient } from '@supabase/supabase-js'
import  { supabase } from "../supabase";


export default function Picture({ updatePhoto }) {
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [modalVisible, setModalVisible] = useState(false);
    const [camera, setCamera] = useState(null);
    const [img, setImg] = useState(null);

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


    const onPictureSaved = async (photo) => {
      updatePhoto(photo);
      setImg(photo.uri)
      setModalVisible(!modalVisible)
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
                {
                  img && <Image source={{ uri: img }} style={{ width: 200, height: 200, marginBottom: 5 }}/>
                }
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