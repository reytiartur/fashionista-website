import { initializeApp } from 'firebase/app'
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBZ_M5vTJ1hfRr8NTaXmI0aK7rOrsYMHSk",
    authDomain: "fashionista-99113.firebaseapp.com",
    projectId: "fashionista-99113",
    storageBucket: "fashionista-99113.appspot.com",
    messagingSenderId: "326364003865",
    appId: "1:326364003865:web:4634d19d08becc5043f488"
  };
  
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
    prompt: 'select_account'
  });

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);

export const database = getFirestore();

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const batch = writeBatch(database)
    const collectionRef = collection(database, collectionKey)

    await objectsToAdd.forEach(async (object) => {
        const docRef = doc(collectionRef, object.title.toLowerCase())
        await batch.set(docRef, object)
    })

    await batch.commit()
    console.log('done')
}

export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(database, 'categories')
    const q = query(collectionRef)

    const querySnapshot = await getDocs(q)
    const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
        const { title, items } = docSnapshot.data();
        acc[title.toLowerCase()] = items;
        return acc;
    }, {})

    return categoryMap;
}

export const createUserFromAuth = async (user, additionalInfo = {}) => {
    if(!user) return;

    const userRef = await doc(database, 'users', user.uid);

    const userSnapshot = await getDoc(userRef);

    if(!userSnapshot.exists()) {
        const { displayName, email } = user;
        const createdAt = new Date();

        try {
            await setDoc(userRef, { displayName, email, createdAt, ...additionalInfo })
        } catch (error) {
            console.log('User was not created!', error.message)
        }
    }

    return userSnapshot;
}

export const createAuthUserWithEmail = async (email, password) => {
    if(!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password)
}

export const signInAuthUserWithEmail = async (email, password) => {
    if(!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password)
}

export const signOutUser = async () => await signOut(auth)

