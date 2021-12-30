const HandleButtonTransfer = (history, path, label)  => {

    if (label === "Signup" || label === "Login") return history.replace(path);

    return history.push(path);
}
export default HandleButtonTransfer;