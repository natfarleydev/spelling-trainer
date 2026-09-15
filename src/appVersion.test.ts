import { describe, expect, it } from 'vitest'
import { resolveAppVersion } from './appVersion'

const SHA = '0123456789abcdef0123456789abcdef01234567'
const OTHER_SHA = 'fedcba9876543210fedcba9876543210fedcba98'

const noGit = () => {
  throw new Error('git is not available')
}

describe('resolveAppVersion', () => {
  it('uses the GitHub Actions commit SHA when it is available', () => {
    expect(resolveAppVersion({ githubSha: SHA, readGitSha: () => OTHER_SHA })).toBe(SHA)
  })

  it('uses the local git commit SHA when GitHub Actions gives no SHA', () => {
    expect(resolveAppVersion({ githubSha: undefined, readGitSha: () => `${OTHER_SHA}\n` })).toBe(OTHER_SHA)
  })

  it.each(['', 'not-a-sha'])('ignores a GitHub Actions SHA of %j', (githubSha) => {
    expect(resolveAppVersion({ githubSha, readGitSha: () => OTHER_SHA })).toBe(OTHER_SHA)
  })

  it('gives "development" when git is not available', () => {
    expect(resolveAppVersion({ githubSha: undefined, readGitSha: noGit })).toBe('development')
  })

  it('gives "development" when git gives text that is not a commit SHA', () => {
    expect(resolveAppVersion({ githubSha: undefined, readGitSha: () => 'fatal: not a git repository' })).toBe(
      'development',
    )
  })

  it('does not read git when GitHub Actions gives a SHA', () => {
    expect(resolveAppVersion({ githubSha: SHA, readGitSha: noGit })).toBe(SHA)
  })
})
