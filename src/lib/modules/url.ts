export default {
	root: '/',
	login: '/login',
	register: '/register',
	home: '/home',
	explore: '/explore',
	about: '/about',
	seller: 'items/add',

	exploreQuery: function (search: string, filter: object) {
		return this.explore + `?search=${search}&filter=${filter}`;
	}
};
