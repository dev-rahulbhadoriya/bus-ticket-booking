const express = require("express");
const router = express.Router();
const multer = require("multer");
const auth = require("../utils/auth");
const userService = require("../services/userService");
const commanService = require("../services/commanService");
const { uploadImage, sendNotification, sendNotificationV1 } = require("../services/firebase");
const { route } = require("./state&districtRouter");

// const filePath = "./uploads/usersImage/";

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, filePath);
//   },
//   filename: (req, file, cb) => {
//     const today = new Date().toISOString();
//     cb(null, `${today}-${file.originalname}`);
//   },
// });

// const fileFilter = (req, file, cb) => {
//   const { mimetype } = file;
//   const mimeTypes = [
//     "image/jpeg",
//     "image/png",
//     "image/gif",
//     "image/webp",
//     "application/x-mpegURL",
//   ];
//   const checkType = mimeTypes.includes(mimetype);
//   if (checkType) {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };

// const upload = multer({
//   storage,
//   limits: {
//     fileSize: 1024 * 1024 * 5,
//   },
//   fileFilter,
// });

const Multer = multer({
  storage: multer.memoryStorage(),
  limits: 1024 * 1024,
});

//total users & active users count
router.get(
  "/app/totalUsers",
  auth.validateAuthToken,
  userService.getTotalUsers
);
router.get(
  "/app/activeUsers",
  auth.validateAuthToken,
  userService.getActiveUsers
);

//number of users by state
router.get(
  "/app/usersByState",
  auth.validateAuthToken,
  userService.getUsersByState
);

// partern web application
router.get("/allusers", auth.validateAuthToken, userService.getUsers);
router.put(
  "/profile/:id",
  auth.validateAuthToken,
  userService.updateUserProfileWebApp
);
router.put(
  "/uploadFile",
  auth.validateAuthToken,
  Multer.single("file"),
  uploadImage,
  userService.uploadfiles
);
router.put(
  "/disableStatus/:id",
  auth.validateAuthToken,
  userService.updateDisableStatus
);
router.post("/notification", sendNotification);
router.get("/sendNotification", sendNotificationV1);
//disable runner
router.put(
  "/disableRunner/:id",
  auth.validateAuthToken,
  userService.updateDisableRunnerById
);

//enable disable partner app profile, bank, village updataion option in app
router.put("/enableProfileUpdate/:id", auth.validateAuthToken, userService.enableProfileUpdate);

//partner android routes
router.post("/app/profile", userService.updateUserProfile);
router.post("/app/activeStatus", userService.updateActiveStatus);
router.get("/app/user", userService.getUserdata),
router.get("/app/userByEmail", userService.getUserDataByEmail);

router.post("/app/profileV1",auth.validateAuthTokenApplication, userService.updateUserProfile);
router.post("/app/activeStatusV1",auth.validateAuthTokenApplication, userService.updateActiveStatus);
router.get("/app/userV1",auth.validateAuthTokenApplication, userService.getUserdata),
router.get("/app/userByEmailV1",auth.validateAuthTokenApplication, userService.getUserDataByEmail);
router.get("/app/getBanner",auth.validateAuthTokenApplication, userService.getBanner);
router.get("/app/getAnnouncement",auth.validateAuthTokenApplication, userService.getAnnouncement);
router.post("/app/getToken", userService.getToken);
// router.post("/app/testing", userService.testing);


//partner app routes with JWT token with V2 version
router.post("/app/profileV2",auth.validateAuthToken, userService.updateUserProfile);
router.post("/app/activeStatusV2",auth.validateAuthToken, userService.updateActiveStatus);
router.get("/app/userV2",auth.validateAuthToken, userService.getUserdata),
router.get("/app/userByEmailV2",auth.validateAuthToken, userService.getUserDataByEmail);
router.get("/app/getBannerV2",auth.validateAuthToken, userService.getBanner);
router.get("/app/getAnnouncementV2",auth.validateAuthToken, userService.getAnnouncement);
router.post("/app/getTokenV2", auth.validateAuthTokenApplication, userService.getToken);



//new api for partner app
//register phone number
router.post("/app/V1/registerPhoneNumber", userService.registerPhoneNumber);
//Register user
router.post("/app/V1/registerUser", userService.registerUser);
//login user
router.post("/app/V1/login", userService.loginUser);
//get app config
router.post("/app/V1/getAppConfig", auth.validateAuthToken, userService.getAppConfig);
//update user profile
router.post("/app/V1/updateUserProfile", auth.validateAuthToken, userService.updateUserProfileV1);
//update user status
router.post("/app/V1/updateUserStatus", auth.validateAuthToken, userService.updateUserStatus);
//get bank details
router.get("/app/V1/getBankDetails", auth.validateAuthToken, userService.getBankDetails);
//update bank details
router.post("/app/V1/updateBankDetails", auth.validateAuthToken, userService.updateBankDetails);
//request for change bank details
router.post("/app/V1/requestBankDetailsUpdate", auth.validateAuthToken, userService.requestBankDetailsUpdate);
//add selected village of user
router.post("/app/V1/addVillages",auth.validateAuthToken, userService.addVillages);
// get selected village data.
router.get("/app/V1/getUserVillages", auth.validateAuthToken, userService.getUserVillages);
//get live data of according to phone number
router.get("/app/V1/getLiveData", auth.validateAuthToken, userService.getLiveData);
// DELETE: DELETE Village by vid
router.delete("/app/V1/removeVillageById/:vid", auth.validateAuthToken, userService.removeVillageById);
// GET: get All notifications.
router.get("/app/V1/getAllNotifications", auth.validateAuthToken, userService.getAllNotifications);
// POST:Add notification from Web App
router.post("/app/V1/addNotification", auth.validateAuthToken, userService.addNotification);
// delete: Delete all notifications...
router.delete("/app/V1/removeNotification/:nId", auth.validateAuthToken, userService.removeNotification);
// PUT: UPDATE Notification by id... 
router.put("/app/V1/updateNotification", auth.validateAuthToken, userService.updateNotification);
// GET: Generate manager code 
router.get("/app/V1/generateManagerCode", auth.validateAuthToken, userService.generateManagerCode);
// POST: Join A Team.
router.post("/app/V1/joinATeam", auth.validateAuthToken, userService.joinATeam);
// GET: Get User Manager. 
router.get("/app/V1/getUserManager", auth.validateAuthToken, userService.getUserManager);

router.get("/app/V1/getUserTeamMembers", auth.validateAuthToken, userService.getUserTeamMembers);

//get bank details by IFSC code
router.get("/app/V1/getBankDetailsByIFSC", auth.validateAuthToken,   userService.getBankDetailsByIFSC);


// set user home village
router.post("/app/V1/setUserHomeVillage", auth.validateAuthToken, userService.setUserHomeVillage);

module.exports = router;
                                                                                                                        