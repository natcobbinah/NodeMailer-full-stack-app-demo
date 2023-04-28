/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./config/config.js":
/*!**************************!*\
  !*** ./config/config.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_0__);\n\r\nconst CURRENT_WORKING_DIRECTORY = process.cwd();\r\n(__webpack_require__(/*! dotenv */ \"dotenv\").config)({\r\n    path: path__WEBPACK_IMPORTED_MODULE_0___default().join(CURRENT_WORKING_DIRECTORY, './server/env/.env')\r\n})\r\n\r\nconst config = {\r\n    port: process.env.PORT,\r\n    EMAIL_PASSWORD: process.env.EMAIL_APP_PASSWORD,\r\n    USER_EMAIL: process.env.USER_EMAIL\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (config);\n\n//# sourceURL=webpack://nodemailer-demo/./config/config.js?");

/***/ }),

/***/ "./server/controllers/email.controller.js":
/*!************************************************!*\
  !*** ./server/controllers/email.controller.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _services_smtpService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/smtpService */ \"./server/services/smtpService.js\");\n/* harmony import */ var _config_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../config/config */ \"./config/config.js\");\nconst path = __webpack_require__(/*! path */ \"path\")\r\n;\r\nconst fs = __webpack_require__(/*! fs */ \"fs\")\r\nconst { IncomingForm } = __webpack_require__(/*! formidable */ \"formidable\");\r\n\r\n\r\nconst sendEmail = async (req, res) => {\r\n    //console.log(req.body)\r\n\r\n    let options = {\r\n        keepExtensions: true,\r\n        multiples: true\r\n    }\r\n\r\n    let form = new IncomingForm(options);\r\n    form.parse(req, (err, fields, files) => {\r\n        if (err) {\r\n            return res.status(400).json({\r\n                error: \"form data not valid\"\r\n            })\r\n        }\r\n\r\n        //console.log(files)\r\n        //console.log(fields)\r\n        let fileData = [];\r\n        let attachmentData = [];\r\n        if (files) {\r\n            for (const [key, value] of Object.entries(files)) {\r\n                fileData.push(JSON.stringify(value))\r\n            }\r\n\r\n            fileData.forEach((fileObj) => {\r\n                let parsedFileObject = JSON.parse(fileObj);\r\n                attachmentData.push({\r\n                    filename: JSON.stringify(parsedFileObject.originalFilename),\r\n                    content: fs.createReadStream(parsedFileObject.filepath),\r\n                    contentType: JSON.stringify(parsedFileObject.mimetype)\r\n                })\r\n            })\r\n        }\r\n\r\n        console.log(fields)\r\n        let fieldData = [];\r\n        for(const [key,value] of Object.entries(fields)){\r\n            fieldData.push(value[1])\r\n        }\r\n    \r\n        //console.log(fileData)\r\n\r\n        try {\r\n            _services_smtpService__WEBPACK_IMPORTED_MODULE_0__[\"default\"].verify((error, progress) => {\r\n                if (error) {\r\n                    console.log(error)\r\n                } else {\r\n                    console.log(\"Server is ready to take our messages\")\r\n                }\r\n            })\r\n\r\n            let  mailOptions = {\r\n                from: fieldData[1],\r\n                to: _config_config__WEBPACK_IMPORTED_MODULE_1__[\"default\"].USER_EMAIL,\r\n                subject: fieldData[2],\r\n                html: `\r\n                    Hello, I am ${fieldData[0]}\r\n                    <p>${fieldData[3]}</p>\r\n                    <p>Kind Regards</p>\r\n                    <p>${fieldData[0]}</p>\r\n                `,\r\n                attachments : attachmentData\r\n              };\r\n\r\n            _services_smtpService__WEBPACK_IMPORTED_MODULE_0__[\"default\"].sendMail(mailOptions, (error, info) => {\r\n                if(error){\r\n                    return res.status(400).json({\r\n                        error: \"Error sending email, try again later\"\r\n                    })\r\n                }else{\r\n                    console.log(\"Email send:\" + info.response)\r\n                    return res.status(200).json({\r\n                        message: \"Email sent successfully\"\r\n                    })\r\n                }\r\n            })\r\n\r\n\r\n        } catch (error) {\r\n            return res.status(400).json({\r\n                error: \"Sending email error\"\r\n            })\r\n        }\r\n    });\r\n\r\n\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({ sendEmail });\n\n//# sourceURL=webpack://nodemailer-demo/./server/controllers/email.controller.js?");

