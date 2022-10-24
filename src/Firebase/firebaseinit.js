import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage";
import {getAuth} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyAagtC7p6Vf-FetYabI3Hm3tR90SYxVki0",
  authDomain: "coffeeproj-3cee3.firebaseapp.com",
  projectId: "coffeeproj-3cee3",
  storageBucket: "coffeeproj-3cee3.appspot.com",
  messagingSenderId: "273465742720",
  appId: "1:273465742720:web:68b5dabb7a27778b881d65"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);

export {auth, storage, app}
