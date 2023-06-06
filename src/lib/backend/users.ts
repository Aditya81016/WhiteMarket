import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '$lib/modules/firebase';
import {
	collection,
	doc,
	getDocs,
	query,
	setDoc,
	where,
	type WhereFilterOp
} from 'firebase/firestore';
import { db } from '$lib/modules/firebase';
import type { RegisterInterface } from '$lib/modules/interfaces';

const UserDB = collection(db, 'users');

export async function createUser(registerData: RegisterInterface) {
	const { fName, lName, email, password, address } = registerData;
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
			address: address
		});

		console.log('User created and data stored successfully');
		return user;
	} catch (error) {
		console.error('Error creating user and storing data:', error);
		return null;
	}
}

export async function findUser(field: string, relation: WhereFilterOp, value: string) {
	const q = query(UserDB, where(field, relation, value));
	const users = (await getDocs(q)).docs;
	return users;
}
