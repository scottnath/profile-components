export default {
  extends: 'storydocker-utilities/releases',
  branches: [
    { name: 'main', channel: 'latest', prerelease: false },
    { name: 'setup-module', channel: 'next', prerelease: true },
  ],
  debug: true,
  tagFormat: 'profile-components@${version}',
};
