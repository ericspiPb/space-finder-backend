import { AttributeType, Table } from '@aws-cdk/aws-dynamodb';
import { Stack } from '@aws-cdk/core';

export class GenericTable {

  private table: Table;

  public constructor(private stack: Stack, private name: string, private primaryKey: string) {
    this.initialize();
  }

  private initialize() {
    this.createTable();
  }

  private createTable() {
    this.table = new Table(this.stack, this.name, {
      partitionKey: {
        name: this.primaryKey,
        type: AttributeType.STRING,
      },
      tableName: this.name,
    });
  }
}
