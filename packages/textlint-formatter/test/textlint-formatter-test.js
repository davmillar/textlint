// LICENSE : MIT
"use strict";
import { createFormatter } from "../src/textlint-formatter";

var path = require("path");
import * as assert from "assert";

describe("textlint-formatter-test", function() {
    describe("createFormatter", function() {
        it("should return formatter function", function() {
            var formatter = createFormatter({
                formatterName: "stylish"
            });
            assert(typeof formatter === "function");
        });
        context("formatter", function() {
            it("should return output text", function() {
                var formatter = createFormatter({
                    formatterName: "stylish"
                });
                var output = formatter([
                    {
                        filePath: "./myfile.js",
                        messages: [
                            {
                                ruleId: "semi",
                                line: 1,
                                column: 23,
                                message: "Expected a semicolon."
                            }
                        ]
                    }
                ]);
                assert(output.length > 0);
            });
        });
        it("run all formatter", function() {
            var formatterNames = [
                "checkstyle",
                "compact",
                "jslint-xml",
                "junit",
                "pretty-error",
                "stylish",
                "tap",
                "json"
            ];
            formatterNames.forEach(function(name) {
                var formatter = createFormatter({
                    formatterName: name
                });
                const ckjFile = path.join(__dirname, "./fixtures", "ckj.md");
                var output = formatter([
                    {
                        filePath: __dirname + "/fixtures/myfile.js",
                        messages: [
                            {
                                ruleId: "semi",
                                line: 1,
                                column: 1,
                                message: "0 pattern."
                            },
                            {
                                ruleId: "semi",
                                line: 2,
                                column: 26,
                                message: "Expected a semicolon."
                            },
                            {
                                ruleId: "semi",
                                line: 1,
                                column: 21,
                                message: "Expected a semicolon."
                            },
                            {
                                ruleId: "semi",
                                line: 2,
                                column: 26,
                                message: "Expected a semicolon."
                            }
                        ]
                    },
                    {
                        filePath: ckjFile,
                        messages: [
                            {
                                message: "Unexpected !!!.",
                                severity: 2,
                                line: 2,
                                column: 16,
                                ruleId: "foo",
                                fix: {
                                    range: [40, 45],
                                    text: "fixed 1"
                                }
                            }
                        ]
                    }
                ]);
                assert(output.length > 0);
            });
        });
    });
});