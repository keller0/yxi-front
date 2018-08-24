const supportedLaguage = [
    'bash',
    'c',
    'cpp',
    'go',
    'haskell',
    'java',
    'perl',
    'php',
    'python3.5',
    'python2.7',
    'ruby',
    'rust'
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
    'haskell': {
        'filename': 'Hi.hs',
        'code': 'main = putStrLn "Hello, World!"'
    },
    'java': {
        'filename': 'Hi.java',
        'code': 'public class Hi {\n \tpublic static void main(String[] args) {\n\t\tSystem.out.println(\"Hello World\");\n\t}\n}'
    },
    'php': {
        'filename': 'main.php',
        'code': '<?php\n    echo"Hello, World!";'
    },
    'python3.5': {
        'filename': 'main.py',
        'code': '#!/usr/bin/python\n\nprint(\'Hello, World!\')'
    },
    'python2.7': {
        'filename': 'main.py',
        'code': '#!/usr/bin/python\n\nprint \'Hello, World!\''
    },
    'perl': {
        'filename': 'Hi.pl',
        'code': '#!/usr/bin/perl\n\nuse strict;\nuse warnings;\n\nprint \"Hello, World!\\n\";'
    },
    'ruby': {
        'filename': 'Hi.rb',
        'code': "#!/usr/bin/env ruby\n\nputs 'Hello, World!'"
    },
    'rust': {
        'filename': 'Hi.rs',
        'code': 'fn main() {\n     println!("Hello, World!");\n}'
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
        case 'c#':
            return 'text/x-csharp'
        case 'objext-c':
            return 'text/x-objectivec'
        case 'rust':
            return 'text/x-rustsrc'
        case 'python3.5':
            return 'text/x-python'
        case 'python2.7':
            return 'text/x-python'
        default:
            return 'text/x-' + language
    }
}

export { supportedLaguage, SampleCode, CodeMirrorMode }
