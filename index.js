const Metalsmith = require("metalsmith");
const collections = require("metalsmith-collections");
const markdown = require("metalsmith-markdown");
const layouts = require("metalsmith-layouts");

Metalsmith(__dirname)
    .metadata({
        sitename: "anarchy.tech"
    })
    .source("site-source")
    .destination("build")
    .use(collections({
        posts: "posts/*.md"
    }))
    .use(markdown())
    .use(layouts())