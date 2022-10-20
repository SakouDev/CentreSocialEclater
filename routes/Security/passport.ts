const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
import { userId } from "../../types/user";

const { User } = require("../../database/connect");

passport.use(
	new JwtStrategy(
		{
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: process.env.JWT_TOKEN_SECRET,
		},
		function (
			jwt_payload: string,
			done: (
				arg0: null| Error,
				arg1: boolean | userId,
				arg2?: { message: string } | undefined
			) => any
		) {
			User.findOne({ id: jwt_payload.sub })
            .then((user: userId) => {
                if (user) {
                    return done(null, user)
                } else {
                    return done(null, false)
                }
            })
            .catch((err: any) => done(err, false));
		}
	)
);
