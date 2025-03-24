import { StyleSheet } from "react-native";
import AppColors from "./AppColors";

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: AppColors.BACKGROUND,
  },
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  title: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "#001A57",
    paddingVertical: 15,
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginTop: 20,
  },
  instruction: {
    textAlign: "center",
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
  },
  emailText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    color: "#001A57",
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#001A57",
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  codeContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  codeInput: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    textAlign: "center",
    fontSize: 18,
    marginHorizontal: 5,
    borderRadius: 5,
  },
});
