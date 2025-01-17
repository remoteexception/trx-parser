import * as path from 'path'

import {getAbsoluteFilePaths, transformTrxToJson} from '../src/utils'

describe('Test GetAbsolutePath returns correct values', () => {
  it('getAbsoluteFilePaths()', async () => {
    const filesNames = ['abc.trx', 'xyz.trx']
    const dirName = path.normalize('/root/test-data')
    const expectedPaths = [
      path.normalize('/root/test-data/abc.trx'),
      path.normalize('/root/test-data/xyz.trx')
    ]

    const actualPaths = getAbsoluteFilePaths(filesNames, dirName)
    expect(actualPaths).toEqual(expectedPaths)
  })
})
describe('when loading xml from a trx file', () => {
  test('LoadXml Should have an outcome of Completed()', async () => {
    const data = await transformTrxToJson(
      './test-data/passing-tests/logger.trx'
    )
    expect(data.ReportMetaData.ReportTitle).toEqual('LOGGER')
    expect(data.TrxData.TestRun.ResultSummary._outcome).toEqual('Completed')
    expect(data.TrxData.TestRun.ResultSummary.Counters._total).toEqual(21)
    expect(data.TrxData.TestRun.ResultSummary.Counters._passed).toEqual(10)
    expect(data.TrxData.TestRun.ResultSummary.Counters._passed).toEqual(
      data.TrxData.TestRun.ResultSummary.Counters._executed
    )
    expect(data.TrxData.TestRun.ResultSummary.Counters._failed).toEqual(0)
  })

  test('LoadXml Should have an outcome of Failed', async () => {
    const data = await transformTrxToJson(
      './test-data/failing-tests/dummy-tests.trx'
    )
    expect(data.ReportMetaData.ReportTitle).toEqual('DUMMY-TESTS')
    expect(data.TrxData.TestRun.ResultSummary._outcome).toEqual('Failed')
    expect(data.TrxData.TestRun.ResultSummary.Counters._total).toEqual(4)
    expect(data.TrxData.TestRun.ResultSummary.Counters._passed).toEqual(3)
    expect(data.TrxData.TestRun.ResultSummary.Counters._failed).toEqual(1)
  })

  test('Test Data with a single test', async () => {
    const data = await transformTrxToJson(
      './test-data/passing-tests/single-test.trx'
    )
    expect(data.ReportMetaData.ReportTitle).toEqual('SINGLE-TEST')
    expect(data.TrxData.TestRun.ResultSummary._outcome).toEqual('Completed')
    expect(data.TrxData.TestRun.ResultSummary.Counters._total).toEqual(1)
    expect(data.TrxData.TestRun.ResultSummary.Counters._passed).toEqual(1)
    expect(data.TrxData.TestRun.ResultSummary.Counters._failed).toEqual(0)
  })

  test('Test Data with a windows test', async () => {
    const data = await transformTrxToJson(
      './test-data/passing-tests/windows-test.trx'
    )
    expect(data.ReportMetaData.ReportTitle).toEqual('WINDOWS-TEST')
    expect(data.TrxData.TestRun.ResultSummary._outcome).toEqual('Completed')
    expect(data.TrxData.TestRun.ResultSummary.Counters._total).toEqual(1)
    expect(data.TrxData.TestRun.ResultSummary.Counters._passed).toEqual(1)
    expect(data.TrxData.TestRun.ResultSummary.Counters._failed).toEqual(0)
  })
})
