
import $ from "jquery"

import GoldenLayout from 'golden-layout'
import 'golden-layout/src/css/goldenlayout-base.css'
import 'golden-layout/src/css/goldenlayout-light-theme.css'

import 'monaco-editor/esm/vs/editor/browser/controller/coreCommands.js';
import 'monaco-editor/esm/vs/editor/contrib/bracketMatching/bracketMatching.js';
import 'monaco-editor/esm/vs/editor/contrib/clipboard/clipboard.js';
import 'monaco-editor/esm/vs/editor/contrib/comment/comment.js';
import 'monaco-editor/esm/vs/editor/contrib/find/findController.js';
import 'monaco-editor/esm/vs/editor/contrib/folding/folding.js';
import 'monaco-editor/esm/vs/editor/contrib/hover/hover.js';
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
};


let editor = null;
const API_URL = "https://r.yxi.io";
// const API_URL = "http://localhost:8090";
const sampleName = {
    'bash': 'run.sh',
    'c': 'main.c',
    'cpp': 'main.cpp',
    'go': 'main.go',
    'java': 'Hi.java',
    'php': 'main.php',
    'python3': 'main.py',
    'python2': 'main.py',
    'perl': 'Hi.pl',
    'perl6': 'main.p6',
    'ruby': 'Hi.rb',
    'rust': 'Hi.rs'
};



$(document).ready(function () {


    var config = {
        settings: { showPopoutIcon: false },
        content: [{
            type: 'row',
            content: [
                {
                    type: 'component',
                    componentName: 'Editor',
                    componentState: { text: 'Component 1' }
                },
                {
                    type: 'component',
                    componentName: 'Result',
                    componentState: { text: 'Component 2' }
                }
            ]
        }]
    };
    var myLayout = new GoldenLayout(config);

    myLayout.registerComponent('Editor', function (container, state) {
        container.getElement().html('<div class="try"> <div class="container"><div class="editor"><div class="editor-frame"><div class="loading editor" style="display: none;"><div class="progress"><p class="bar">Loading...</p> </div></div><div id="editor"></div></div></div></div></div>');
    });
    myLayout.registerComponent('Result', function (container, state) {
        container.getElement().html('<textarea id="result"></textarea>');
    });


    myLayout.init();

    let language_picker = $("#language");
    let l_index = localStorage.getItem("language_index");

    language_picker[0].selectedIndex = l_index != null ? l_index : 0;
    loadSample(modeAndURL(language_picker[0].value));

    language_picker.change(function () {
        let index = language_picker[0].selectedIndex;
        localStorage.setItem("language_index", index);

        loadSample(modeAndURL(this.value));
    });

    let s_theme = localStorage.getItem("selected_theme");
    s_theme = s_theme ? s_theme : "vs";
    changeTheme(s_theme);
    $("#theme").val(s_theme);


    $("#theme").change(function () {
        changeTheme(this.value);
    });
    $("#btnRun").click(runCode);
    $("#btnDownload").click(downloadCode);


    myLayout.on('stateChanged', function () {
        if (editor) {
            editor.layout();
        }
    })
});

function xhr(url, cb) {
    $.ajax({
        type: 'GET',
        url: url,
        dataType: 'text',
        error: function () {
            cb(this, null);
        }
    }).done(function (data) {
        cb(null, data);
    });
}

function loadSample(mode) {
    $('.loading.editor').show();
    xhr(mode.sampleURL, function (err, data) {
        if (err) {
            if (editor) {
                if (editor.getModel()) {
                    editor.getModel().dispose();
                }
                editor.dispose();
                editor = null;
            }
            $('.loading.editor').fadeOut({ duration: 200 });
            $('#editor').empty().append('<p class="alert alert-error">Failed to load ' + mode.modeId + ' sample</p>');
            return;
        }

        if (!editor) {
            $('#editor').empty();
            editor = monaco.editor.create(document.getElementById('editor'), {
                model: null,
            });
        }

        let oldModel = editor.getModel();
        let newModel = monaco.editor.createModel(data, mode.modeId);
        editor.setModel(newModel);
        if (oldModel) {
            oldModel.dispose();
        }
        $('.loading.editor').fadeOut({ duration: 300 });
    })
}

function changeTheme(theme) {
    localStorage.setItem("selected_theme", theme);
    monaco.editor.setTheme(theme);
}

function modeAndURL(mode) {
    let editorMode = mode;
    if (mode === "python2" || mode === "python3") {
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
    $("#result").removeClass("failed").val("");

    $("#btnRun").prop('disabled', true).text("Running...");
    let language = $(".language-picker option:selected").text();
    let apiurl = API_URL + "/v1/" + language.replace("-", "/");
    let filename = sampleName[language.split("-")[0]];
    let codeContent = editor.getValue();
    let codedata = {
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
    };

    $.ajax({
        url: apiurl,
        timeout: 10000,
        type: "POST",
        contentType: "application/json", // send as JSON
        data: JSON.stringify(codedata)
    }).done(function (res) {

        if (res.userResult.exitError === "") {
            $("#result").val(res.userResult.stdout);
        } else {
            $("#result").val(res.userResult.stdout + res.userResult.stderr);
        }

    }).fail(function (jqXHR, textStatus, errorThrown) {
        let res = $("#result");
        res.addClass("failed");
        if (textStatus === 'timeout') {
            res.val("time out");
        } else {
            res.val("Request error : " + errorThrown);
        }
    }).always(function () {
        $("#btnRun").prop('disabled', false).text("Run");
    });
}



function downloadCode() {
    // maybe change filename
    let filename = 'example.txt';
    let text = editor.getValue();
    let pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    pom.setAttribute('download', filename);

    if (document.createEvent) {
        let event = document.createEvent('MouseEvents');
        event.initEvent('click', true, true);
        pom.dispatchEvent(event);
    }
    else {
        pom.click();
    }
}
