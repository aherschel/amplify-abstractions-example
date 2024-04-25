import { Construct } from 'constructs';
import { MonitoringFacade } from 'cdk-monitoring-constructs';
import type { IRestApi } from 'aws-cdk-lib/aws-apigateway';
import type { IFunction } from 'aws-cdk-lib/aws-lambda';

export type RestApiMonitoringProps = {
  api: IRestApi;
  handler: IFunction;
};

export class RestApiMonitoring extends Construct {
  private monitoring: MonitoringFacade;

  constructor(scope: Construct, id: string, props: RestApiMonitoringProps) {
    super(scope, id);

    const { api, handler } = props;

    this.monitoring = new MonitoringFacade(scope, 'RestApiDashboard');

    this.monitoring.addMediumHeader('Api Gateway Backend');
    this.monitoring.addSmallHeader('REST Api');
    this.monitoring.monitorApiGateway({
      api,
      humanReadableName: api.restApiName,
      alarmFriendlyName: api.restApiName,
    });
    this.monitoring.addSmallHeader('Handler Function');
    this.monitoring.monitorLambdaFunction({
      lambdaFunction: handler,
      humanReadableName: handler.functionName,
      alarmFriendlyName: handler.functionName,
    });
  }
}
