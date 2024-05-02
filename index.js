const packageJson = require("./package.json");

const prediction = require("./lib/predictions");
const flow = require("./lib/flow");

/**
 * Each API Client
 *
 * @see https://docs.eachlabs.ai/
 * @example
 * const Each = require("each");
 * const each = new Each({
 *  auth: process.env.EACH_API_KEY,
 * });
 *
 */
class Each {
  /**
   * Create a new Each API client instance
   *
   * @param {Object} options
   * @param {string} options.auth - Each API Key
   * @param {string} [options.flowBaseUrl] - Flow API Base URL
   * @param {string} [options.apiBaseUrl] - Each API Base URL
   * @param {string} [options.userAgent] - User Agent
   * @param {Function} [options.fetch] - Fetch function
   *
   * */
  constructor(options = {}) {
    this.auth =
      options.auth ||
      (typeof process !== "undefined" && process.env.EACH_API_KEY);
    this.flowBaseUrl =
      options.flowBaseUrl || "https://flows.eachlabs.ai/api/v1";
    this.baseUrl = options.apiBaseUrl || "https://api.eachlabs.ai/v1";
    this.userAgent = options.userAgent || `each-js/${packageJson.version}`;
    this.fetch = options.fetch || globalThis.fetch;

    this.prediction = {
      /**
       * Get prediction
       * @param {string} predictionId - Prediction ID
       * @returns {Promise<Object>}
       * @see https://docs.eachlabs.ai/#get-prediction
       * @example
       * const output = await each.prediction.get("prediction-id");
       */
      get: prediction.get.bind(this),
      /**
       * Cancel prediction
       * @param {string} predictionId - Prediction ID
       * @returns {Promise<Object>}
       * @see https://docs.eachlabs.ai/#cancel-prediction
       * @example
       * const output = await each.prediction.cancel("prediction-id");
       */
      cancel: prediction.cancel.bind(this),
      /**
       * Run prediction
       * @param {Object} options
       * @param {string} options.model - Model ID
       * @param {string} options.version - Model Version
       * @param {Object} options.input - Input data
       * @param {Object} options.data - Additional data
       * @returns {Promise<Object>}
       * @see https://docs.eachlabs.ai/#run-prediction
       *
       * @example
       * const output = await each.prediction.run({
       *    model: "model-id",
       *    version: "version-id",
       *    input: {
       *        "feature1": 1,
       *        "feature2": 2,
       *    },
       *    data: {
       *        "name": "John Doe",
       *    },
       * });
       *
       * */
      run: prediction.run.bind(this),
      /**
       * Create a new prediction
       * @param {Object} options
       * @param {string} options.model - Model ID
       * @param {string} options.version - Model Version
       * @param {Object} options.input - Input data
       * @param {Object} options.data - Additional data
       * @returns {Promise<Object>}
       * @see https://docs.eachlabs.ai/#create-prediction
       *
       * @example
       * const prediction = await each.prediction.create({
       *    model: "model-id",
       *    version: "version-id",
       *    input: {
       *        "feature1": 1,
       *        "feature2": 2,
       *    },
       *    data: {
       *        "name": "John Doe",
       *    },
       * });
       *
       * */
      create: prediction.create.bind(this),
    };

    this.flow = {
        /**
         * Trigger a flow
         * @param {string} flowId - Flow ID
         * @param {Object} parameters - Flow parameters
         * @returns {Promise<Object>}
         * @see https://docs.eachlabs.ai/#trigger-flow
         */
      trigger: flow.triggerFlow.bind(this),
        /**
         * Get flow
         * @param {string} flowId - Flow ID
         * @returns {Promise<Object>}
         * @see https://docs.eachlabs.ai/#get-flow
         */
      get: flow.getFlow.bind(this),
        /**
         * Get flow list
         * @returns {Promise<Object>}
         * @see https://docs.eachlabs.ai/#get-flow-list
         * */
      list: flow.getFlowList.bind(this),
        /**
         * Get flow executions
         * @param {string} flowId - Flow ID
         * @returns {Promise<Object>}
         * @see https://docs.eachlabs.ai/#get-flow-executions
         * */
      executions: flow.getExecutions.bind(this),
        /**
         * Get flow execution
         * @param {string} flowId - Flow ID
         * @param {string} executionId - Execution ID
         * @returns {Promise<Object>}
         * @see https://docs.eachlabs.ai/#get-flow-execution
         * */
      execution: flow.getExecution.bind(this),
    };
  }

  /**
   * Make a request to the Each API
   * @param {string} route - The API route
   * @param {Object} options - Request options
   * @param {string} options.method - HTTP method
   * @param {Object} options.params - Query parameters
   * @param {Object} options.data - Request body
   * @param {Object} options.headers - Request headers
   * @returns {Promise<Response>}
   */

  async request(route, options) {
    const { auth, userAgent } = this;
    let baseUrl = this.baseUrl;
    if (options.type === "flow") {
      baseUrl = this.flowBaseUrl;
    }
    let url;

    url = new URL(
      route.startsWith("/") ? route.slice(1) : route,
      baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`
    );

    const { method = "GET", params = {}, data } = options;

    for (const [key, value] of Object.entries(params)) {
      url.searchParams.append(key, value);
    }

    const headers = {};
    if (auth) {
      headers["X-API-Key"] = auth;
    }
    headers["Content-Type"] = "application/json";
    headers["User-Agent"] = userAgent;
    if (options.headers) {
      for (const [key, value] of Object.entries(options.headers)) {
        headers[key] = value;
      }
    }

    const init = {
      method,
      headers,
      body: data ? JSON.stringify(data) : undefined,
    };

    console.log(init);
    const _fetch = this.fetch;
    console.log(url.href);
    const response = await _fetch(url, init);

    if (!response.ok) {
      const request = new Request(url, init);
      const responseText = await response.text();
      throw new Error("Request failed: " + responseText);
    }

    return response;
  }
}

module.exports = Each;
