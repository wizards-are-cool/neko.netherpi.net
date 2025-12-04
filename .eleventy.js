const path = require("node:path");
const htmlmin = require("html-minifier-terser");
const sass = require("sass");

module.exports = function (eleventyConfig) {


	eleventyConfig.addExtension("scss", {
		outputFileExtension: "css",
		// opt-out of Eleventy Layouts
		useLayouts: false,

		compile: async function (inputContent, inputPath) {
			let parsed = path.parse(inputPath);
			// Don’t compile file names that start with an underscore
			if(parsed.name.startsWith("_")) {
				return;
			}

			let result = sass.compileString(inputContent, {
				loadPaths: [
					parsed.dir || ".",
					this.config.dir.includes,
				]
			});

			// Map dependencies for incremental builds
			this.addDependencies(inputPath, result.loadedUrls);

			return async (data) => {
				return result.css;
			};
		},
	});

  // in module.exports:
  eleventyConfig.addTransform("htmlmin", function (content) {
      if ((this.page.outputPath || "").endsWith(".html")) {
        let minified = htmlmin.minify(content, {
         useShortDoctype: true,
         removeComments: true,
         collapseWhitespace: true,
         minifyCSS: true,
         minifyJS: true,
        });
       return minified;
     }
     return content;
   });

  // This will stop the default behaviour of foo.html being turned into foo/index.html
  eleventyConfig.addGlobalData("permalink", "{{ page.filePathStem }}.html");

  // This defines which files will be copied
  eleventyConfig.setTemplateFormats(["html", "njk", "txt", "js", "css", "xml", "json"]);

  // Don't use .gitignore to ignore
  eleventyConfig.setUseGitIgnore(false);
  return {
    dir: {
      input: "content",
      output: "neko.netherpi.net",
    },
  };
};
