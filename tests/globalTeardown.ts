const teardown = async (): Promise<void> => {
  console.log('teardown');
  console.log('*** ID ' + process.env.JEST_WORKER_ID);
  await global.arweave.stop();
};

export default teardown;
