async function createPrediction(options) {
  const { model, version, input, ...data } = options;

  if (model === undefined || model === null) {
    throw new Error(
      "[EACH] [ERROR] Model is required field for the prediction"
    );
  }

  if (version === undefined || version === null) {
    throw new Error(
      "[EACH] [ERROR] Version is required field for the prediction"
    );
  }

  const response = await this.request("/prediction/", {
    method: "POST",
    data: {
      ...data,
      input: input,
      version,
      model,
    },
  });

  return response.json();
}

async function getPrediction(predictionId) {
  const response = await this.request(`/prediction/${predictionId}`, "GET");
  return response.json();
}

async function cancelPrediction(predictionId) {
  const response = await this.request(`/prediction/${predictionId}/cancel`, {
    method: "POST",
  });

  return response.json();
}

async function runPrediction(options) {
  const { model, version, input, ...data } = options;

  if (model === undefined || model === null) {
    throw new Error(
      "[EACH] [ERROR] Model is required field for the prediction"
    );
  }

  if (version === undefined || version === null) {
    throw new Error(
      "[EACH] [ERROR] Version is required field for the prediction"
    );
  }

  const response = await this.request("/prediction/run", {
    method: "POST",
    data: {
      ...data,
      input: input,
      version,
      model,
    },
  });

  return response.json();
}

module.exports = {
  create: createPrediction,
  get: getPrediction,
  cancel: cancelPrediction,
  run: runPrediction,
};
