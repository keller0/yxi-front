
import $ from "jquery"
// (1) Desired editor features:
import 'monaco-editor/esm/vs/editor/browser/controller/coreCommands.js';
// import 'monaco-editor/esm/vs/editor/browser/widget/codeEditorWidget.js';
// import 'monaco-editor/esm/vs/editor/browser/widget/diffEditorWidget.js';
// import 'monaco-editor/esm/vs/editor/browser/widget/diffNavigator.js';
import 'monaco-editor/esm/vs/editor/contrib/bracketMatching/bracketMatching.js';
// import 'monaco-editor/esm/vs/editor/contrib/caretOperations/caretOperations.js';
// import 'monaco-editor/esm/vs/editor/contrib/caretOperations/transpose.js';
import 'monaco-editor/esm/vs/editor/contrib/clipboard/clipboard.js';
// import 'monaco-editor/esm/vs/editor/contrib/codelens/codelensController.js';
// import 'monaco-editor/esm/vs/editor/contrib/colorPicker/colorDetector.js';
import 'monaco-editor/esm/vs/editor/contrib/comment/comment.js';
// import 'monaco-editor/esm/vs/editor/contrib/contextmenu/contextmenu.js';
// import 'monaco-editor/esm/vs/editor/contrib/cursorUndo/cursorUndo.js';
// import 'monaco-editor/esm/vs/editor/contrib/dnd/dnd.js';
import 'monaco-editor/esm/vs/editor/contrib/find/findController.js';
import 'monaco-editor/esm/vs/editor/contrib/folding/folding.js';
// import 'monaco-editor/esm/vs/editor/contrib/format/formatActions.js';
// import 'monaco-editor/esm/vs/editor/contrib/goToDeclaration/goToDeclarationCommands.js';
// import 'monaco-editor/esm/vs/editor/contrib/goToDeclaration/goToDeclarationMouse.js';
// import 'monaco-editor/esm/vs/editor/contrib/gotoError/gotoError.js';
import 'monaco-editor/esm/vs/editor/contrib/hover/hover.js';
// import 'monaco-editor/esm/vs/editor/contrib/inPlaceReplace/inPlaceReplace.js';
// import 'monaco-editor/esm/vs/editor/contrib/linesOperations/linesOperations.js';
// import 'monaco-editor/esm/vs/editor/contrib/links/links.js';
// import 'monaco-editor/esm/vs/editor/contrib/multicursor/multicursor.js';
// import 'monaco-editor/esm/vs/editor/contrib/parameterHints/parameterHints.js';
// import 'monaco-editor/esm/vs/editor/contrib/quickFix/quickFixCommands.js';
// import 'monaco-editor/esm/vs/editor/contrib/referenceSearch/referenceSearch.js';
// import 'monaco-editor/esm/vs/editor/contrib/rename/rename.js';
// import 'monaco-editor/esm/vs/editor/contrib/smartSelect/smartSelect.js';
// import 'monaco-editor/esm/vs/editor/contrib/snippet/snippetController2.js';
// import 'monaco-editor/esm/vs/editor/contrib/suggest/suggestController.js';
// import 'monaco-editor/esm/vs/editor/contrib/toggleTabFocusMode/toggleTabFocusMode.js';
// import 'monaco-editor/esm/vs/editor/contrib/wordHighlighter/wordHighlighter.js';
// import 'monaco-editor/esm/vs/editor/contrib/wordOperations/wordOperations.js';
// import 'monaco-editor/esm/vs/editor/standalone/browser/accessibilityHelp/accessibilityHelp.js';
// import 'monaco-editor/esm/vs/editor/standalone/browser/inspectTokens/inspectTokens.js';
// import 'monaco-editor/esm/vs/editor/standalone/browser/iPadShowKeyboard/iPadShowKeyboard.js';
// import 'monaco-editor/esm/vs/editor/standalone/browser/quickOpen/quickOutline.js';
// import 'monaco-editor/esm/vs/editor/standalone/browser/quickOpen/gotoLine.js';
// import 'monaco-editor/esm/vs/editor/standalone/browser/quickOpen/quickCommand.js';
// import 'monaco-editor/esm/vs/editor/standalone/browser/toggleHighContrast/toggleHighContrast.js';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api.js';

