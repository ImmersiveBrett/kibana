/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { i18n } from '@kbn/i18n';
import { metrics } from './metrics';
import { InventoryModel } from '../types';

export { containerSnapshotMetricTypes } from './metrics';

export const container: InventoryModel = {
  id: 'container',
  displayName: i18n.translate('xpack.metricsData.inventoryModel.container.displayName', {
    defaultMessage: 'Docker Containers',
  }),
  singularDisplayName: i18n.translate(
    'xpack.metricsData.inventoryModel.container.singularDisplayName',
    {
      defaultMessage: 'Docker Container',
    }
  ),
  requiredModule: 'docker',
  crosslinkSupport: {
    details: true,
    logs: true,
    apm: true,
    uptime: true,
  },
  fields: {
    id: 'container.id',
    name: 'container.name',
    ip: 'container.ip_address',
  },
  metrics,
  requiredMetrics: [
    'containerOverview',
    'containerCpuUsage',
    'containerMemory',
    'containerNetworkTraffic',
    'containerDiskIOBytes',
    'containerDiskIOOps',
    'containerK8sOverview',
    'containerK8sCpuUsage',
    'containerK8sMemoryUsage',
  ],
  tooltipMetrics: ['cpu', 'memory', 'rx', 'tx'],
};
