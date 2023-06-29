const fs = require("fs");
const os = require("os");
const path = require("path");
const ju = require("./jakeutil");

// TODO: Copied from Jakefile; should be async
function buildStrings(out, rootPaths, recursive) {
    let errCnt = 0;
    const translationStrings = {}
    const translationHelpStrings = {}

    function processLf(filename) {
        if (!/\.(ts|tsx|html)$/.test(filename)) return
        if (/\.d\.ts$/.test(filename)) return

        //console.log(`extracting strings from ${filename}`);
        const content = fs.readFileSync(filename, "utf8");

        function err(msg) {
            console.log("%s: %s", filename, msg);
            errCnt++;
        }

        content.replace(/lf(_va)?\s*\([\s\n]*("[^"]*")/mg, (all, _, str) => {
            try {
                str = JSON.parse(str)
                translationStrings[str] = 1
            } catch (e) {
                err("cannot JSON-parse " + str)
            }
            return "BLAH " + str
        });
    }

    let fileCnt = 0;
    const paths = recursive ? ju.expand(rootPaths) : ju.expand1(rootPaths);
    paths.forEach(pth => {
        fileCnt++;
        processLf(pth);
    });

    Object.keys(translationHelpStrings).forEach(k => translationStrings[k] = k)
    let tr = Object.keys(translationStrings)
    tr.sort()

    if (!fs.existsSync("build")) fs.mkdirSync("build");
    fs.writeFileSync("build/localization.json", JSON.stringify({ strings: tr }, null, 1))
    let strings = {};
    tr.forEach((k) => { strings[k] = k; });
    fs.writeFileSync("build/" + out, JSON.stringify(strings, null, 2));

    console.log("Localization extraction: " + fileCnt + " files; " + tr.length + " strings; " + out);
    if (errCnt > 0) {
        console.log("%d errors", errCnt);
        if (process.env.PXT_ENV == 'production') {
            throw "Broken lfs";
        }
    }

    return Promise.resolve();
}

function usage() {
    console.error("Usage: node strings.js <output file> <input folders...>");
}

if (process.argv.length < 4 || process.argv[2] == "-h") {
    usage();
    process.exit(1);
}

buildStrings(process.argv[2], process.argv.slice(3), true)
