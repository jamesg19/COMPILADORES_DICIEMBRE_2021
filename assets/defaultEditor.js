let fuente = '';
var code = $(".codemirror-textareaEditor")[0];
let editor = CodeMirror.fromTextArea(code, {
    lineNumbers: true,
    mode: "text/x-java",
    theme: "ayu-mirage",
    overflow: "scroll",
    resize: "none"
});



function getText() {
    fuente = editor.getValue();
    return fuente;
}