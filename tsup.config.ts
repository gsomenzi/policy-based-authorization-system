import { defineConfig } from "tsup";

export default defineConfig({
	entry: ["src/index.ts", "src/nestjs/index.ts"],
	format: ["cjs", "esm"],
	sourcemap: true,
	dts: true,
	clean: true,
	minify: false,
	legacyOutput: false,
});
