"use server"

import { auth } from "@/lib/auth"

export async function getLogoutUrl(origin?: string) {
  const session = await auth()
  const idToken = session?.idToken

  if (!idToken) {
    console.log("getLogoutUrl: No idToken found in session")
    return null
  }

  const wso2Host = process.env.WSO2IS_HOST
  const postLogoutRedirectUri = origin || process.env.NEXTAUTH_URL || "http://localhost:3000"

  const params = new URLSearchParams({
    id_token_hint: idToken,
    post_logout_redirect_uri: postLogoutRedirectUri,
  })

  return `${wso2Host}/oidc/logout?${params.toString()}`
}
