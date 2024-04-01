import { useState } from 'react';
import './firebaseConfig';
import { getDatabase, ref, query, orderByChild, equalTo, push, set, get} from "firebase/database";
import TextField from "./TextField";
import { faUser, faEnvelope, faEyeSlash } from '@fortawesome/fontawesome-free-solid'

function App() {
  const [username, setUsername] = useState(''); 
  const [email, setEmail] = useState(''); 
  const [isEmailValid, setIsEmailValid] = useState(true); 
  const [password, setPassword] = useState(''); 
  const [isPasswordStrong, setIsPasswordStrong] = useState(true); 

  const handleUsername = (e) => {
    setUsername(e.target.value); 
  }

  const handleEmail = (e) => {
    setEmail(e.target.value); 

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);
    setIsEmailValid(isValid);
  }

  const handlePassword = (e) => {
    setPassword(e.target.value); 

    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(password);
    const isLongEnough = password.length >= 8;

    const isPasswordStrong = hasUpperCase && hasLowerCase && hasDigit && hasSpecialChar && isLongEnough;
    setIsPasswordStrong(isPasswordStrong);
  }

  const handleSubmit = async () => {
    if (!username || !email || !password) {
      alert('All fields must be completed.'); 
    }

    else if (!isEmailValid || !isPasswordStrong) {
      alert('Requirements for fields must be completed.'); 
    }

    else {
      const db = getDatabase();
      const userRef = ref (db, 'users');
      const userData = {
        username: username,
        email: email,
        password: password
      };
      const emailQuery = query(userRef, orderByChild('email'), equalTo(email));
    try {
      const snapshot = await get(emailQuery);
      if (snapshot.exists()) {
        alert('Email address already exists. Please use a different email.');
    } else {
        const newUserRef = push(userRef);
        await set(newUserRef, userData);
        alert("New user has been successfully registered.");
        window.location.reload();
    }
    }
    catch (error) {
      alert ("There was an error adding the new user. Try again later.")
      console.error("Error:", error); 
    }
    }

  }

  return (
    <div className="flex justify-center items-center h-screen font-sans">
     <div className="w-2/6 border-slate-300 border-2 h-auto flex flex-col rounded-lg gap-y-3">
        <p className='font-bold p-5 text-center'>User Registration</p>

        <TextField 
          label="Username"
          placeholder="Enter preferred username"
          icon={faUser}
          type="text"
          onChange={handleUsername} 
        />

        <TextField 
          label="Email"
          placeholder="Enter valid email address"
          icon={faEnvelope}
          type="email"
          onChange={handleEmail}
          hasError={!isEmailValid}
          errorMessage={'Email address is not valid.'}
        />

        <TextField 
          label="Password"
          placeholder="Enter strong password"
          icon={faEyeSlash}
          type="password"
          onChange={handlePassword}
          hasError={!isPasswordStrong}
          errorMessage={'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character.'}
        />

        <div className='flex justify-center my-5'>
        <button 
        className='w-1/2 p-2 rounded bg-teal-500 font-bold text-white text-sm cursor-pointer hover:bg-teal-600'
        onClick={handleSubmit}>
          Submit
        </button>
        </div>

    </div>
    </div>
  );
}

export default App;
