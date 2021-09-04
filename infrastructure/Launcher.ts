import { App } from '@aws-cdk/core';
import { SpaceStack } from "./SpaceStack";

const app = new App();
new SpaceStack(app, 'SpaceFinder', {});
