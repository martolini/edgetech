import Firebase from 'firebase'

export const CATEGORIES = [
  {
    id: 'Java',
    name: 'Java',
  },
  {
    id: 'C++',
    name: 'C++'
  },
  {
    id: 'Javascript',
    name: 'Javascript'
  },
  {
    id: 'Python',
    name: 'Python'
  },
  {
    id: 'PHP',
    name: 'PHP'
  },
  {
    id: 'Powershell',
    name: 'Powershell'
  },
  {
    id: 'Matlab',
    name: 'Matlab'
  },
  {
    id: 'Test',
    name: 'Test'
  }
]

export const CODEMODES = {
  'Java': 'java',
  'C++': 'c_cpp',
  'Javascript': 'javascript',
  'Test': 'javascript',
  'Python': 'python',
  'PHP': 'php',
  'Powershell': 'powershell',
  'Matlab': 'matlab'
}

export const SNIPPETS = {
  'Java': 'public class Hero {\n    public static void main(String[] args) {\n        System.out.println("Waiting for a hero to help you out!");\n    }    \n}',
  'C++': '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Waiting for a hero to help you out..." << endl;\n    return 0;\n}',
  'Javascript': 'class Waiting extends Component {\n    constructor(props) {\n        super(props)\n        this.state = {\n            tutur: null,\n            loading: true\n        }\n        console.log("Waiting for a hero to help you out!")\n    }\n}',
  'Test': 'class Waiting extends Component {\n    constructor(props) {\n        super(props)\n        this.state = {\n            tutur: null,\n            loading: true\n        }\n        console.log("Waiting for a hero to help you out!")\n    }\n}',
  'Python': 'import antigravity\nprint "hello world!"',
  'PHP': '<?php\n    echo "Hello World!";\n?>',
  'Powershell': '# This is a simple comment\nfunction Hello($name) {\n    Write-host "Hello $name"\n}',
  'Matlab': 'x = 0:pi/100:2*pi;\ny = sin(x);\nplot(x,y)'
}

export const LEVELS = [
  {
    id: 0,
    nextLevel: 5,
    badge: 'https://firebasestorage.googleapis.com/v0/b/project-1024656250083069122.appspot.com/o/badges%2Fstudent.png?alt=media&token=5881e225-0252-4592-9106-92f646bd7ed6',
    rank: 'Student'
  },
  {
    id: 1,
    nextLevel: 20,
    badge: 'https://firebasestorage.googleapis.com/v0/b/project-1024656250083069122.appspot.com/o/badges%2Fbachelor.png?alt=media&token=47dca36d-e261-4e2e-b75f-3c4fa80d1d70',
    rank: 'Bachelor'
  },
  {
    id: 2,
    nextLevel: 50,
    badge: 'https://firebasestorage.googleapis.com/v0/b/project-1024656250083069122.appspot.com/o/badges%2Ftutor.png?alt=media&token=66988598-383e-4dc7-a109-2d8a5c26757e',
    rank: 'Tutor'
  },
  {
    id: 3,
    nextLevel: 100,
    badge: 'https://firebasestorage.googleapis.com/v0/b/project-1024656250083069122.appspot.com/o/badges%2Fmentor.png?alt=media&token=fd8d17ec-a4bb-4787-ac88-0b3b330e0753',
    rank: 'Mentor'
  },
  {
    id: 4,
    nextLevel: 150,
    badge: 'https://firebasestorage.googleapis.com/v0/b/project-1024656250083069122.appspot.com/o/badges%2Fmaster.png?alt=media&token=4725f7b5-8e0f-4063-8dc3-45e95d654dfc',
    rank: 'Master'
  },
  {
    id: 5,
    nextLevel: 250,
    badge: 'https://firebasestorage.googleapis.com/v0/b/project-1024656250083069122.appspot.com/o/badges%2Fdoctor.png?alt=media&token=8e94db1e-b1e4-40fb-9bfe-acf1d9fd62e0',
    rank: 'Doctor'
  },
  {
    id: 6,
    nextLevel: 500,
    badge: 'https://firebasestorage.googleapis.com/v0/b/project-1024656250083069122.appspot.com/o/badges%2Fscientist.png?alt=media&token=960e8323-c4a8-47dd-9f09-e0e7373d334a',
    rank: 'Scientist'
  },
  {
    id: 7,
    nextLevel: 750,
    badge: 'https://firebasestorage.googleapis.com/v0/b/project-1024656250083069122.appspot.com/o/badges%2Fprofessor.png?alt=media&token=22d80b22-fa2b-4945-80d7-9e88da3dc770',
    rank: 'Professor'
  },
  {
    id: 8,
    nextLevel: 1000,
    badge: 'https://firebasestorage.googleapis.com/v0/b/project-1024656250083069122.appspot.com/o/badges%2Fheadmaster.png?alt=media&token=d2815d5b-b23a-4e7e-ae2e-5a2322d4fa86',
    rank: 'Headmaster'
  },
  {
    id: 9,
    nextLevel: 10000,
    badge: 'https://firebasestorage.googleapis.com/v0/b/project-1024656250083069122.appspot.com/o/badges%2Fsuper-saiyan.png?alt=media&token=12a30eaa-b09b-4a95-8728-83a3bc5e74e3',
    rank: 'Super Saiyan'
  }
]

// Initialize Firebase
var config = {
  apiKey: "AIzaSyDglIcFfh4Cf1RmbbNPn0KYz7rKhb1IPY0",
  authDomain: "edgetech.firebaseapp.com",
  databaseURL: "https://edgetech.firebaseio.com",
  storageBucket: "project-1024656250083069122.appspot.com",
};

firebase.initializeApp(config);

export const firebaseRef = firebase
