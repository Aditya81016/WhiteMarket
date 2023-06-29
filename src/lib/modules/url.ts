export default {
	root: '/',
	login: '/login',
	register: '/register',
	profile: '/profile',
	home: '/home',
	cart: '/cart',
	dashboard: '/dashboard',
	explore: '/explore',
	settings: '/settings',
	signout: "/signout",

	exploreQuery: function (search: string, filter: object) {
		return this.explore + `?search=${search}&filter=${filter}`;
	}
};
