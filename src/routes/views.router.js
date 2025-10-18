import { Router } from "express";
import {
  renderHomePage,
  renderUsersPage,
  renderPetsPage,
  renderMocksPage,
  renderAdoptionsPage,
} from "../controllers/views.controller.js";

const router = Router();

// Page routes
router.get("/", renderHomePage);
router.get("/users", renderUsersPage);
router.get("/pets", renderPetsPage);
router.get("/adoptions", renderAdoptionsPage);
router.get("/mocks", renderMocksPage);

router.get("/register", (req, res) => {
  res.render("register", { title: "Register" });
});

router.get("/login", (req, res) => {
  res.render("login", { title: "Login" });
});

router.get("/profile", (req, res) => {
  if (!req.session.user) {
    return res.redirect("/login");
  }
  res.render("profile", { title: "Profile", user: req.session.user });
});

router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).render('error', { message: 'Could not log out.' });
        }
        res.redirect('/login');
    });
});

export { router };