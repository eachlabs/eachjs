# Each Node.js client

A Node.js client for [Each](https://eachlabs.ai). Each is a platform for deploying and combining machine learning models as APIs.


> This library supports **Each API** and **Each Flow API**. 
> You can use the same client to interact with both APIs.

## Installation

```bash
npm install @eachlabs/aiflow
```

## Usage

Create a new client with your API key

```javascript
// CommonJS as default
const Each = require('@eachlabs/aiflow');

// ESM
import Each from '@eachlabs/aiflow';

```

```javascript
const each = new Each({
    auth: process.env.EACH_API_KEY || 'YOUR_API_KEY'
});
```



## Flow Methods

Each provides AI workflow engine to orchestrate multiple models and data sources. You can create a flow to chain multiple models and data sources together.

For more information, please refer to the [Each Flow API documentation](https://docs.eachlabs.ai/flows).

### Trigger a Flow

```javascript
const flow = await each.flows.trigger("flowId", {
  image: "https://example.com/image.jpg",
  caption: false,
  question: "",
  temperature: 1,
});

// Returns the created flow execution ID
```

### Get a Flow

```javascript
const flow = await each.flows.get("flowId");
```

### Get all Flows

```javascript
const flows = await each.flows.list();
```

### Get a Flow Execution

```javascript
const flowExecution = await each.flows.getExecution("flowId", "executionId");
```

### Get all executions of a Flow

```javascript
const executions = await each.flows.getExecutions("flowId");
```


### Create a Prediction

```javascript
const inputs = {
    "image": "https://example.com/image.jpg",
    "caption": false,
    "question": "",
    "temperature": 1
  }
const prediction = await each.predictions.create({
    model: 'blip-2'
    version: '0.0.1',
    input: inputs
});
```

### Run a Prediction

```javascript
const prediction = await each.predictions.run({
  model: "blip-2",
  version: "0.0.1",
  input: inputs,
});
```

### Get a Prediction

```javascript
const prediction = await each.predictions.get("predictionId");
```

### Cancel a Prediction

```javascript
const prediction = await each.predictions.cancel("predictionId");
```
