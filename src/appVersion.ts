// A full git commit SHA: 40 lowercase hexadecimal characters.
const COMMIT_SHA = /^[0-9a-f]{40}$/

export const DEVELOPMENT_VERSION = 'development'

export type VersionSources = {
  // GitHub Actions gives the commit SHA in the GITHUB_SHA environment variable.
  readonly githubSha: string | undefined
  // Read the local commit SHA. This function can throw, for example when git is not available.
  readonly readGitSha: () => string
}

// Give the version of the build. vite.config.ts gives the sources, so that this function stays pure.
export const resolveAppVersion = ({ githubSha, readGitSha }: VersionSources): string => {
  if (githubSha !== undefined && COMMIT_SHA.test(githubSha)) return githubSha
  try {
    const gitSha = readGitSha().trim()
    return COMMIT_SHA.test(gitSha) ? gitSha : DEVELOPMENT_VERSION
  } catch {
    return DEVELOPMENT_VERSION
  }
}
