/**
 * Created by patrick on 16/2/4.
 */
module.exports = [
    {
        name: 'Dashboard',
        link: '/',
        icon: 'fa-home',
    },
    {
        name: 'ME',
        link: '/user',
        icon: 'fa-user',
        child: [
            {
                name: 'api',
                link: '/api/new',
                icon: 'fa-circle-o',
            },
            {
                name: 'APIs',
                link: '/api',
                icon: 'fa-circle-o'
            }
        ]
    },
    {
        name: 'Team',
        link: '/team',
        icon: 'fa-cogs',
    }
];