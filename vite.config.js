// This Vite config file (vite.config.js) tells Rollup (production bundler) 
// to treat multiple HTML files as entry points so each becomes its own built page.

import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                index: resolve(__dirname, "index.html"),
                login: resolve(__dirname, "login.html"),
                "other-threads": resolve(__dirname, "other-threads.html"),
                profile: resolve(__dirname, "profile.html"),
                thread: resolve(__dirname, "thread.html"),
                "thread-information": resolve(__dirname, "thread-information.html"),
                "country-selection": resolve(__dirname, "country-selection.html")
            }
        }
    }
});
