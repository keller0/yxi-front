const supportedLaguage = [
    'bash',
    'c',
    'cpp',
    'go',
    'java',
    'perl',
    'php',
    'python',
    'scala'
]

const SampleCode = {
    'bash': {
        'filename': 'main.sh',
        'code': '#!/bin/bash\n\necho "Hello, World!"'
    },
    'c': {
        'filename': 'main.c',
        'code': '#include<stdio.h>\n\nint main()\n{\n    printf("Hello, World!\\n");\n}'
    },
    'cpp': {
        'filename': 'main.cpp',
        'code': '#include <iostream>\n\nint main()\n{\n    std::cout << "Hello, World!\\n";\n}'
    },
    'go': {
        'filename': 'main.go',
        'code': 'package main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello, 世界!")\n}'
    },
    'java': {
        'filename': 'Hi.java',
        'code': 'public class Hi {\n \tpublic static void main(String[] args) {\n\t\tSystem.out.println(\"Hello World\");\n\t}\n}'
    },
    'php': {
        'filename': 'main.php',
        'code': '<?php\n    echo"Hello, Word";'
    },
    'python': {
        'filename': 'main.py',
        'code': '#!/usr/bin/python\n\nprint(\'Hello World!\')'
    },
    'scala': {
        'filename': 'Hi.scala',
        'code': 'object Hi {\n    def main(args: Array[String]) {\n        println(\"Hello, world!\")\n    }\n}'
    },
    'perl': {
        'filename': 'Hi.pl',
        'code': '#!/usr/bin/perl\n\nuse strict;\nuse warnings;\n\nprint \"Hello, World!\\n\";'
    }

}

function CodeMirrorMode(language) {
    switch (language) {
        case 'bash':
            return 'text/x-sh'
        case 'c':
            return 'text/x-csrc'
        case 'cpp':
            return 'text/x-csrc'
        case 'java':
            return 'text/x-java'
        case 'c#':
            return 'text/x-csharp'
        case 'objext-c':
            return 'text/x-objectivec'
        case 'scala':
            return 'text/x-scala'
        case 'squirrel':
            return 'text/x-squirrel'
        case 'lua':
            return 'text/x-lua'
        case 'php':
            return 'text/x-php'
        case 'python':
            return 'text/x-python'
        case 'go':
            return 'text/x-go'
        case 'perl':
            return 'text/x-perl'
        default:
            return 'text/x-csrc'
    }
}

export { supportedLaguage, SampleCode, CodeMirrorMode }
