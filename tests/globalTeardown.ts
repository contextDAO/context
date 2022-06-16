const teardown = async (): Promise<void> => {
  console.log('teardown');
  await global.arweave.stop();
};

export default teardown;
