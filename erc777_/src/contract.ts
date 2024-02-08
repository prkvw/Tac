import {
  InterfaceImplementerSet as InterfaceImplementerSetEvent,
  ManagerChanged as ManagerChangedEvent
} from "../generated/Contract/Contract"
import { RegisteredToken,InterfaceImplementerSet, ManagerChanged } from "../generated/schema"
import { log } from '@graphprotocol/graph-ts'

export function handleInterfaceImplementerSet(
  event: InterfaceImplementerSetEvent
): void {log.error("InterfaceImplementerSet {}", [event.params.addr.toHexString()])
  if (event.params.interfaceHash.toHexString() != '0xac7fbab5f54a3ca8194167523c6753bfeb96a445279294b6125b68cce2177054') {
		return
	}

	let tokenAddress = event.params.addr
	let tokenId = tokenAddress.toHexString()

	let token = RegisteredToken.load(tokenId)
	if (!token) {
		token = new RegisteredToken(tokenId)
		token.address = tokenAddress
		token.save()
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
