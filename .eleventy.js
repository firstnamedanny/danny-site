module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("admin");
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("katy-trail.html");

  // Projects collection from _data/projects/*.json
  eleventyConfig.addCollection("projects", function(collectionApi) {
    const fs = require("fs");
    const path = require("path");
    const dir = "./_data/projects";
    if (!fs.existsSync(dir)) return [];
    return fs.readdirSync(dir)
      .filter(f => f.endsWith(".json"))
      .map(f => ({
        data: JSON.parse(fs.readFileSync(path.join(dir, f), "utf8"))
      }))
      .sort((a, b) => (a.data.number || "").localeCompare(b.data.number || ""));
  });

  // Personal projects collection from _data/personal/*.json
  eleventyConfig.addCollection("personal", function(collectionApi) {
    const fs = require("fs");
    const path = require("path");
    const dir = "./_data/personal";
    if (!fs.existsSync(dir)) return [];
    return fs.readdirSync(dir)
      .filter(f => f.endsWith(".json"))
      .map(f => ({
        data: JSON.parse(fs.readFileSync(path.join(dir, f), "utf8"))
      }))
      .sort((a, b) => (a.data.order || 0) - (b.data.order || 0));
  });

  return {
    dir: {
      input: ".",
      output: "_site",
      data: "_data"
    },
    templateFormats: ["njk", "html"],
    htmlTemplateEngine: "njk"
  };
};
