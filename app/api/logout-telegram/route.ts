import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const url = new URL(request.url);
    const redirectUrl = url.searchParams.get("redirect") || "/";

    // Create the response object that redirects the user
    const response = NextResponse.redirect(new URL(redirectUrl, request.url));

    // Telegram sets a `tg_user` cookie to keep the session open.
    // By setting its expiration date to the past, we clear the session.
    response.cookies.delete("tg_user");

    // Depending on how domain was set, we might also want to explicitly clear it for the root domain or subdomains
    response.headers.append(
        "Set-Cookie",
        `tg_user=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Domain=.smarterbot.cl`
    );

    return response;
}
