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
  'Powershell': 'powershell'
}

export const SNIPPETS = {
  'Java': 'public class Hero {\n    public static void main(String[] args) {\n        System.out.println("Waiting for a hero to help you out!");\n    }    \n}',
  'C++': '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Waiting for a hero to help you out..." << endl;\n    return 0;\n}',
  'Javascript': 'class Waiting extends Component {\n    constructor(props) {\n        super(props)\n        this.state = {\n            tutur: null,\n            loading: true\n        }\n        console.log("Waiting for a hero to help you out!")\n    }\n}',
  'Test': 'class Waiting extends Component {\n    constructor(props) {\n        super(props)\n        this.state = {\n            tutur: null,\n            loading: true\n        }\n        console.log("Waiting for a hero to help you out!")\n    }\n}',
  'Python': 'import antigravity\nprint "hello world!"',
  'PHP': '<?php\n    echo "Hello World!";\n?>',
  'Powershell': '# This is a simple comment\nfunction Hello($name) {\n    Write-host "Hello $name"\n}'
}

export const LEVELS = [
  {
    id: 0,
    nextLevel: 5,
    badge: 'https://dl.dropboxusercontent.com/u/2188934/edgetech/badges/student.png',
    rank: 'Student'
  },
  {
    id: 1,
    nextLevel: 20,
    badge: 'https://dl.dropboxusercontent.com/u/2188934/edgetech/badges/bachelor.png',
    rank: 'Bachelor'
  },
  {
    id: 2,
    nextLevel: 50,
    badge: 'https://dl.dropboxusercontent.com/u/2188934/edgetech/badges/tutor.png',
    rank: 'Tutor'
  },
  {
    id: 3,
    nextLevel: 100,
    badge: 'https://dl.dropboxusercontent.com/u/2188934/edgetech/badges/mentor.png',
    rank: 'Mentor'
  },
  {
    id: 4,
    nextLevel: 150,
    badge: 'https://dl.dropboxusercontent.com/u/2188934/edgetech/badges/master.png',
    rank: 'Master'
  },
  {
    id: 5,
    nextLevel: 250,
    badge: 'https://dl.dropboxusercontent.com/u/2188934/edgetech/badges/doctor.png',
    rank: 'Doctor'
  },
  {
    id: 6,
    nextLevel: 500,
    badge: 'https://dl.dropboxusercontent.com/u/2188934/edgetech/badges/scientist.png',
    rank: 'Scientist'
  },
  {
    id: 7,
    nextLevel: 750,
    badge: 'https://dl.dropboxusercontent.com/u/2188934/edgetech/badges/professor.png',
    rank: 'Professor'
  },
  {
    id: 8,
    nextLevel: 1000,
    badge: 'https://dl.dropboxusercontent.com/u/2188934/edgetech/badges/headmaster.png',
    rank: 'Headmaster'
  },
  {
    id: 9,
    nextLevel: 10000,
    badge: 'https://dl.dropboxusercontent.com/u/2188934/edgetech/badges/super-saiyan.png',
    rank: 'Super Saiyan'
  }
]

export const RANKINGS = [
  {
    id: 1,
    title: 'Student',
    image: 'https://dl.dropboxusercontent.com/u/2188934/thxbro-rankings/student.jpg',
    text: 'You are just a mere student and knows nothing. This is lowest ranking and no one even wants to talk to you. Try helping someone out to advance in rankings!',
    badge: ''
  },
  {
    id: 2,
    title: 'Bachelor',
    image: 'https://dl.dropboxusercontent.com/u/2188934/thxbro-rankings/bachelor.jpg',
    text: "You're a little older now but still a complete retard. You're koking all your øvings"
  },
  {
    id: 3,
    title: 'Tutor',
    image: 'https://dl.dropboxusercontent.com/u/2188934/thxbro-rankings/student.jpg',
    text: ''
  },
  {
    id: 4,
    title: 'Elder',
    image: 'https://dl.dropboxusercontent.com/u/2188934/thxbro-rankings/student.jpg',
    text: ''
  },
  {
    id: 5,
    title: 'Sensei',
    image: 'https://dl.dropboxusercontent.com/u/2188934/thxbro-rankings/student.jpg',
    text: ''
  },
  {
    id: 6,
    title: 'Maven',
    image: 'https://dl.dropboxusercontent.com/u/2188934/thxbro-rankings/student.jpg',
    text: ''
  },
  {
    id: 7,
    title: 'Guru',
    image: 'https://dl.dropboxusercontent.com/u/2188934/thxbro-rankings/student.jpg',
    text: ''
  },
  {
    id: 8,
    title: 'Master',
    image: 'https://dl.dropboxusercontent.com/u/2188934/thxbro-rankings/student.jpg',
    text: ''
  },
  {
    id: 9,
    title: 'Maharishi',
    image: 'https://dl.dropboxusercontent.com/u/2188934/thxbro-rankings/student.jpg',
    text: ''
  },
  {
    id: 10,
    title: 'Scientist',
    image: 'https://dl.dropboxusercontent.com/u/2188934/thxbro-rankings/student.jpg',
    text: ''
  },
  {
    id: 11,
    title: 'Marabout',
    image: 'https://dl.dropboxusercontent.com/u/2188934/thxbro-rankings/student.jpg',
    text: ''
  },
  {
    id: 12,
    title: 'Saiyan',
    image: 'https://dl.dropboxusercontent.com/u/2188934/thxbro-rankings/student.jpg',
    text: ''
  },
  {
    id: 13,
    title: 'Arcanist',
    image: 'https://dl.dropboxusercontent.com/u/2188934/thxbro-rankings/student.jpg',
    text: ''
  },
    {
    id: 14,
    title: 'Doctor',
    image: 'https://dl.dropboxusercontent.com/u/2188934/thxbro-rankings/student.jpg',
    text: ''
  },
  {
    id: 15,
    title: 'Professor',
    image: 'https://dl.dropboxusercontent.com/u/2188934/thxbro-rankings/student.jpg',
    text: ''
  },
  {
    id: 16,
    title: 'Headmaster',
    image: 'https://dl.dropboxusercontent.com/u/2188934/thxbro-rankings/student.jpg',
    text: ''
  },
  {
    id: 17,
    title: 'Arch Scientist',
    image: 'https://dl.dropboxusercontent.com/u/2188934/thxbro-rankings/student.jpg',
    text: ''
  },
  {
    id: 18,
    title: 'Super Saiyan',
    image: 'https://dl.dropboxusercontent.com/u/2188934/thxbro-rankings/student.jpg',
    text: ''
  },
  {
    id: 19,
    title: 'Maiar',
    image: 'https://dl.dropboxusercontent.com/u/2188934/thxbro-rankings/student.jpg',
    text: ''
  },
  {
    id: 20,
    title: 'Valar',
    image: 'https://dl.dropboxusercontent.com/u/2188934/thxbro-rankings/student.jpg',
    text: ''
  }
]

export const firebaseRef = new Firebase('https://edgetech.firebaseio.com/')
