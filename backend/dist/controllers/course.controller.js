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
exports.buyCourse = exports.fetchCourseDetails = exports.getAllCourses = exports.createCourse = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const course_model_1 = __importDefault(require("../models/course.model"));
const cloudinary_1 = __importDefault(require("../utils/cloudinary"));
const createCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const formData = req.body;
        const bannerPicture = req.file;
        const userId = req._id;
        const content = JSON.parse(formData.content);
        const result = yield cloudinary_1.default.uploader.upload(bannerPicture.path);
        const bannerPictureUrl = result.secure_url;
        const course = new course_model_1.default({
            name: formData.name,
            bannerPicture: bannerPictureUrl,
            description: formData.description,
            price: formData.price,
            content: content,
            createdBy: userId,
        });
        console.log(course);
        yield course.save();
        console.log("Course created successfully");
        yield user_model_1.default.findByIdAndUpdate(userId, {
            $push: {
                coursesCreated: course._id
            }
        });
        res.status(200).json({ message: "Course created successfully" });
    }
    catch (error) {
        console.error(error);
    }
});
exports.createCourse = createCourse;
const getAllCourses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allCourses = yield course_model_1.default.find({}, "_id name bannerPicture description price totalSold");
        res.status(200).json(allCourses);
    }
    catch (error) {
        console.error(error);
    }
});
exports.getAllCourses = getAllCourses;
const fetchCourseDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { courseId } = req.params;
    try {
        const course = yield course_model_1.default.findById(courseId).populate('createdBy', 'name');
        if (!course) {
            res.status(404).json({ message: "Couldn't fetch course details" });
        }
        res.status(200).send(course);
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server error" });
    }
});
exports.fetchCourseDetails = fetchCourseDetails;
const buyCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req._id;
        const { courseId } = req.body;
        console.log(courseId);
        const [course, user] = yield Promise.all([
            course_model_1.default.findById(courseId).lean(),
            user_model_1.default.findById(userId).lean()
        ]);
        if (!course) {
            res.status(404).json({ message: "Course not found." });
            return;
        }
        if (!user) {
            res.status(404).json({ message: "User not found." });
            return;
        }
        if (user.coursesBought.some((boughtCourseId) => boughtCourseId.toString() === courseId)) {
            res.status(400).json({ message: "Course already purchased." });
            return;
        }
        const coursePrice = course === null || course === void 0 ? void 0 : course.price;
        const userBalance = user === null || user === void 0 ? void 0 : user.wallet;
        if (userBalance < coursePrice) {
            res.status(403).json({ message: "Insufficient balance." });
            return;
        }
        yield user_model_1.default.findByIdAndUpdate(userId, {
            $push: { coursesBought: courseId },
            $inc: { wallet: -coursePrice },
        }, { new: true });
        res.status(200).json({ message: "Course bought successfully." });
    }
    catch (error) {
        console.error("Error buying course:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.buyCourse = buyCourse;
//# sourceMappingURL=course.controller.js.map