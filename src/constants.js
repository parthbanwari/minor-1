export const LANGUAGE_VERSION = {
    c: 'C11',
    cpp: 'C++17',
    csharp: '6.12.0',
    python: '3.10.0',
    java: '15.0.2',
    javascript: '18.15.0',
    typescript: '5.0.3',
    php: '8.2.3',
}

export const LANGUAGE_ID_MAP = {
    c: 50,
    cpp: 54,
    csharp: 51,
    python: 71,
    java: 62,
    javascript: 63,
    typescript: 74,
    php: 68,
}

export const CODE_SNIPPETS = {
    javascript: `function sayMyName() {
    console.log("Say my Name!");
    }
    sayMyName();
    `,
    typescript: `function sayName(): void {
    console.log("Heisenberg");
    }
    sayName();
    `,
    python: `print("You're Goddamn Right")`,
    java: `public class Main {
    public static void main(String[] args) {
        System.out.println("I am the one who knocks");
        }
    }
    `,
    csharp: `using System;
    class Program
    {
        static void Main(string[] args){
            Console.WriteLine("TIGHT! TIGHT TIGHT! YEAH! Arh, blue, yellow, pink, whatever, man, just keep bringing me that.");
        }
    }
    `,
    php: `<?php
echo "Jesse: Say you want this.";
?>`,

    cpp: `#include <iostream>
int main() {
    std::cout << "I watched Jane die!" << std::endl;
    return 0;
}
`,
    c: `#include <stdio.h>

int main() {
    printf("What up, G!");
    return 0;
}
`,
}
