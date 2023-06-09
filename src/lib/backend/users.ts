import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	updateProfile,
	signInWithPopup,
	GoogleAuthProvider
} from 'firebase/auth';
import { auth } from '$lib/modules/firebase';
import {
	collection,
	doc,
	getDocs,
	query,
	setDoc,
	updateDoc,
	where,
	type WhereFilterOp
} from 'firebase/firestore';
import { db } from '$lib/modules/firebase';
import type { RegisterInterface } from '$lib/modules/interfaces';
import { onSnapshot } from 'firebase/firestore';

const UserDB = collection(db, 'users');
const provider = new GoogleAuthProvider();

export async function createUser(registerData: RegisterInterface) {
	const { fName, lName, email, password } = registerData;
	try {
		// Create the user in Firebase Authentication
		const userCredential = await createUserWithEmailAndPassword(auth, email, password);
		const user = userCredential.user;

		await updateProfile(user, {
			displayName: fName + ' ' + lName
		});

		// Store additional user data in Firestore
		const userDoc = doc(UserDB, user.uid);
		await setDoc(userDoc, {
			fName: fName,
			lName: lName,
			email: user.email,
			plan: 'Basic'
		});

		return user;
	} catch (error: any) {
		const code = error.code.replace('auth/', '').replaceAll('-', ' ');
		return code;
	}
}

export async function signInUser(email: string, password: string) {
	try {
		const userCredential = await signInWithEmailAndPassword(auth, email, password);
		const user = userCredential.user;

		return user;
	} catch (error: any) {
		const code = error.code.replace('auth/', '').replaceAll('-', ' ');
		return code;
	}
}

export async function signOutUser() {
	try {
		const response = await signOut(auth);
		return response;
	} catch (error: any) {
		console.dir(error);
	}
}

export async function findUser(field: string, relation: WhereFilterOp, value: string) {
	const q = query(UserDB, where(field, relation, value));
	const users = (await getDocs(q)).docs;
	return users;
}

export async function signUpWithGoogle() {
	const userCredential = await signInWithPopup(auth, provider);
	const user = userCredential.user;

	const foundUsers = await findUser('email', '==', String(user.email));
	if (foundUsers.length === 0) {
		const userDoc = doc(UserDB, user.uid);
		const nameArr = user.displayName?.split(' ') || [];
		const fName = nameArr[0];
		nameArr[0] = '';
		const lName = nameArr.join(' ');
		await setDoc(userDoc, {
			fName: fName,
			lName: lName,
			email: user.email,
			plan: 'Basic'
		});
	}
}

export async function getUserData() {
	const user = auth.currentUser;
	const email = String(user?.email);

	const response = await findUser('email', '==', email);
	const userData = response[0]?.data();

	return userData;
}

export async function updateUserData(updateKeys: object) {
	await updateDoc(doc(db, 'users', String(auth?.currentUser?.uid)), updateKeys);
	return true;
}
