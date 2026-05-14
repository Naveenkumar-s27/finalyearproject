import { createRootRoute, createRoute, createRouter, Outlet, redirect } from "@tanstack/react-router";

import WelcomePage  from "./pages/WelcomePage";
import LoginPage    from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Home         from "./pages/Home";
import ShopPage     from "./pages/ShopPage";
import CheckoutPage from "./pages/CheckoutPage";

// Auth guard: if not logged in, redirect to /login
const requireAuth = () => {
  const session = localStorage.getItem("vmart_session");
  if (!session) throw redirect({ to: "/login" });
};

const rootRoute = createRootRoute({ component: () => <Outlet /> });

// Public routes
const welcomeRoute  = createRoute({ path: "/",         component: WelcomePage,  getParentRoute: () => rootRoute });
const loginRoute    = createRoute({ path: "/login",    component: LoginPage,    getParentRoute: () => rootRoute });
const registerRoute = createRoute({ path: "/register", component: RegisterPage, getParentRoute: () => rootRoute });

// Protected routes (require login)
const homeRoute = createRoute({
  path: "/home", component: Home, getParentRoute: () => rootRoute,
  beforeLoad: requireAuth,
});

const shopRoute = createRoute({
  path: "/shop", component: ShopPage, getParentRoute: () => rootRoute,
  beforeLoad: requireAuth,
  validateSearch: (s) => ({ q: s.q ? String(s.q) : "" }),
});

const checkoutRoute = createRoute({
  path: "/checkout", component: CheckoutPage, getParentRoute: () => rootRoute,
  beforeLoad: requireAuth,
});

export const router = createRouter({
  routeTree: rootRoute.addChildren([
    welcomeRoute, loginRoute, registerRoute,
    homeRoute, shopRoute, checkoutRoute,
  ]),
});