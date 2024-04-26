import { a, type ClientSchema } from '@aws-amplify/data-schema';

export const schema = a.schema({
  Todo: a
    .model({
      title: a.string().required(),
      description: a.string().required(),
      done: a.boolean().required(),
      updates: a.hasMany('Update', []),
    })
    .authorization(allow => [
      allow.owner(),
      allow.group('admin').to(['create', 'update', 'delete', 'read']),
      allow.guest().to(['read']),
      allow.authenticated().to(['read']),
      allow.publicApiKey(),
    ]),
  Update: a.model({
    content: a.string().required(),
    team: a.belongsTo('Todo', []),
  }).authorization(allow => [
    allow.owner(),
    allow.group('admin').to(['create', 'update', 'delete', 'read']),
    allow.guest().to(['read']),
    allow.authenticated().to(['read']),
    allow.publicApiKey(),
  ]),
  EchoResponse: a.customType({
    content: a.string().required(),
    executionDuration: a.float().required(),
  }),
  echo: a
    .query()
    .arguments({ content: a.string().required() })
    .returns(a.ref('EchoResponse'))
    .authorization(allow => [
      allow.publicApiKey(),
    ])
    .handler(a.handler.function('echo'))
});

export type Schema = ClientSchema<typeof schema>;
