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
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const util_1 = require("util");
const core_1 = require("@actions/core");
const command_1 = require("@actions/core/lib/command");
const readFileAsync = util_1.promisify(fs_1.readFile);
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const action = core_1.getInput("action");
            const matcherFile = path_1.join(__dirname, "..", ".github", "problem-matcher.json");
            switch (action) {
                case "add":
                    command_1.issueCommand("add-matcher", {}, matcherFile);
                    break;
                case "remove":
                    const fileContents = yield readFileAsync(matcherFile, { encoding: "utf8" });
                    const problemMatcherDocument = JSON.parse(fileContents);
                    const problemMatcher = problemMatcherDocument.problemMatcher[0];
                    command_1.issueCommand("remove-matcher", {
                        owner: problemMatcher.owner,
                    }, "");
                    break;
                default:
                    throw Error(`Unsupported action "${action}"`);
            }
        }
        catch (error) {
            core_1.setFailed(error.message);
            throw error;
        }
    });
}
exports.run = run;
run();
