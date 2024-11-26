/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.toml`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export default {
	async fetch(request, env, ctx): Promise<Response> {
		// Handle CORS preflight requests
		if (request.method === 'OPTIONS') {
			return new Response(null, {
				headers: {
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Methods': 'POST, OPTIONS',
					'Access-Control-Allow-Headers': 'Content-Type',
				},
			});
		}

		// Add CORS headers to all responses
		const corsHeaders = {
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'application/json',
		};

		// Validate request body is valid
		const requestBody = (await request.json()) as { board: string[] };
		if (!requestBody) {
			return new Response(JSON.stringify({ error: 'No body found in request' }), { headers: corsHeaders });
		}
		const { board } = requestBody;

		// Find available moves
		const availableMoves = board.reduce((moves: number[], cell: string, index: number) => {
			if (!cell) moves.push(index);
			return moves;
		}, []);

		// Select random move and return it
		const move = availableMoves[Math.floor(Math.random() * availableMoves.length)];

		return new Response(JSON.stringify({ move }), {
			headers: corsHeaders,
		});
	},
} satisfies ExportedHandler<Env>;