// (2) Desired languages:
// import 'monaco-editor/esm/vs/language/typescript/monaco.contribution';
// import 'monaco-editor/esm/vs/language/css/monaco.contribution';
// import 'monaco-editor/esm/vs/language/json/monaco.contribution';
// import 'monaco-editor/esm/vs/language/html/monaco.contribution';
// import 'monaco-editor/esm/vs/basic-languages/bat/bat.contribution.js';
// import 'monaco-editor/esm/vs/basic-languages/coffee/coffee.contribution.js';
import 'monaco-editor/esm/vs/basic-languages/cpp/cpp.contribution.js';
// import 'monaco-editor/esm/vs/basic-languages/csharp/csharp.contribution.js';
// import 'monaco-editor/esm/vs/basic-languages/csp/csp.contribution.js';
// import 'monaco-editor/esm/vs/basic-languages/css/css.contribution.js';
// import 'monaco-editor/esm/vs/basic-languages/dockerfile/dockerfile.contribution.js';
// import 'monaco-editor/esm/vs/basic-languages/fsharp/fsharp.contribution.js';
import 'monaco-editor/esm/vs/basic-languages/go/go.contribution.js';
// import 'monaco-editor/esm/vs/basic-languages/handlebars/handlebars.contribution.js';
// import 'monaco-editor/esm/vs/basic-languages/html/html.contribution.js';
// import 'monaco-editor/esm/vs/basic-languages/ini/ini.contribution.js';
import 'monaco-editor/esm/vs/basic-languages/java/java.contribution.js';
// import 'monaco-editor/esm/vs/basic-languages/less/less.contribution.js';
import 'monaco-editor/esm/vs/basic-languages/lua/lua.contribution.js';
// import 'monaco-editor/esm/vs/basic-languages/markdown/markdown.contribution.js';
// import 'monaco-editor/esm/vs/basic-languages/msdax/msdax.contribution.js';
// import 'monaco-editor/esm/vs/basic-languages/mysql/mysql.contribution.js';
// import 'monaco-editor/esm/vs/basic-languages/objective-c/objective-c.contribution.js';
// import 'monaco-editor/esm/vs/basic-languages/pgsql/pgsql.contribution.js';
import 'monaco-editor/esm/vs/basic-languages/php/php.contribution.js';
// import 'monaco-editor/esm/vs/basic-languages/postiats/postiats.contribution.js';
// import 'monaco-editor/esm/vs/basic-languages/powershell/powershell.contribution.js';
// import 'monaco-editor/esm/vs/basic-languages/pug/pug.contribution.js';
import 'monaco-editor/esm/vs/basic-languages/python/python.contribution.js';
// import 'monaco-editor/esm/vs/basic-languages/r/r.contribution.js';
// import 'monaco-editor/esm/vs/basic-languages/razor/razor.contribution.js';
// import 'monaco-editor/esm/vs/basic-languages/redis/redis.contribution.js';
// import 'monaco-editor/esm/vs/basic-languages/redshift/redshift.contribution.js';
import 'monaco-editor/esm/vs/basic-languages/ruby/ruby.contribution.js';
// import 'monaco-editor/esm/vs/basic-languages/sb/sb.contribution.js';
// import 'monaco-editor/esm/vs/basic-languages/scss/scss.contribution.js';
// import 'monaco-editor/esm/vs/basic-languages/solidity/solidity.contribution.js';
// import 'monaco-editor/esm/vs/basic-languages/sql/sql.contribution.js';
// import 'monaco-editor/esm/vs/basic-languages/swift/swift.contribution.js';
// import 'monaco-editor/esm/vs/basic-languages/vb/vb.contribution.js';
// import 'monaco-editor/esm/vs/basic-languages/xml/xml.contribution.js';
// import 'monaco-editor/esm/vs/basic-languages/yaml/yaml.contribution.js';
// import 'monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution';
// import 'monaco-editor/esm/vs/basic-languages/typescript/typescript.contribution';
import 'monaco-editor/esm/vs/basic-languages/rust/rust.contribution.js';
import 'monaco-editor/esm/vs/basic-languages/shell/shell.contribution.js';
import 'monaco-editor/esm/vs/basic-languages/perl/perl.contribution.js';

self.MonacoEnvironment = {
	getWorkerUrl: function (moduleId, label) {
		// if (label === 'json') {
		// 	return './json.worker.bundle.js';
		// }
		// if (label === 'css') {
		// 	return './css.worker.bundle.js';
		// }
		// if (label === 'html') {
		// 	return './html.worker.bundle.js';
		// }
		// if (label === 'typescript' || label === 'javascript') {
		// 	return './ts.worker.bundle.js';
		// }
		return './editor.worker.bundle.js';
	}
}


let editor = null;
let minHeight = 600;
let APIURL = "https://r.yxi.io";
// var APIURL = "http://localhost:8090";
const sampleName = {
    'bash': 'run.sh',
    'c': 'main.c',
    'cpp': 'main.cpp',
    'go':  'main.go',
    'java': 'Hi.java',
    'php': 'main.php',
    'python3': 'main.py',
    'python2': 'main.py',
    'perl': 'Hi.pl',
    'perl6' : 'main.p6',
    'ruby': 'Hi.rb',
    'rust': 'Hi.rs'
}

