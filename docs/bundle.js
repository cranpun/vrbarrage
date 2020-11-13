(() => {
  // src/module.ts
  class Mod {
    testtest() {
      console.log("hello esbuild at module");
    }
  }

  // src/main.ts
  const mod = new Mod();
  mod.testtest();
})();
//# sourceMappingURL=bundle.js.map
