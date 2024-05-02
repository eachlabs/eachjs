async function triggerFlow(flowId, parameters) {
  if (flow === undefined || flow === null) {
    throw new Error("[EACH] [ERROR] Flow is required field for the trigger");
  }

  const response = await this.request(`/${flowId}/trigger`, {
    method: "POST",
    type: "flow",
    data: {
      parameters: parameters || {},
    },
  });

  return response.json();
}

async function getFlow(flowId) {
  const response = await this.request(`/${flowId}`, {
    method: "GET",
    type: "flow",
  });
  return response.json();
}

async function getFlowList() {
  const response = await this.request("/", {
    method: "GET",
    type: "flow",
  });
  return response.json();
}

async function getExecutions(flowId) {
  const response = await this.request(`/${flowId}/executions`, {
    method: "GET",
    type: "flow",
  });
  return response.json();
}

async function getExecution(flowId, executionId) {
  const response = await this.request(
    `/${flowId}/executions/${executionId}`,
    {
      method: "GET",
      type: "flow",
    }
  );
  return response.json();
}

module.exports = {
  triggerFlow,
  getFlow,
  getFlowList,
  getExecutions,
  getExecution,
};
