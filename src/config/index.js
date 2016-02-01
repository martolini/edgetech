import Firebase from 'firebase'

export const CATEGORIES = [
  {
    id: 'TDT4100',
    name: 'Object-Oriented Programming (Java)',
  },
  {
    id: 'TDT4102',
    name: 'Object-Oriented Programming (C++)'
  },
  {
    id: 'Javascript',
    name: 'Javascript syntax'
  }
]

export const CODEMODES = {
  'TDT4100': 'java',
  'TDT4102': 'c_cpp',
  'Javascript': 'javascript'
}

export const SNIPPETS = {
  'TDT4100': 'public class Hero {\n    public static void main(String[] args) {\n        System.out.println("Waiting for a hero to help you out!");\n    }    \n}',
  'TDT4102': '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Waiting for a hero to help you out..." << endl;\n    return 0;\n}',
  'Javascript': 'class Waiting extends Component {\n    constructor(props) {\n        super(props)\n        this.state = {\n            tutur: null,\n            loading: true\n        }\n        console.log("Waiting for a hero to help you out!")\n    }\n}'
}

export const firebaseRef = new Firebase('https://edgetech.firebaseio.com/')

