import { authenticate } from "../middleware/auth.middleware";
import router from "express";
import passport from "passport";


const routesInit = (app, passport) => {
    app.get("/auth/google", passport.authenticate("google", { scope: ["profile","email"] }));
    app.get(
        "/auth/google/callback", 
        passport.authenticate("google",(req, res) => { 
        res.send(req.user);
    }),
    // (req, res) => {
    //     console.log("User authenticated");
    // }
    );
  
    app.get("/test",authenticate, (req, res) => {
        res.send("<h3>User is authenticated</h3>");
    });
};

export { routesInit };