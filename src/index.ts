/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `wrangler dev src/index.ts` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `wrangler publish src/index.ts --name my-worker` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export interface Env {
	// Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
	// MY_KV_NAMESPACE: KVNamespace;
	//
	// Example binding to Durable Object. Learn more at https://developers.cloudflare.com/workers/runtime-apis/durable-objects/
	// MY_DURABLE_OBJECT: DurableObjectNamespace;
	//
	// Example binding to R2. Learn more at https://developers.cloudflare.com/workers/runtime-apis/r2/
	// MY_BUCKET: R2Bucket;
	//
	// Example binding to a Service. Learn more at https://developers.cloudflare.com/workers/runtime-apis/service-bindings/
	// MY_SERVICE: Fetcher;
}

import packageJson from '../package.json';
const identificationString = `${packageJson.name}/${packageJson.version}`;

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    // Rewrite only read operations.
    if (request.method !== 'GET') return new Response(null, {status: 405});

    const { pathname, search } = new URL(request.url);
    const rewrittenUrl = new URL(pathname + search, 'https://www.atticandbutton.us');
    return fetch(rewrittenUrl, {
      headers: {
        'content-type': 'text/html;charset=utf-8',
        // Modify this request just enough to make rewrites work and
        // identify ourselves if Shopify wants to filter traffic.
        'user-agent': `Mozilla/5.0 (Macintosh; Intel Mac OS X 13_2_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36 ${identificationString}`,
      },
    });
  }
};
