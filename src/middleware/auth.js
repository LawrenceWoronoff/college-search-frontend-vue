export default function auth({ next, router }) {        //Middleware rule auth
    if (!localStorage.getItem('authenticated')) {       // If the user didn't login, redirect to login
        return router.push({ name: 'login' });
    }

    return next();
}