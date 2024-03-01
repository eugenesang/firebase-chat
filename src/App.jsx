import { useState, useEffect } from 'react'

import './App.css';
import Navbar from './components/NavBar'

import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from 'firebase/auth'
import { getFirestore, onSnapshot, collection, addDoc, orderBy, query, serverTimestamp, where } from 'firebase/firestore'

import { auth, app } from '../firebase'

const db = getFirestore(app)


function App() {

  const [user, setUser] = useState(null)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState("")

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("timestamp"))
    const unsubscribe = onSnapshot(q, snapshot => {
      setMessages(snapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      })))
    })
    return unsubscribe
  }, [])


  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        setUser(user)
      } else {
        setUser(null)
      }
    })
  }, [])

  const sendMessage = async () => {
    await addDoc(collection(db, "messages"), {
      uid: user.uid,
      photoURL: user.photoURL,
      displayName: user.displayName,
      text: newMessage,
      timestamp: serverTimestamp()
    })

    setNewMessage("")
  }


  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider()

    try {

      await signInWithPopup(auth, provider)


    } catch (error) {
      console.log(error)
    }
  }

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
  
    try {
      // Trigger Google sign-in using a popup
      const result = await signInWithPopup(auth, provider);
  
      // Extract user information
      const email = result.user.email;
      const name = result.user.displayName || ''; // Use display name if available, otherwise default to empty string
  
      // Check for existing account with the email
      const accountsRef = collection(db, 'accounts');
      const existingAccountQuerySnapshot = await query(accountsRef, where('email', '==', email)).get();
  
      if (existingAccountQuerySnapshot.size > 0) {
        // Existing account found: Handle it accordingly
        // (e.g., redirect to login, pre-fill user profile)
        console.log('Existing account found: ', existingAccountQuerySnapshot.docs[0].data());
      } else {
        // Create a new account document
        const accountDocRef = addDoc(accountsRef, {
          name,
          about: email, // Can add more fields as needed
          email,
          createdAt: serverTimestamp() // Add a creation timestamp
        });
  
        // Update or create the "users" array in the "conversations" collection
        
  
        console.log('Successfully created new account and added user to Firestore');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  return (
    <div className='flex justify-center bg-gray-800 py-10 min-h-screen' >
      {user ? (
      <>
        <Navbar user={user} logout={() => auth.signOut()}  />
        <div>
          <div> Logged in as {user.displayName}</div>
          <input
            value={newMessage}
            onChange={e => setNewMessage(e.target.value)}
          />
          <button className=' bg-white rounded-[10px] hover:bg-blue-400 p-3' onClick={sendMessage}>Send Message</button>

          <div className="flex flex-col gap-5">

            {messages.map(msg => (
              <div key={msg.id} className={`message flex ${msg.data.uid === user.uid ? 'justify-end' : 'justify-start  '}`}>
                <div className={`message flex flex-row p-3 gap-3 rounded-[20px] items-center ${msg.data.uid === user.uid ? ' text-white bg-blue-500' : ' bg-white '}`}>
                  <img className='w-10 h-10 rounded-full' src={msg.data.photoURL} />
                  {msg.data.text}
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
      ) :

        <button onClick={handleGoogleLogin}>Login with Google</button>
      }
    </div>
  )
}

export default App