const Metalsmith = require("metalsmith");
const collections = require("metalsmith-collections");
const markdown = require("metalsmith-markdown");
const layouts = require("metalsmith-layouts");
const sass = require("metalsmith-sass");
const pug = require("metalsmith-pug");

const app = Metalsmith(__dirname)
    .metadata({
        sitename: "anarchy.tech",
        siteurl: "http://anarchy.tech/"
    })
    .source("site-source")
    .destination("build")
    .use(collections({
        posts: "posts/*.md",
    }))
    .use(sass({
        sourceMap: true,
        sourceMapContents: true
    }))
    .use(markdown())
    .use(layouts({
        pattern: ["**/*.html", "**/*.md"],
        default: "base.pug",
        directory: "layouts"
    }));

if (module.parent) {
    module.exports = app;
} else {
    const buildStartTime = Date.now();

    app.build((err, files) => { 
        if (err) { 
            throw err; 
        } 
        
        const buildTime = Date.now() - buildStartTime;
        const fileCount = Object.keys(files).length;

        console.log(`Build completed with ${fileCount} files in ${buildTime} ms.`);
        Object.keys(files).forEach(f => console.log(`Outputted: ${f}`));
    });
}