$(document).ready(function() {

    let language_picker = $("#language");
    let lindex = localStorage.getItem("language_index")

    language_picker[0].selectedIndex = lindex != null ? lindex : 0;
    loadSample(modeAndURL(language_picker[0].value));

	language_picker.change(function() {
        let index = language_picker[0].selectedIndex;
        localStorage.setItem("language_index", index)

		loadSample(modeAndURL(this.value));
	});

    let tindex = localStorage.getItem("theme_index")
    if(tindex != null) {
        changeTheme(tindex);
    }

	$("#theme").change(function() {
		changeTheme(this.selectedIndex);
	});
	$("#btnRun").click(runCode);
	$("#btnDownload").click(downloadCode);
   
    $("#menubar").height(30);
    initLayout();
    window.onresize = function () {
        initLayout()
        if (editor) {
            editor.layout();
        }
    };
});

function initLayout() {
    var wheight = $(window).height()
    wheight = wheight < minHeight ? minHeight : wheight;
    $(".editor-frame").height(wheight - 200);
    $("#editor").height(wheight - 200);
    $("#result").height(120);
}

function xhr(url, cb) {
    $.ajax({
        type: 'GET',
        url: url,
        dataType: 'text',
        error: function () {
            cb(this, null);
        }
    }).done(function(data) {
        cb(null, data);
    });
}

function loadSample(mode) {
    $('.loading.editor').show();
    xhr(mode.sampleURL, function(err, data) {
        if (err) {
            if (editor) {
                if (editor.getModel()) {
                    editor.getModel().dispose();
                }
                editor.dispose();
                editor = null;
            }
            $('.loading.editor').fadeOut({ duration: 200 });
            $('#editor').empty();
            $('#editor').append('<p class="alert alert-error">Failed to load ' + mode.modeId + ' sample</p>');
            return;
        }

        if (!editor) {
            $('#editor').empty();
            editor = monaco.editor.create(document.getElementById('editor'), {
                model: null,
            });
        }

        var oldModel = editor.getModel();
        var newModel = monaco.editor.createModel(data, mode.modeId);
        editor.setModel(newModel);
        if (oldModel) {
            oldModel.dispose();
        }
        $('.loading.editor').fadeOut({ duration: 300 });
    })
}

function changeTheme(theme) {
    localStorage.setItem("theme_index", theme)
    var newTheme = (theme === 1 ? 'vs-dark' : ( theme === 0 ? 'vs' : 'hc-black' ));
    monaco.editor.setTheme(newTheme);
}

function modeAndURL(mode) {
    var editorMode = mode;
    if(mode === "python2" || mode === "python3") {
        editorMode = "python";
    } else if (mode === "perl6") {
        editorMode = "perl"
    }
    return {
        modeId: editorMode,
        sampleURL: 'samples/sample.' + mode + '.txt'
    };
}

function runCode() {
    $("#result").removeClass("failed");
    $("#result").val("");
    $("#btnRun").prop('disabled', true).text("Running...");
    var language = $(".language-picker option:selected").text();
    var apiurl = APIURL + "/v1/" + language.replace("-", "/");
    var filename = sampleName[language.split("-")[0]];
    var codeContent = editor.getValue();
    var codedata = {
        files: [
            {
                content: codeContent,
                name: filename
            }
        ],
        stdin: "",
        argument: {
            compile: [],
            run: []
        }
    }
    debugger
    $.ajax({
        url: apiurl,
        timeout : 10000,
        type: "POST",
        contentType: "application/json", // send as JSON
        data: JSON.stringify(codedata)
    }).done(function(res) {
        
        if(res.userResult.exiterror === ""){
            $("#result").val(res.userResult.stdout);
        } else {
            $("#result").val(res.userResult.stdout + res.userResult.stderr);
        }

    }).fail(function(jqXHR, textStatus, errorThrown){
        $("#result").addClass("failed");
        if(textStatus === 'timeout')
        {     
            $("#result").val("time out");
        } else {
            $("#result").val("Request error : " + errorThrown);
        }
    }).always(function() {
        $("#btnRun").prop('disabled', false).text("Run");
    });
}



function downloadCode() {
    // maybe change filename
    var filename = 'example.txt';
    var text = editor.getValue();
    var pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    pom.setAttribute('download', filename);

    if (document.createEvent) {
        var event = document.createEvent('MouseEvents');
        event.initEvent('click', true, true);
        pom.dispatchEvent(event);
    }
    else {
        pom.click();
    }
}