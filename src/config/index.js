import Firebase from 'firebase'

export const CATEGORIES = [
  {
    id: 'Java',
  },
  {
    id: 'C++',
  },
  {
    id: 'Javascript',
  }
]

export const CODEMODES = {
  'Java': 'java',
  'C++': 'c_cpp',
  'Javascript': 'javascript'
}

export const SNIPPETS = {
  'Java': 'public class Hero {\n    public static void main(String[] args) {\n        System.out.println("Waiting for a hero to help you out!");\n    }    \n}',
  'C++': '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Waiting for a hero to help you out..." << endl;\n    return 0;\n}',
  'Javascript': 'class Waiting extends Component {\n    constructor(props) {\n        super(props)\n        this.state = {\n            tutur: null,\n            loading: true\n        }\n        console.log("Waiting for a hero to help you out!")\n    }\n}'
}

export const firebaseRef = new Firebase('https://edgetech.firebaseio.com/')

