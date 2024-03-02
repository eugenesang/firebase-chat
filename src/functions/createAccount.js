import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { getFirestore, collection, addDoc, serverTimestamp, query, where, getDocs, doc } from 'firebase/firestore'

import { auth, app } from '../../firebase.js';

const db = getFirestore(app)

async function createAccount() {
    try {
        const provider = new GoogleAuthProvider()
        const res = await signInWithPopup(auth, provider)
        const user = res.user;

        const { displayName: name, email } = user;

        // Check if the user with the given email already exists in Firestore
        const accountsCollection = collection(db, 'accounts');
        const q = query(accountsCollection, where('email', '==', email));
        const querySnapshot = await getDocs(q);
        var userId;

        if (querySnapshot.empty) {
            // If the user does not exist, create the account
            const newAccountDoc = await addDoc(accountsCollection, {
                name: name,
                email: email,
                createdAt: serverTimestamp(),
                about: "Hey there, I am using Jabber Chat!",
                profilePhoto: user.photoURL,
                contacts: [
                    { email, name: `${name} (Me)`, createdAt: new Date().toISOString() }
                ],
                groups: [],
                chats:[],
                lastSeen: new Date().toISOString(),
                online: true,

            });

            userId = newAccountDoc.path; // Use the reference to the account record as userId
        
            console.log('Account created:', newAccountDoc);
        } else {
            // If the user already exists, log the account to the console
            querySnapshot.forEach((doc) => {
                console.log('Account found:', doc.id, doc.data());
            });

            userId = doc(accountsCollection, querySnapshot[0].id).path; // Use the reference to the account record as userId
        }

        // Check if the user is in any conversations
        const conversationsCollection = collection(db, 'conversations');
        const conversationQuery = query(conversationsCollection, where('users', 'array-contains', userId));
        const conversationSnapshot = await getDocs(conversationQuery);

        if (conversationSnapshot.empty) {
            // If the user is not in any conversations, create a conversation with one user (self)
            const newConversationDoc = await addDoc(conversationsCollection, {
                users: [userId],
                userDetails: [
                    {
                        userId: userId,
                        name: name,
                        img: user.photoURL,
                        email: email
                    }
                ],
                createdAt: serverTimestamp(),
                type: "single",
                lastMessage: {
                    text: "Welcome to Jabber Chat!",
                    createdAt: new Date().toISOString(),
                    sender: 'system',
                    read: false
                }
            });

            console.log('Conversation created:', newConversationDoc.id);
        } else {
            // If the user is in conversations, log the conversation details to the console
            conversationSnapshot.forEach((doc) => {
                console.log('User is in conversation:', doc.id, doc.data());
            });
        }

    } catch (error) {
        console.error(error);
    }
}

export default createAccount;