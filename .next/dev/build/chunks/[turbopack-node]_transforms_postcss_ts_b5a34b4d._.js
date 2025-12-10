module.exports = [
"[turbopack-node]/transforms/postcss.ts { CONFIG => \"[project]/flower-shop/postcss.config.mjs [postcss] (ecmascript)\" } [postcss] (ecmascript, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "chunks/be029__pnpm_9cc2dc9b._.js",
  "chunks/[root-of-the-server]__974e7e07._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[turbopack-node]/transforms/postcss.ts { CONFIG => \"[project]/flower-shop/postcss.config.mjs [postcss] (ecmascript)\" } [postcss] (ecmascript)");
    });
});
}),
];