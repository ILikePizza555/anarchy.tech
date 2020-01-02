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
        default: "base.pug",
        directory: "layouts"
    }))
    .use(pug({useMetadata: true}));

if (module.parent) {
    module.exports = app;
} else {
    app.build(err => { if (err) { console.error(err.message); process.exit(1) } });
}