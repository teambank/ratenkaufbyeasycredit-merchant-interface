
var getConfig = function () {
  var config = {
    endpoints: [],
    request_config: []
  }
  if (typeof window.ratenkaufbyeasycreditOrderManagementConfig !== 'undefined') {
    config = { ...config, ...window.ratenkaufbyeasycreditOrderManagementConfig }
  }

  if (typeof config.endpoints === 'undefined') {
    throw new Error('Endpoints are not defined. Please define endpoints using window.ratenkaufbyeasycreditOrderManagementConfig.endpoints')
  }
  return config
}

export default {
  getEndpoints () {
    return getConfig().endpoints
  },
  getRequestConfig () {
    return getConfig().request_config
  }
}
