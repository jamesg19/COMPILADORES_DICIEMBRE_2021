var code = $(".codemirror-textareaConsola")[0];
let consolaa = CodeMirror.fromTextArea(code, {
    lineNumbers: true,
    mode: "text/x-java",
    theme: "ayu-mirage"
});



function insertarTextoConsola(text) {
    consolaa.setValue("");
    consolaa.setValue(text);

}