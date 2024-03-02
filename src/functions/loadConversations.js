
import { getFirestore, collection, query, where, getDocs, doc } from 'firebase/firestore';

import { app } from "../../firebase.js"

const db = getFirestore(app);

async function loadConversations(email){
    const accountsCollection = collection(db, 'accounts');
        const q = query(accountsCollection, where('email', '==', email));
        const querySnapshot = await getDocs(q);
        var userId;

        if (querySnapshot.empty) {
            // If the user does not exist, return an empty array
            return [];
        } else {
            console.log(querySnapshot);
            userId = doc(accountsCollection, querySnapshot.docs[0].id).path;
            console.log(userId);
        }
        

        const conversationsCollection = collection(db, 'conversations');
        const conversationQuery = query(conversationsCollection, where('users', 'array-contains', userId));
        const conversationSnapshot = await getDocs(conversationQuery);

        const conversations = conversationSnapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            }
        });

        return conversations;
    
}
export default loadConversations;