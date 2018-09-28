module.exports = (env = process.env.SERVICE_ENV) => {
  const environment = env || 'local';
  const defaultEnvConfig = require('./default');
  const envConfig = require(`./${environment}`);

  const MergeRecursive = (obj1, obj2) => {
    Object.keys(obj2).forEach(p => {
      try {
        if (obj2[p].constructor === Object) {
          obj1[p] = MergeRecursive(obj1[p], obj2[p]);
        } else {
          obj1[p] = obj2[p];
        }
      } catch (e) {
        obj1[p] = obj2[p];
      }
    });
    return obj1;
  };

  const layers = [defaultEnvConfig, envConfig];
  return layers.reduce((a, b) => MergeRecursive(a, b), {});
};
