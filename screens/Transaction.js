import React, { Component } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ImageBackground, Image } from "react-native";
import * as Permissions from "expo-permissions";
import { BarCodeScanner } from "expo-barcode-scanner";

const bgImg = require("../assets/background2.png");
const appIcon = require("../assets/appIcon.png");
const appName = require("../assets/appName.png");

export default class TransactionScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      bookId: "",
      studentId: "",
      domState: "normal",
      hasCameraPermissions: null,
      scanned: false,
    };
  }

  getCameraPermissions = async domState => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermissions: status === "granted",
      domState: domState,
      scanned: false
    });
  };

  handleBarCodeScanned = async ({ type, data }) => {
    const{domState} = this.state;
    if (domState == "bookId") {
      this.setState({
        scannedData: data,
        domState: "normal",
        scanned: true
      });
    }
    else if (domState == "studentId"){
      this.setState({
        scannedData: data,
        domState: "normal",
        scanned: true
      });
    }
  }

  render() {
    const{bookId, studentId, domState, scanned} = this.state;
    if (domState !== "normal"){
      return(
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      );
    };

    return (
      <View style={styles.container}>
        <ImageBackground>
          <View style={styles.upperContainer}>
            <Image source = {appIcon} style={styles.appIcon}/>
            <Image source = {appName} style={styles.appName}/>
          </View>
          <View style={styles.lowercontainer}>
            <View style={styles.textinputContainer}>
              <TextInput style={styles.textinput}
              placeholder = {"Id del libro"}
              placeholderTextColor = {"black"}
              value = {bookId}
              />
              <TouchableOpacity style={styles.scanButton}
              onPress = { () =>
              this.getCameraPermissions("bookId")}>
              <Text style={styles.scanbuttonText}>Scan</Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.textinputContainer,{maginTop: 25}]}>
            <TextInput style={styles.textinput}
              placeholder = {"Id Alumno"}
              placeholderTextColor = {"black"}
              value = {studentId}
              />
              <TouchableOpacity style={styles.scanButton}
              onPress = { () =>
              this.getCameraPermissions("studentId")}>
              <Text style={styles.scanbuttonText}>Scan</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#5653D4"
  },
  text: {
    color: "#ffff",
    fontSize: 30
  },
  bgImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  upperContainer: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center"
  },
  appIcon: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    marginTop: 80
  },
    
  appName: {
    width: 80,
    height: 80,
    resizeMode: "contain"
  },
  
  lowerContainer: {
    flex: 0.5,
    alignItems: "center"
  },

  textinputContainer: {
    borderWidth: 2,
    borderRadius: 10,
    flexDirection: "row",
    backgroundColor: "#9DFD24",
    borderColor: "#FFFFFF"
  },

  textinput: {
    width: "57%",
    height: 50,
    padding: 10,
    borderColor: "#FFFFFF",
    borderRadius: 10,
    borderWidth: 3,
    fontSize: 18,
    backgroundColor: "#5653D4",
    fontFamily: "Rajdhani_600SemiBold",
    color: "#FFFFFF"
  },

  scanbutton: {
    width: 100,
    height: 50,
    backgroundColor: "#9DFD24",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  scanbuttonText: {
    fontSize: 24,
    color: "#0A0101",
    fontFamily: "Rajdhani_600SemiBold"
  }
});
