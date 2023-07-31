import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from "next/router";
const firebaseConfig = {
  apiKey: "AIzaSyBujr-HqmiLG6de1x2epreoSasMhyIiOjA",
  authDomain: "pokedexweb-f6400.firebaseapp.com",
  databaseURL: "https://pokedexweb-f6400-default-rtdb.firebaseio.com",
  projectId: "pokedexweb-f6400",
  storageBucket: "pokedexweb-f6400.appspot.com",
  messagingSenderId: "378712720138",
  appId: "1:378712720138:web:1a78ef5dfa0039bcb7b0f3",
  measurementId: "G-9968912TVT"
};
function Home() {
  const app = initializeApp(firebaseConfig);
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  if (loading) {666
    return <div>Loading...</div>;
  }

  if (user) {
    router.push("/");
    return <div>Loading...</div>;
  }

  const signIn = async () => {
    const result = await signInWithPopup(auth, provider);
    console.log(result.user);
  };
  return (
    <div className="text-center flex flex-col gap-4 items-center">
      <div>Please sign in to continue</div>
      <button onClick={signIn}>
        <div className="bg-blue-600 text-white rounded-md p-2 w-48">
          Sign In
        </div>
      </button>
    </div>
  );
}

export default Home;
