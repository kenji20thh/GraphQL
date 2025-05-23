function base64EncodeUnicode(str) {
    return btoa(
        encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
            (match, p1) => String.fromCharCode('0x' + p1))
    );
}



const text = "Hello, 🌍!";
const encoded = base64EncodeUnicode(text);
console.log(encoded); // Outputs: "SGVsbG8sIPCfmIgh"