import { defineConfig } from "vite";

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                inicio: "index.html",
                projetos: "projetos.html",
                cadastro: "cadastro.html"
            }
        }
    }
});