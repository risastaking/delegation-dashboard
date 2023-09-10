import { plugin } from "bun";

plugin({
  name: "css-modules",
  async setup(build) {
    build.onLoad({ filter: /\.scss$/ }, async (args) => {
      const { readFileSync } = await import("node:fs");
      const { transform } = await import("lightningcss");
      const { compileString } = await import("sass");

      const { exports } = transform({
        filename: args.path,
        code: Buffer.from(
          compileString(readFileSync(args.path, "utf8")).css
        ),
        cssModules: true,
      });

      return {
        exports: {
          default: Object.fromEntries(
            Object.entries(exports ?? {}).map(([key, value]: any) => [
              key,
              value.name,
            ])
          ),
        },
        loader: "object",
      };
    });
  },
});