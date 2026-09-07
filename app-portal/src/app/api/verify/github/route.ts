import { NextRequest, NextResponse } from 'next/server'

const GITHUB_API = 'https://api.github.com'

export async function GET(request: NextRequest) {
  const repository = request.nextUrl.searchParams.get('repository')?.trim()
  if (!repository || !/^[^/]+\/[^/]+$/.test(repository)) {
    return NextResponse.json({ error: 'Repository must use owner/repository format.' }, { status: 400 })
  }

  const token = request.cookies.get('drp_github_token')?.value
  if (!token) {
    return NextResponse.json({ error: 'Connect GitHub before starting a verification session.', code: 'GITHUB_NOT_CONNECTED' }, { status: 401 })
  }

  const headers = { Accept: 'application/vnd.github+json', Authorization: `Bearer ${token}`, 'X-GitHub-Api-Version': '2022-11-28' }
  const userResponse = await fetch(`${GITHUB_API}/user`, { headers, cache: 'no-store' })
  if (!userResponse.ok) return NextResponse.json({ error: 'GitHub authorization is no longer valid. Reconnect GitHub.', code: 'GITHUB_AUTH_INVALID' }, { status: 401 })
  const user = await userResponse.json()

  const repoResponse = await fetch(`${GITHUB_API}/repos/${repository}`, { headers, cache: 'no-store' })
  if (!repoResponse.ok) return NextResponse.json({ error: 'Repository could not be accessed.' }, { status: 404 })

  const commitsResponse = await fetch(`${GITHUB_API}/repos/${repository}/commits?author=${encodeURIComponent(user.login)}&per_page=100`, { headers, cache: 'no-store' })
  const commits = commitsResponse.ok ? await commitsResponse.json() : []
  const prsResponse = await fetch(`${GITHUB_API}/search/issues?q=${encodeURIComponent(`repo:${repository} author:${user.login} is:pr`)}&per_page=100`, { headers, cache: 'no-store' })
  const prs = prsResponse.ok ? await prsResponse.json() : { total_count: 0 }

  const commitCount = Array.isArray(commits) ? commits.length : 0
  const pullRequestCount = Number(prs.total_count || 0)
  const verified = commitCount > 0 || pullRequestCount > 0

  return NextResponse.json({
    result: verified ? 'verified' : 'not_verified',
    repository,
    identity: user.login,
    commits: commitCount,
    pullRequests: pullRequestCount,
    verificationMethod: 'github-public-contribution-v1',
    verifiedAt: new Date().toISOString(),
  })
}
