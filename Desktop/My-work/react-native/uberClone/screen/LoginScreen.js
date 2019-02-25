import React, { Component } from "react";
import {
  View,
  Text,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Image,
  Animated,
  Dimensions,
  Keyboard,
  Platform
} from "react-native";
import * as Animatable from "react-native-animatable";
import { Icon } from "native-base";

const SCREEN_HEIGHT = Dimensions.get("window").height;

class LoginScreen extends Component {
  constructor() {
    super();

    this.state = {
      placHolderText: "Type Your Phone Number"
    };
  }

  componentWillMount() {
    this.animatedHeight = new Animated.Value(150);
    // IOS
    this.keyboardWillShowListener = Keyboard.addListener(
      "keyboardWillShow",
      this.keyboardWillShow
    );
    this.keyboardWillHideListener = Keyboard.addListener(
      "keyboardWillHide",
      this.keyboardWillHide
    );
    // Android
    this.keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      this.keyboardWillShow
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      this.keyboardWillHide
    );

    // Value

    this.keyboardHeight = new Animated.Value(0);
    this.forwardArrowOpacity = new Animated.Value(0);
    this.borderBottomWidth = new Animated.Value(0);
  }

  keyboardWillShow = event => {
    // Android
    if (Platform == "android") {
      duration = 100;
    } else {
      duration = event.duration;
    }

    Animated.parallel([
      Animated.timing(this.keyboardHeight, {
        duration: duration + 100,
        toValue: event.endCoordinates.height + 10
      }),
      Animated.timing(this.forwardArrowOpacity, {
        duration: duration,
        toValue: 1
      }),
      Animated.timing(this.borderBottomWidth, {
        duration: duration,
        toValue: 1
      })
    ]).start();
  };

  keyboardWillHide = event => {
    // Android
    if (Platform == "android") {
      duration = 100;
    } else {
      duration = event.duration;
    }

    Animated.parallel([
      Animated.timing(this.keyboardHeight, {
        duration: duration + 100,
        toValue: 0
      }),
      Animated.timing(this.forwardArrowOpacity, {
        duration: event.duration,
        toValue: 0
      }),
      Animated.timing(this.borderBottomWidth, {
        duration: event.duration,
        toValue: 0
      })
    ]).start();
  };

  incressHeight = () => {
    this.setState({ placHolderText: "1153335808" });

    Animated.timing(this.animatedHeight, {
      toValue: SCREEN_HEIGHT,
      duration: 600
    }).start(() => {
      this.refs.textInputMobile.focus();
    });
  };

  decreaseHeightLogin = () => {
    this.setState({ placHolderText: "Type Your Phone Number" });
    Keyboard.dismiss();
    Animated.timing(this.animatedHeight, {
      toValue: 150,
      duration: 500
    }).start();
  };

  render() {
    const headerTextOpacity = this.animatedHeight.interpolate({
      inputRange: [150, SCREEN_HEIGHT],
      outputRange: [1, 0]
    });

    const marginTop = this.animatedHeight.interpolate({
      inputRange: [150, SCREEN_HEIGHT],
      outputRange: [25, 100]
    });
    const headerBackArrowOpacity = this.animatedHeight.interpolate({
      inputRange: [150, SCREEN_HEIGHT],
      outputRange: [0, 1]
    });

    return (
      <View style={{ flex: 1 }}>
        <Animated.View
          style={{
            position: "absolute",
            height: 60,
            width: 60,
            top: 60,
            left: 25,
            zIndex: 999,
            opacity: headerBackArrowOpacity
          }}
        >
          <TouchableOpacity onPress={() => this.decreaseHeightLogin()}>
            <Icon name="md-arrow-back" style={{ color: "#5a7fdf" }} />
          </TouchableOpacity>
        </Animated.View>

        <Animated.View
          style={{
            position: "absolute",
            width: 60,
            height: 60,
            right: 10,
            bottom: this.keyboardHeight,
            borderRadius: 30,
            opacity: this.forwardArrowOpacity,
            zIndex: 999,
            alignItems: "center",
            backgroundColor: "#5a7fdf",
            justifyContent: "center"
          }}
        >
          <Icon name="md-arrow-forward" style={{ color: "#FFF" }} />
        </Animated.View>

        <ImageBackground
          source={require("../assets/uber-background.jpg")}
          style={{ flex: 1 }}
        >
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Animatable.View
              animation="zoomIn"
              interationCount={1}
              style={{
                backgroundColor: "#FFF",
                height: 100,
                width: 100,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Text
                style={{
                  fontSize: 26,
                  fontWeight: "bold"
                }}
              >
                UBER
              </Text>
            </Animatable.View>
          </View>
          {/* Bootom */}
          <Animatable.View animation="slideInUp" interationCount={1}>
            <Animated.View
              style={{
                height: this.animatedHeight,
                backgroundColor: "#fff"
              }}
            >
              <Animated.View
                style={{
                  opacity: headerTextOpacity,
                  marginTop: marginTop,
                  alignItems: "flex-start",
                  paddingHorizontal: 24
                }}
              >
                <Text
                  style={{
                    fontSize: 24
                  }}
                >
                  Get Moving With Uber
                </Text>
              </Animated.View>

              <TouchableOpacity onPress={() => this.incressHeight()}>
                <View
                  style={{
                    marginTop: 25,
                    paddingHorizontal: 25,
                    flexDirection: "row"
                  }}
                >
                  <Image
                    source={require("../assets/Flag_of_Egyp.png")}
                    style={{ height: 24, width: 24, resizeMode: "contain" }}
                  />
                  <Animated.View
                    pointerEvents={"none"}
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      borderBottomWidth: this.borderBottomWidth
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 20,
                        paddingHorizontal: 20
                      }}
                    >
                      +02
                    </Text>
                    <TextInput
                      keyboardType="numeric"
                      ref="textInputMobile"
                      style={{ flex: 1, fontSize: 20 }}
                      placeholder={this.state.placHolderText}
                      underlineColorAndroid={"transparent"}
                    />
                  </Animated.View>
                </View>
              </TouchableOpacity>
            </Animated.View>

            <View
              style={{
                height: 70,
                backgroundColor: "#fff",
                justifyContent: "center",
                alignItems: "flex-start",
                borderTopColor: "#e8e8ec",
                borderWidth: 1,
                paddingHorizontal: 25
              }}
            >
              <Text
                style={{
                  color: "#5a7fdf",
                  fontWeight: "bold"
                  //paddingTop: 5
                }}
              >
                Or Connect Using a Social Account
              </Text>
            </View>
          </Animatable.View>
        </ImageBackground>
      </View>
    );
  }
}

export default LoginScreen;
