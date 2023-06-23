const core = require("@actions/core");
const github = require("@actions/github");

try {
  // Check if the PR was opened by dependabot
  const prUser = github.context.payload.pull_request.user.login;
  if (prUser === "dependabot[bot]" || prUser === "dependabot-preview[bot]") {
    core.info("PR was opened by dependabot, skipping check");
  } else {
    // Gets the PR description and then checks if it has a link which looks like https://XXXXXX.monday.com/boards/3383371429/views/77319790 or https://XXXXXX.monday.com/boards/3383371429/pulses/77319790
    const prDescription = github.context.payload.pull_request.body;
    const regex = /https:\/\/.+\.monday\.com\/boards\/\d+\/views\/\d+/g;
    const regex2 = /https:\/\/.+\.monday\.com\/boards\/\d+\/pulses\/\d+/g;
    const match = prDescription.match(regex);
    const match2 = prDescription.match(regex2);
    // If the match exists pass if not fail
    if (match || match2) {
      core.info("Link found in PR description");
    } else {
      core.setFailed("No link found in PR description");
    }
  }
} catch (error) {
  core.setFailed(error.message);
}
