import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },
  body: {
    backgroundColor: "black",
    width: "100%",
    height: 280,
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 40,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inputContainer: {
    width: "90%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 30,
  },
  textInput: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "black",
    fontSize: 18,
    paddingHorizontal: 10,
  },
  label: { fontSize: 28, fontWeight: "bold", alignSelf: "flex-start" },
  headerOne: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
  },
  headerTwo: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  textBlock: {
    fontSize: 14,
    width: 160,
    marginTop: 10,
    color: "white",
  },
  bodyImage: {
    width: 130,
    height: "auto",
    resizeMode: "contain",
  },
  button: {
    backgroundColor: "black",
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 35,
    marginBottom: 25,
    marginLeft: "auto",
    marginRight: 25,
  },
});
