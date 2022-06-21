const teardown = async (): Promise<void> => {
  await global.arweave.stop();
};

export default teardown;
