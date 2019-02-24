import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Platform,
  StatusBar,
  ScrollView,
  Image,
  Dimensions,
  Animated
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Category from "./components/Explore/Category";
import Content from "./components/Explore/Content";
import Tag from "./components/Explore/Tag";

const { width, height } = Dimensions.get("window");

class Explore extends Component {
  componentDidMount() {
    this.scrollY = new Animated.Value(0);

    this.startHeaderHeight = 80;
    this.endHeaderHeight = 50;
    if (Platform.OS == "android") {
      this.startHeaderHeight = 100 + StatusBar.currentHeight;
      this.endHeaderHeight = 70 + StatusBar.currentHeight;
    }

    this.animatedHeaderHeight = this.scrollY.interpolate({
      inputRange: [0, 50],
      outputRange: [this.startHeaderHeight, this.endHeaderHeight],
      extrapolate: "clamp"
    });

    this.animatedOpacity = this.animatedHeaderHeight.interpolate({
      inputRange: [this.endHeaderHeight, this.startHeaderHeight],
      outputRange: [0, 1],
      extrapolate: "clamp"
    });

    this.animatedTop = this.animatedHeaderHeight.interpolate({
      inputRange: [this.endHeaderHeight, this.startHeaderHeight],
      outputRange: [-30, 10],
      extrapolate: "clamp"
    });
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <Animated.View
            style={{
              height: this.animatedHeaderHeight,
              backgroundColor: "white",
              borderBottomWidth: 1,
              borderBottomColor: "#ddd"
            }}
          >
            <View
              style={{
                flexDirection: "row",
                padding: 10,
                backgroundColor: "white",
                marginHorizontal: 20,
                shadowOffset: { width: 0, height: 0 },
                shadowColor: "black",
                shadowOpacity: 0.2, //IOS
                elevation: 2, // android
                marginTop: Platform.OS == "android" ? 30 : null
              }}
            >
              <Icon name="ios-search" size={20} style={{ marginRight: 10 }} />
              <TextInput
                underlineColorAndroid="transparent"
                placeholder="try Javascript!"
                style={{ flex: 1, fontWeight: "700", backgroundColor: "white" }}
              />
            </View>
            <Animated.View
              style={{
                flexDirection: "row",
                marginHorizontal: 20,
                marginBottom: 10,
                position: "relative",
                top: this.animatedTop,
                opacity: this.animatedOpacity
              }}
            >
              <Tag tagName="Javascript" />
              <Tag tagName="Programming" />
            </Animated.View>
          </Animated.View>
          <ScrollView
            scrollEventThrottle={16}
            onScroll={Animated.event([
              { nativeEvent: { contentOffset: { y: this.scrollY } } }
            ])}
          >
            <View style={{ flex: 1, backgroundColor: "white", paddingTop: 20 }}>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: "700",
                  paddingHorizontal: 20
                }}
              >
                better technical knowledge For Arabs
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "400",
                  color: "#b4a996",
                  paddingTop: 5,
                  paddingHorizontal: 20
                }}
              >
                Most Viewed
              </Text>
              <View
                style={{
                  height: 130,
                  marginTop: 20
                }}
              >
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                >
                  <Category
                    name="learn Javascript ES6 by Arabic"
                    imageUri={require("../assets/js2.png")}
                  />
                  <Category
                    name="React new Version v16"
                    imageUri={require("../assets/react.png")}
                  />
                  <Category
                    name="learn Node.js by Arabic"
                    imageUri={require("../assets/js.png")}
                  />
                  <Category
                    name="Css new features"
                    imageUri={require("../assets/CSS.jpg")}
                  />
                </ScrollView>
              </View>
              {/* what is DEVKANA */}
              <View style={{ marginTop: 40, paddingHorizontal: 20 }}>
                <Text style={{ fontSize: 24, fontWeight: "700" }}>
                  What is Devkhana
                </Text>
                <Text style={{ fontWeight: "700", marginTop: 10 }}>
                  we try improve Arabic Development content
                </Text>
                <View style={{ width: width - 40, height: 200, marginTop: 20 }}>
                  <Image
                    style={{
                      flex: 1,
                      height: null,
                      width: null,
                      resizeMode: "cover",
                      borderRadius: 5,
                      borderWidth: 1,
                      borderColor: "#ddd"
                    }}
                    source={require("../assets/devkhana.jpg")}
                  />
                </View>
              </View>
            </View>
            <View style={{ marginTop: 40 }}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "700",
                  paddingHorizontal: 20
                }}
              >
                Explore Development Content
              </Text>
              <View
                style={{
                  paddingHorizontal: 20,
                  marginTop: 20,
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "space-between"
                }}
              >
                <Content
                  width={width}
                  title={"React new Version v16"}
                  imageUri={require("../assets/react.png")}
                  auther={"iAli"}
                  rating={4}
                />
                <Content
                  width={width}
                  title={"learn PHP"}
                  imageUri={require("../assets/php.jpg")}
                  auther={"Mohamed"}
                  rating={2}
                />
                <Content
                  width={width}
                  title={"how to chose suit programming Lang"}
                  imageUri={require("../assets/programmingLang.jpeg")}
                  auther={"Ahmed"}
                  rating={3}
                />
                <Content
                  width={width}
                  title={"Learn Node by Arabic"}
                  imageUri={require("../assets/js.png")}
                  auther={"iAli"}
                  rating={4}
                />
                <Content
                  width={width}
                  title={"Learn Javascript ES6 by Arabic"}
                  imageUri={require("../assets/js2.png")}
                  auther={"iAli"}
                  rating={5}
                />
              </View>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

export default Explore;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
