'use strict';

/**
 * Catalyst Cron Function — Trigger GitHub Actions daily blog workflow
 *
 * Env vars (Catalyst Console → Functions → trigger-blog → Environment Variables):
 *   GITHUB_TOKEN = github_pat_... (Fine-grained PAT with Actions: write on drsonin/website)
 *
 * Cron: 06:00 UTC daily (= 09:00 Tallinn EET+3 summer)
 */

const GITHUB_REPO     = 'drsonin/website';
const GITHUB_WORKFLOW = 'daily-blog.yml';
const GITHUB_BRANCH   = 'master';

module.exports = async (context) => {
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    console.error('Missing GITHUB_TOKEN env var');
    context.closeWithSuccess('ERROR: Missing GITHUB_TOKEN');
    return;
  }

  const url = `https://api.github.com/repos/${GITHUB_REPO}/actions/workflows/${GITHUB_WORKFLOW}/dispatches`;

  console.log(`Triggering workflow: ${url}`);

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
      'User-Agent': 'Sonin-Catalyst-Cron/1.0',
    },
    body: JSON.stringify({ ref: GITHUB_BRANCH }),
  });

  if (response.status === 204) {
    console.log('✅ Workflow triggered successfully');
    context.closeWithSuccess('OK: workflow dispatched');
  } else {
    const body = await response.text();
    console.error(`❌ GitHub API error ${response.status}: ${body}`);
    context.closeWithSuccess(`ERROR: ${response.status} ${body}`);
  }
};
