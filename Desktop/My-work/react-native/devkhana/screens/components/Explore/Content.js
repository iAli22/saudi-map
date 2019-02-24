import React, { Component } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import StarRating from "react-native-star-rating";

class Content extends Component {
  render() {
    return (
      <View
        style={{
          width: this.props.width / 2 - 30,
          height: this.props.width / 2 - 30,
          borderWidth: 0.5,
          borderColor: "#ddd"
        }}
      >
        <View style={{ flex: 1 }}>
          <Image
            source={this.props.imageUri}
            style={{
              flex: 1,
              height: null,
              width: null,
              resizeMode: "cover"
            }}
          />
        </View>
        <View
          style={{
            flex: 1,
            alignItems: "flex-start",
            justifyContent: "space-evenly",
            paddingLeft: 10
          }}
        >
          <Text style={{ fontSize: 12, color: "#b63838" }}>
            {this.props.title}
          </Text>
          <Text style={{ fontSize: 10 }}>
            by:{" "}
            <Text style={{ fontSize: 11, fontWeight: "700" }}>
              {this.props.auther}
            </Text>
          </Text>
          <StarRating
            disabled={true}
            maxStars={5}
            rating={this.props.rating}
            starSize={10}
          />
        </View>
      </View>
    );
  }
}

export default Content;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
