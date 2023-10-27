export enum Route {
  Authentication = 'Authentication',
  TodoList = 'TodoList'
}

export type RootStackParamList = {
  [Route.Authentication]: undefined;
  [Route.TodoList]: undefined;
};
