const core = require("@actions/core");
const github = require("@actions/github");

try {
  // Gets the PR description and then checks if it has a link which looks like https://XXXXXX.monday.com/boards/3383371429/views/77319790
  const prDescription = github.context.payload.pull_request.body;
  const regex = /https:\/\/.+\.monday\.com\/boards\/\d+\/views\/\d+/g;
  const match = prDescription.match(regex);
  // If the match exists pass if not fail
  if (match) {
    core.info("Link found in PR description");
  } else {
    core.setFailed("No link found in PR description");
  }
} catch (error) {
  core.setFailed(error.message);
}
