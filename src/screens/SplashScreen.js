import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import LinearGradient from "react-native-linear-gradient";

const SplashScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const [Loading, setLoading] = useState(false);

  return (
    <LinearGradient
      colors={["#0073ff", "blue"]}
      style={styles.container}
    >
      <View style={styles.header}>
      </View>
      <View
        style={[
          styles.footer,
          {
            backgroundColor: colors.background,
          },
        ]}
      >
        <Text
          style={[
            styles.title,
            {
              color: colors.text,
            },
          ]}
        >
          Nearby Users
        </Text>
        <Text style={styles.text}>Connect with your firends lfkod kok oksod kokok oko kokd</Text>
        <View style={styles.button}>
          <TouchableOpacity>
            <LinearGradient
              colors={["#0073ff", "blue"]}
              style={styles.signIn}
            >
              <Text style={styles.textSign}>Get Started</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

export default SplashScreen;

const { height } = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 30,
    paddingHorizontal: 30,
  },
  logo: {
    width: height_logo,
    height: height_logo,
    borderRadius: 40,
  },
  title: {
    color: "#05375a",
    fontSize: 30,
    marginVertical: 7,
    fontWeight: "bold",
  },
  text: {
    color: "grey",
    marginTop: 8,
    fontSize: 16,
    fontWeight: "bold",
  },
  button: {
    alignItems: "flex-end",
    marginTop: 60,
  },
  signIn: {
    width: 150,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    flexDirection: "row",
  },
  textSign: {
    color: "white",
    fontWeight: "bold",
  },
});
