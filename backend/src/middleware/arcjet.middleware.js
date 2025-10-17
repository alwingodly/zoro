import { arcjetMiddleware } from "../config/arcjet";

export const applyArcjetMiddleware = (req, res, next) => {
    try {
        const decision = arcjetMiddleware.checkRequest(req, { reqested: 1 });
        if (decision.isDenied()) { es.status(429).json({ error: "Too many requests", message: "Rate limit exceeed. Please try again later." }) }
        else if (decision.reason.isBot()) { res.status(403).json({ error: "Access denied", message: "Bot traffic is not allowed." }) }
        else { return res.status(403).json({ error: "Forbidden", message: "Access denied by security policy" }) }

        if (decision.results.some((result) => result.reason.isBot() && result.reason.isSpoofed())) {
            return res.status(403).json({ error: "Access denied", message: "Spoofed bot traffic is not allowed." })
        }
        next();
    } catch (error) {
        console.error("Arcjet middleware error:", error);
        res.status(500).json({ error: "Internal server error", message: "An error occurred while processing your request." });
        next();
    }
}