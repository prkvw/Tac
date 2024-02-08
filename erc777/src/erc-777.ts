import {
  InterfaceImplementerSet as InterfaceImplementerSetEvent,
  ManagerChanged as ManagerChangedEvent
} from "../generated/erc777/erc777"
import { InterfaceImplementerSet, ManagerChanged } from "../generated/schema"

export function handleInterfaceImplementerSet(
  event: InterfaceImplementerSetEvent
): void {
  let entity = new InterfaceImplementerSet(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.addr = event.params.addr
  entity.interfaceHash = event.params.interfaceHash
  entity.implementer = event.params.implementer

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleManagerChanged(event: ManagerChangedEvent): void {
  let entity = new ManagerChanged(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.addr = event.params.addr
  entity.newManager = event.params.newManager

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
