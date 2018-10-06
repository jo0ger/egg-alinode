'use strict';

const assert = require('assert');
const AlinodeAgent = require('agentx');
const homedir = require('node-homedir');
const fs = require('fs');
const path = require('path');
const pkg = require('../package.json');

module.exports = (agent, asyncConfig) => {
  const config = Object.assign({}, agent.config[pkg.eggPlugin.name], asyncConfig);
  if (!config.enable) {
    agent.coreLogger.info('[egg-alinode-async] disable');
    return false;
  }

  try {
    assert(config.appid, 'appid required');
    assert(config.secret, 'secret required');
  } catch (error) {
    if (asyncConfig) {
      assert.fail(error)
    } else {
      agent.coreLogger.info('[egg-alinode-async] listen to "alinode-run" event');
      return false
    }
  }

  const nodepathFile = path.join(homedir(), '.nodepath');
  const nodeBin = path.dirname(process.execPath);
  fs.writeFileSync(nodepathFile, nodeBin);

  config.logger = agent.coreLogger;
  config.libMode = true;
  new AlinodeAgent(config).run();
  agent.coreLogger.info('[egg-alinode-async] alinode agentx started, node versions: %j, update %s with %j, config: %j',
    process.versions,
    nodepathFile,
    nodeBin, {
      server: config.server,
      appid: config.appid,
    }
  );
  return true
};