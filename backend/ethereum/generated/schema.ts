// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class User extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save User entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type User must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("User", id.toString(), this);
    }
  }

  static load(id: string): User | null {
    return changetype<User | null>(store.get("User", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get addr(): string {
    let value = this.get("addr");
    return value!.toString();
  }

  set addr(value: string) {
    this.set("addr", Value.fromString(value));
  }

  get isLoggedIn(): boolean {
    let value = this.get("isLoggedIn");
    return value!.toBoolean();
  }

  set isLoggedIn(value: boolean) {
    this.set("isLoggedIn", Value.fromBoolean(value));
  }

  get date(): BigInt {
    let value = this.get("date");
    return value!.toBigInt();
  }

  set date(value: BigInt) {
    this.set("date", Value.fromBigInt(value));
  }
}
