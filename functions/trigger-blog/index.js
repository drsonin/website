'use strict';

const GITHUB_REPO     = 'drsonin/website';
const GITHUB_WORKFLOW = 'daily-blog.yml';
const GITHUB_BRANCH   = 'master';

module.exports = async () => {
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    console.error('Missing GITHUB_TOKEN env var');
    return { status: 'error', message: 'Missing GITHUB_TOKEN' };
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
    return { status: 'ok', message: 'workflow dispatched' };
  } else {
    const body = await response.text();
    console.error(`❌ GitHub API error ${response.status}: ${body}`);
    return { status: 'error', code: response.status, message: body };
  }
};
