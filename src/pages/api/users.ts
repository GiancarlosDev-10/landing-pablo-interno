import { fetchUserCount } from "../../lib/sheets";
import { GOAL } from "../../lib/config";
import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
  try {
    const count = await fetchUserCount();
    const percentage = Math.min((count / GOAL) * 100, 100);

    return new Response(
      JSON.stringify({
        count,
        goal: GOAL,
        percentage: Number(percentage.toFixed(1)),
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  } catch (error) {
    console.error("Error in users API:", error);

    // Fallback response
    return new Response(
      JSON.stringify({
        count: 0,
        goal: GOAL,
        percentage: 0,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }
};
