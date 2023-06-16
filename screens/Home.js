import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground
} from "react-native";
import { Icon } from "react-native-elements";
import { RFValue } from "react-native-responsive-fontsize";
import axios from "axios";
import WebView from "react-native-webview";

export default class HomeScreen extends Component {
  constructor() {
    super();
    this.state = {
      articleDetails: {},
      ngrok_url: "https://5a67-75-204-109-18.ngrok.io",
    };
  }

  componentDidMount() {
    this.getArticle();
  }

  getArticle = ()=> {
    const url = this.state.ngrok_url + 'articles'
    axios.get(url).then((response) =>{
      this.setState({
        articleDetails: response.data.data
      })
    }).catch((error)=>{
      console.log(error.message)
    })
   }
  

  likedArticle = () => {
    /*Complete the likedArticle() function.*/
    const url = this.state.ngrok_url + 'like'
    axios.get(url).then((response) =>{
      this.getArticle()
    }).catch((error)=>{
      console.log(error.message)
    })
  };

  unlikedArticle = () => {
    const url = this.state.ngrok_url + 'dislike'
    axios.get(url).then((response) =>{
      this.getArticle()
    }).catch((error)=>{
      console.log(error.message)
    })
  };

  render() {
    const { articleDetails } = this.state;
    const { url } = articleDetails;
    if (url) {
      return (
        <View style={styles.container}>
          <ImageBackground
            source={require("../assets/bg.png")}
            style={{ flex: 1 }}
          >
            <View style={styles.headerContainer}>
              <Text style={styles.headerTitle}>Articles to Read</Text>
              <Icon
                name="chevron-right"
                type="feather"
                color={"white"}
                size={RFValue(30)}
                containerStyle={{ position: "absolute", right: RFValue(5) }}
                onPress={() => {
                  this.props.navigation.navigate("Articles");
                }}
              ></Icon>
            </View>

            <View style={styles.subContainer}>
              <WebView
              source={{uri: url}}
              />
              

              <View style={styles.iconButtonContainer}>
                <TouchableOpacity onPress={this.likedArticle}>
                  <Image
                    style={styles.iconImage}
                    source={require("../assets/like.png")}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={this.unlikedArticle}>
                  <Image
                    style={styles.iconImage}
                    source={require("../assets/dislike.png")}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <ImageBackground
            source={require("../assets/bg.png")}
            style={{ flex: 1 }}
          >
            <View style={styles.headerContainer}>
              <Text style={styles.headerTitle}>Articles to Read</Text>
            </View>
            <Text style={styles.headerTitle}>Loading...</Text>
          </ImageBackground>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerContainer: {
    flex: 0.07,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-end",
    backgroundColor: "#3D550C",
  },
  headerTitle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: RFValue(18),
    fontFamily: "monospace",
    textAlign: "center",
    flex: 1,
  },
  subContainer: {
    flex: 0.9,
  },
  posterContainer: {
    flex: 0.6,
    justifyContent: "center",
    alignItems: "center",
  },
  posterImage: {
    width: "85%",
    height: "95%",
    resizeMode: "stretch",
    borderRadius: RFValue(10),
    marginHorizontal: RFValue(5),
  },
  detailsContainer: {
    width: "80%",
    alignSelf: "center",
    flex: 0.2,
    backgroundColor: "#3c8ed9",
    borderRadius: RFValue(10),
    marginHorizontal: RFValue(10),
    padding: RFValue(10),
  },
  title: {
    fontSize: RFValue(15),
    fontWeight: "bold",
    color: "white",
    fontFamily: "monospace",
    marginVertical: RFValue(5),
  },
  subtitle: {
    fontSize: RFValue(10),
    fontWeight: "bold",
    color: "white",
    fontFamily: "monospace",
    marginVertical: RFValue(5),
  },
  ratingContainer: {
    flex: 0.1,
  },
  overview: {
    fontSize: RFValue(13),
    color: "white",
    fontFamily: "monospace",
    marginVertical: RFValue(5),
  },
  iconButtonContainer: {
    flex: 0.1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  iconImage: {
    width: RFValue(50),
    height: RFValue(50),
  },
});
