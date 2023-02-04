import axios, {
  AxiosInstance,
  AxiosResponse,
  AxiosError,
  AxiosRequestConfig,
} from "axios";

class AxiosClient {
  private client: AxiosInstance;

  // Axiosクライアントの初期化
  constructor(config: AxiosRequestConfig) {
    this.client = axios.create(config);
  }

  // 例外処理
  private handleError(error: AxiosError): void {
    console.error(error);
  }

  // GET リクエスト
  public async get(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse> {
    try {
      return await this.client.get(url, config);
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  // POST リクエスト
  public async post(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse> {
    try {
      return await this.client.post(url, data, config);
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  // PUT リクエスト
  public async put(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse> {
    try {
      return await this.client.put(url, data, config);
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  // DELETE リクエスト
  public async delete(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse> {
    try {
      return this.client.delete(url, config);
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }
}

// Axiosクライアントのインスタンス生成
export const axiosClient = new AxiosClient({
  baseURL: "http://localhost:3000",
});
