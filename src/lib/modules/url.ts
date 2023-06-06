export default {
	root: '/',
	auth: '/auth',
	register: '/auth/register',
	home: '/home',
	explore: '/explore',
	about: '/about',
	seller: 'items/add',

	exploreQuery: function (search: string, filter: object) {
		return this.explore + `?search=${search}&filter=${filter}`;
	}
};
