export interface UserInterface {
	name: string;
	email: string;
	age: number;
	address?: string;
	cart: string[];
	wishlist?: string[];
	message: string[];
}

export interface RegisterInterface {
	email: string;
	password: string;
	fName: string;
	lName: string;
	age: number;
	address?: string;
}
