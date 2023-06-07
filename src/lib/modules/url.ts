export default {
	root: '/',
	login: '/login',
	register: '/register',
	home: '/home',
	cart: '/cart',
	sell: 'sell',
	explore: '/explore',
	settings: '/settings',

	exploreQuery: function (search: string, filter: object) {
		return this.explore + `?search=${search}&filter=${filter}`;
	}
};
