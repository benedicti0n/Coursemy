"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const connectDb_1 = __importDefault(require("./db/connectDb"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const course_routes_1 = __importDefault(require("./routes/course.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT;
// Use CORS middleware once
app.use((0, cors_1.default)({
    origin: process.env.NODE_ENV === 'production'
        ? 'https://coursemy-phi.vercel.app' // Frontend URL
        : 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
(0, connectDb_1.default)();
app.use("/api/v1/auth", auth_routes_1.default);
app.use("/api/v1/user", user_routes_1.default);
app.use("/api/v1/course", course_routes_1.default);
app.get("/", (req, res) => {
    res.send("hello");
});
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
//# sourceMappingURL=index.js.map