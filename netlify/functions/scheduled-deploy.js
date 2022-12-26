import fetch from "node-fetch";
import { schedule } from "@netlify/functions";

const params = new URLSearchParams();
params.append("trigger_branch", "next");
params.append("trigger_title", "scheduled auto-rebuild");

const handler = schedule("0 0-23/6 * * *", async () => {
	await fetch(process.env.BUILD_HOOK, {
		method: "POST",
		body: params,
	}).then((response) => {
		console.log("Build hook response:", response);
	});

	return {
		statusCode: 200,
	};
});

export { handler };
