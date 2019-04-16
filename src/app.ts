import axios from "axios";

export interface ConfigOptions {
  walletAddresses: string[];
  blockchainURL: string;
  pollingIntervalMinutes: number;
}

export default class App {
  config: ConfigOptions;

  constructor(config: ConfigOptions) {
    this.config = config;
    this.start();
  }

  start() {
    this.pollWallets();
    setInterval(
      () => this.pollWallets(),
      this.config.pollingIntervalMinutes * 60000
    );
  }

  async pollWallets() {
    const { walletAddresses } = this.config;
    for (let i = 0, n = walletAddresses.length; i < n; i++) {
      await this.pollWallet(walletAddresses[i]);
    }
  }

  async pollWallet(walletAddress: string) {
    try {
      const response = await axios.get(
        `${this.config.blockchainURL}/${walletAddress}`
      );
      this.processWallet(walletAddress, response.data);
      return;
    } catch (error) {
      console.error("Error GET blockchain wallet", error);
    }
  }

  async processWallet(walletAddress: string, response: { [key: string]: any }) {
    console.log(response);
    return Promise.resolve();
  }
}
