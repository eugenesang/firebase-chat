
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';

import { app } from "../../firebase.js"

const db = getFirestore(app);

async function sendMessage(user, message, conversationId, callback) {
    try {
        // Create a new message document
        const messagesCollection = collection(db, 'messages');
        const newMessageDoc = await addDoc(messagesCollection, {
            uid: user.uid,
            photoURL: user.photoURL,
            displayName: user.displayName,
            text: message,
            conversation: conversationId,
            timestamp: serverTimestamp()
        });

        console.log('Message sent:', newMessageDoc.id);

        // If a callback function is provided, invoke it with the new message document
        if (callback) {
            callback();
        }
    } catch (error) {
        console.error('Error sending message:', error);
    }
}

export default sendMessage;