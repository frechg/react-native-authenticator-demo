export default ({config}) => {
  if (process.env.LOCAL_IP !== undefined) {
    return {
      ...config,
      "extra": {
        "API_URL": `http://${process.env.LOCAL_IP}:3000`
      }
    };
  } else {
    return {
      ...config,
      "extra": {
        "API_URL": "http://localhost:3000"
      }
    };
  };
};