/***/ }),

/***/ "./server/routes/email.route.js":
/*!**************************************!*\
  !*** ./server/routes/email.route.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _controllers_email_controller_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../controllers/email.controller.js */ \"./server/controllers/email.controller.js\");\nconst express = __webpack_require__(/*! express */ \"express\")\r\nconst router = express.Router()\r\n;\r\n\r\nrouter.route('/api/sendEmail')\r\n    .post(_controllers_email_controller_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].sendEmail);\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (router);\n\n//# sourceURL=webpack://nodemailer-demo/./server/routes/email.route.js?");

/***/ }),

/***/ "./server/server.js":
/*!**************************!*\
  !*** ./server/server.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _config_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../config/config */ \"./config/config.js\");\n/* harmony import */ var _routes_email_route__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./routes/email.route */ \"./server/routes/email.route.js\");\nconst express = __webpack_require__(/*! express */ \"express\");\r\nconst bodyParser = __webpack_require__(/*! body-parser */ \"body-parser\")\r\nconst cors = __webpack_require__(/*! cors */ \"cors\")\r\n;\r\nconst CURRENT_WORKING_DIRECTORY = process.cwd();\r\n\r\n\r\n\r\nconst app = express();\r\napp.use(bodyParser.json())\r\napp.use(bodyParser.urlencoded({ extended: true }))\r\napp.use(cors())\r\n\r\napp.use('/dist', express.static(path__WEBPACK_IMPORTED_MODULE_0___default().join(CURRENT_WORKING_DIRECTORY, '/dist')))\r\napp.use('/client/assets', express.static(path__WEBPACK_IMPORTED_MODULE_0___default().join(CURRENT_WORKING_DIRECTORY, '/client/assets')))\r\n\r\napp.get('/', (req, res) => {\r\n    res.status(200).sendFile(path__WEBPACK_IMPORTED_MODULE_0___default().join(CURRENT_WORKING_DIRECTORY, '/client/index.html'));\r\n})\r\n\r\n//emailRoute\r\napp.use('/', _routes_email_route__WEBPACK_IMPORTED_MODULE_2__[\"default\"])\r\n\r\napp.listen(_config_config__WEBPACK_IMPORTED_MODULE_1__[\"default\"].port, (err) => {\r\n    if(err){\r\n        console.log(err)\r\n    }\r\n    console.log(\"Server started on port %s\", _config_config__WEBPACK_IMPORTED_MODULE_1__[\"default\"].port)\r\n    console.log(\"Nodemailer app is available on  http://localhost:%d\", _config_config__WEBPACK_IMPORTED_MODULE_1__[\"default\"].port)\r\n})\r\n\r\n\r\n\r\n\r\n\r\n\n\n//# sourceURL=webpack://nodemailer-demo/./server/server.js?");

/***/ }),

/***/ "./server/services/smtpService.js":
/*!****************************************!*\
  !*** ./server/services/smtpService.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _config_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../config/config */ \"./config/config.js\");\nconst nodemailer = __webpack_require__(/*! nodemailer */ \"nodemailer\")\r\n;\r\n\r\nlet smtpTransport = nodemailer.createTransport({\r\n    service: 'gmail',\r\n    host: \"smtp.gmail.com\",\r\n    port: 587,\r\n    secure: false, // upgrade later with STARTTLS\r\n    auth: {\r\n      user: _config_config__WEBPACK_IMPORTED_MODULE_0__[\"default\"].USER_EMAIL,\r\n      pass: _config_config__WEBPACK_IMPORTED_MODULE_0__[\"default\"].EMAIL_PASSWORD,\r\n    },\r\n    tls: {\r\n        // do not fail on invalid certs\r\n        rejectUnauthorized: false,\r\n      },\r\n  });\r\n\r\n  /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (smtpTransport);\n\n//# sourceURL=webpack://nodemailer-demo/./server/services/smtpService.js?");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("body-parser");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("cors");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("dotenv");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("express");

/***/ }),

/***/ "formidable":
/*!*****************************!*\
  !*** external "formidable" ***!
  \*****************************/
/***/ ((module) => {

module.exports = require("formidable");

/***/ }),

/***/ "nodemailer":
/*!*****************************!*\
  !*** external "nodemailer" ***!
  \*****************************/
/***/ ((module) => {

module.exports = require("nodemailer");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./server/server.js");
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;