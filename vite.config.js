/* eslint-disable no-undef */
import path from "path";
import { defineConfig } from "vite"
import twigConfig from "./twig.config";

const defaultConfig = (mode) => ({
		build: {
			manifest: false,
			modulePreload: true,
			rollupOptions: {
				input: ["./src/views/pages/**/*.twig"],
				output: {
					entryFileNames: `scripts/[name].js`,
					assetFileNames: (chunkInfo) => {
						if (chunkInfo.name.match('css'))
							return `styles/[name].[ext]`;
							return `[name].[ext]`;
					},
				},
			},
			cssCodeSplit: true,
			sourcemap: mode !== 'production',
		},
		resolve: {
			extensions: [".ts", ".tsx", ".js", ".jsx", ".scss", ".json", ".twig"],
			alias: {
				'@': path.resolve(__dirname, './'),
				// '@src': path.resolve(__dirname, 'src/'),
				'@public': path.resolve(__dirname, 'public/'),
				// '@assets': path.resolve(__dirname, NODE.env),
				'styles': path.resolve(__dirname, '/styles'),
				'@images': path.resolve(__dirname, 'public/assets/images/')
			}
		},
		css: {
			preprocessorOptions: {
				scss: {
					// includePaths: [path.join(__dirname), path.join(__dirname, 'src'), path.join(__dirname, "styles")],
					additionalData: `
						@use "sass:map";
						@use "sass:string";
						@use "sass:math";
						@use "sass:list";
	
						@import "@/src/styles/_helpers";
						@import "@/src/styles/_core";
						`
				},
			},
		}
	})


export default defineConfig(({ mode }) => (
	{
		...twigConfig(mode),
		...defaultConfig(mode)
	}
))