"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addMoneyToWallet = exports.deleteAccount = exports.handleEditProfile = exports.fetchBoughtCourses = exports.becomeCreator = exports.fetchProfileDetails = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const user_model_1 = __importDefault(require("../models/user.model"));
const course_model_1 = __importDefault(require("../models/course.model"));
const fetchProfileDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req._id;
        const user = yield user_model_1.default.findById(userId, 'profilePicture name username email role coursesBought coursesCreated wallet')
            .populate({
            path: 'coursesCreated',
            model: course_model_1.default,
            select: 'name description price bannerPicture totalSold'
        });
        if (!user) {
            res.status(400).json({ message: "User details couldn't be fetched" });
            return;
        }
        res.json(user);
    }
    catch (error) {
        console.error('Error fetching profile details:', error);
        res.status(500).json({ message: 'Error fetching details' });
    }
});
exports.fetchProfileDetails = fetchProfileDetails;
const becomeCreator = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req._id;
        const response = yield user_model_1.default.findByIdAndUpdate(userId, { role: "creator" });
        if (!response) {
            res.status(409).json({ mesage: "Error changing role" });
            return;
        }
        res.status(200).json({ message: "Role changes to creator." });
    }
    catch (error) {
        res.status(500).json({ message: "Error changing the data" });
    }
});
exports.becomeCreator = becomeCreator;
const fetchBoughtCourses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req._id;
    try {
        const response = yield user_model_1.default.findById(userId, "coursesBought").populate({
            path: "coursesBought",
            model: course_model_1.default,
            select: "_id bannerPicture name description totalSold price"
        });
        if (!response) {
            res.status(403).json({ message: "Couldnt find the courses" });
        }
        res.status(200).json(response);
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.fetchBoughtCourses = fetchBoughtCourses;
const handleEditProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req._id;
        const newName = req.body.data.name;
        const newUsername = req.body.data.username;
        const user = yield user_model_1.default.findByIdAndUpdate(userId, {
            name: newName,
            username: newUsername
        });
        if (!user) {
            res.status(403).json({ message: "Couldnt change profile details" });
        }
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.handleEditProfile = handleEditProfile;
const deleteAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req._id;
        const session = yield mongoose_1.default.startSession();
        try {
            session.startTransaction();
            const user = yield user_model_1.default.findById(userId).session(session);
            if (!user) {
                yield session.abortTransaction();
                res.status(403).json({ message: "User not found" });
            }
            yield course_model_1.default.deleteMany({ createdBy: userId }).session(session);
            yield user_model_1.default.deleteOne({ _id: userId }).session(session);
            yield session.commitTransaction();
            res.status(200).json({ message: "User and Courses created by user deleted successfully" });
        }
        catch (error) {
        }
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.deleteAccount = deleteAccount;
const addMoneyToWallet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req._id;
        const amountToAdd = req.body.moneyToAdd;
        const user = yield user_model_1.default.findByIdAndUpdate(userId, { $inc: { wallet: amountToAdd } }, { new: true });
        if (!user) {
            res.status(403).json({ message: "User not found" });
        }
        res.status(200).json({ message: "Money added sucessfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.addMoneyToWallet = addMoneyToWallet;
//# sourceMappingURL=profile.controller.js.map