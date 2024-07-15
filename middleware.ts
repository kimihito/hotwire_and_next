import type {NextRequest} from 'next/server'
import {NextResponse} from 'next/server'
import {sleep} from "@/helpers/sleep";


// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  if (shouldDelayResponse(request)) {
    const responseDelay = parseInt(process.env.RESPONSE_DELAY || "")
    await sleep(responseDelay)
  }

  return NextResponse.next()
}

function shouldDelayResponse(request: NextRequest) {
  const userAgent = request.headers.get('user-agent')
  if (userAgent === "node") {
    // If the userAgent is "node" then this request originated from
    // the Next.js server and is an internal connection. In this case,
    // we expect very low latency.
    return false
  } else {
    return true
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/:path*'],
}
