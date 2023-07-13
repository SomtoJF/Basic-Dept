import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "./Firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

interface authContext {
	currentUser: any;
	signup: any;
}

const AuthContext = createContext<authContext>({
	currentUser: null,
	signup: null,
});

const useAuth = () => useContext(AuthContext);

function AuthProvider({ children }: any) {
	const [currentUser, setCurrentUser] = useState();
	const signup = async (email: string, password: string) => {
		try {
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);
			const user = userCredential.user;
			return user;
		} catch (error: any) {
			alert(error.message);
			throw new Error(error.message);
		}
	};

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user: any) =>
			setCurrentUser(user)
		);
		console.log(currentUser);
		return unsubscribe;
	}, []);

	const value = {
		currentUser,
		signup,
	};
	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { AuthProvider, useAuth };
