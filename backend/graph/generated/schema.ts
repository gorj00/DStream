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

  get date(): i32 {
    let value = this.get("date");
    return value!.toI32();
  }

  set date(value: i32) {
    this.set("date", Value.fromI32(value));
  }
}

export class Video extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Video entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Video must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Video", id.toString(), this);
    }
  }

  static load(id: string): Video | null {
    return changetype<Video | null>(store.get("Video", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get ipfsCid(): string {
    let value = this.get("ipfsCid");
    return value!.toString();
  }

  set ipfsCid(value: string) {
    this.set("ipfsCid", Value.fromString(value));
  }

  get dateCreated(): i32 {
    let value = this.get("dateCreated");
    return value!.toI32();
  }

  set dateCreated(value: i32) {
    this.set("dateCreated", Value.fromI32(value));
  }

  get uploader(): string {
    let value = this.get("uploader");
    return value!.toString();
  }

  set uploader(value: string) {
    this.set("uploader", Value.fromString(value));
  }

  get projectId(): i32 {
    let value = this.get("projectId");
    return value!.toI32();
  }

  set projectId(value: i32) {
    this.set("projectId", Value.fromI32(value));
  }
}
