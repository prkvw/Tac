import {
  InterfaceImplementerSet as InterfaceImplementerSetEvent,
  ManagerChanged as ManagerChangedEvent
} from "../generated/erc777/erc777"
import { InterfaceImplementerSet, ManagerChanged } from "../generated/schema"
import { log } from '@graphprotocol/graph-ts'
import { NewExchange } from '../generated/erc777/erc777'

//export function handleInterfaceImplementerSet() ; void {log.error ("Implementer set {}", [event.params.addr.toHexString()])}

export function handleInterfaceImplementerSet(
  event: InterfaceImplementerSetEvent
): void {
  if (event.params.interfaceHash.toHexString() != '0xac7fbab5f54a3ca8194167523c6753bfeb96a445279294b6125b68cce2177054') {
    return
  }
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

export function handleNewExchange(event: NewExchange): void {
	log.error("Exchange created {}", [event.params.token.toHexString()])
}