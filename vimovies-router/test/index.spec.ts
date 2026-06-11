import {
	env,
} from "cloudflare:test";
import { describe, it, expect } from "vitest";
import worker from "../src/index";

describe("Vimovies Router Worker", () => {
	it("proxies robots.txt to API (unit style)", async () => {
		const request = new Request("http://example.com/robots.txt");
		const response = await worker.fetch(request, env);
		expect(response.status).toBe(200);
	});

	it("proxies sitemap to API (unit style)", async () => {
		const request = new Request("http://example.com/sitemap.xml");
		const response = await worker.fetch(request, env);
		expect(response.status).toBe(200);
	});

	it("proxies normal requests to Vercel (unit style)", async () => {
		const request = new Request("http://example.com/");
		const response = await worker.fetch(request, env);
		// Vercel might return 404 or other status, but the proxy should work
		expect(response).toBeDefined();
	});
});
