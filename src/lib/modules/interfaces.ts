export interface UserInterface {
	name: string;
	email: string;
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
	address?: string;
}
