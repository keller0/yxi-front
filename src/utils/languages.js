const supportedLaguage = [
    'c',
    'php',
    'java',
    'cpp',
    'python'
]

const SampleCode = {
    'c': {
        'filename': 'main.c',
        'code': '#include<stdio.h>\n\nint main()\n{\n  printf("Hello, World!\\n");\n}'
    },
    'php': {
        'filename': 'main.php',
        'code': '<?php\n    echo"Hello, Word";'
    },
    'cpp': {
        'filename': 'main.cpp',
        'code': '#include <iostream>\n\nint main() {\n    std::cout << "Hello, World.";\n}'
    },
    'java': {
        'filename': 'Hi.java',
        'code': 'public class Hi {\n \tpublic static void main(String[] args) {\n\t\tSystem.out.println(\"Hello World\");\n\t}\n}'
    },
    'python': {
        'filename': 'main.py',
        'code': '#!/usr/bin/python\n\nprint(\'Hello World!\')'
    }
}

const CodeMirrorMode = {

}

export { supportedLaguage, SampleCode, CodeMirrorMode }
