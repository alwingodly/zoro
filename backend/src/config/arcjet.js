import arcjet, { tokenBucket, shield, detectBot } from "arcjet";
import { ENV } from "./env";

export const arcjetMiddleware = arcjet({
    key: ENV.ARCJET_KEY,
    characteristics: ["ip.src"],
    rules: [
        shield({
            mode: "LIVE",
        }),
        detectBot({
            action: "LIVE",
            allow: ["CATEGORY:ACADEMIC"
                , "CATEGORY:ADVERTISING"
                , "CATEGORY:AI"
                , "CATEGORY:AMAZON"
                , "CATEGORY:APPLE"
                , "CATEGORY:ARCHIVE"
                , "CATEGORY:FEEDFETCHER"
                , "CATEGORY:GOOGLE"
                , "CATEGORY:META"
                , "CATEGORY:MICROSOFT"
                , "CATEGORY:MONITOR"
                , "CATEGORY:OPTIMIZER"
                , "CATEGORY:PREVIEW"
                , "CATEGORY:PROGRAMMATIC"
                , "CATEGORY:SEARCH_ENGINE"
                , "CATEGORY:SLACK"
                , "CATEGORY:SOCIAL"
                , "CATEGORY:TOOL"
                , "CATEGORY:UNKNOWN"
                , "CATEGORY:VERCEL"
                , "CATEGORY:WEBHOOK"
                , "CATEGORY:YAHOO"],
        }),

        tokenBucket({
            mode: "LIVE",
            tokensPerInterval: 100,
            refillRate: 10,
            interval: 10,
            capacity: 15,
        }),
    ],
});

export const rateLimiter = tokenBucket({
    tokensPerInterval: 100,
    interval: "hour",
    getUserId: (req) => {
        return req.user ? req.user.id : req.ip; // Fallback to IP if user not authenticated
    },
    onLimitReached: (req, res) => {
        res.status(429).json({ message: "Too many requests, please try again later." });
    },
});
