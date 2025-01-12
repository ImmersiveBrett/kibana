/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { coreMock } from '@kbn/core/public/mocks';
const startMock = coreMock.createStart();

import { mount } from 'enzyme';
import { PainlessError } from './painless_error';
import { findTestSubject } from '@elastic/eui/lib/test';
import * as searchPhaseException from '../../../common/search/test_data/search_phase_execution_exception.json';

describe('PainlessError', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should show reason and code', () => {
    const e = new PainlessError(
      {
        statusCode: 400,
        message: 'search_phase_execution_exception',
        attributes: {
          error: searchPhaseException.error,
        },
      },
      () => {}
    );
    const component = mount(e.getErrorMessage());

    const failedShards = searchPhaseException.error.failed_shards![0];

    const stackTraceElem = findTestSubject(component, 'painlessStackTrace').getDOMNode();
    const stackTrace = failedShards!.reason.script_stack!.splice(-2).join('\n');
    expect(stackTraceElem.textContent).toBe(stackTrace);

    const humanReadableError = findTestSubject(
      component,
      'painlessHumanReadableError'
    ).getDOMNode();
    expect(humanReadableError.textContent).toBe(failedShards?.reason.caused_by?.reason);

    const actions = e.getActions(startMock.application);
    expect(actions.length).toBe(2);
  });
});
