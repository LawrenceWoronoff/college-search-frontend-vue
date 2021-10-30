import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

import auth from '../middleware/auth';


Vue.use(VueRouter)

//  =========  Main Part of router ========= //
const routes = [
  {
    path: '/',        // Homepage Router
    name: 'home',
    component: Home
  },
  {
    path: '/login',    // SignIn Router
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/signup',    // Signup Router
    name: 'signup',
    component: () => import( '../views/Signup.vue')
  },
  {
    path: '/card',     // Card List View Router
    name: 'card',
    component: () => import('../views/Card.vue'),
    meta: {
    }
  },
  {
    path: '/like',     // Card List View Router
    name: 'like',
    component: () => import('../views/Like.vue'),
    meta: {
    }
  },
  {
    path : '/college/:college_id?',   // College Detail View Router
    name : 'college',
    component: () => import('../views/College.vue'),
    meta: {
      // middleware: [auth],
    }
  }
]

//  =========  ================ ========= //

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

// Creates a `nextMiddleware()` function which not only
// runs the default `next()` callback but also triggers
// the subsequent Middleware function.
function nextFactory(context, middleware, index) {
  const subsequentMiddleware = middleware[index];
  // If no subsequent Middleware exists,
  // the default `next()` callback is returned.
  if (!subsequentMiddleware) return context.next;

  return (...parameters) => {
    // Run the default Vue Router `next()` callback first.
    context.next(...parameters);
    // Than run the subsequent Middleware with a new
    // `nextMiddleware()` callback.
    const nextMiddleware = nextFactory(context, middleware, index + 1);
    subsequentMiddleware({ ...context, next: nextMiddleware });
  };
}

router.beforeEach((to, from, next) => {
  if (to.meta.middleware) {
    const middleware = Array.isArray(to.meta.middleware)
      ? to.meta.middleware
      : [to.meta.middleware];

    const context = {
      from,
      next,
      router,
      to,
    };
    const nextMiddleware = nextFactory(context, middleware, 1);

    return middleware[0]({ ...context, next: nextMiddleware });
  }

  return next();
});

export default router;
