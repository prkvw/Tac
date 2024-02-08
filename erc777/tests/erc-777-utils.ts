import { newMockEvent } from "matchstick-as"
import { ethereum, Address, Bytes } from "@graphprotocol/graph-ts"
import {
  InterfaceImplementerSet,
  ManagerChanged
} from "../generated/erc777/erc777"

export function createInterfaceImplementerSetEvent(
  addr: Address,
  interfaceHash: Bytes,
  implementer: Address
): InterfaceImplementerSet {
  let interfaceImplementerSetEvent = changetype<InterfaceImplementerSet>(
    newMockEvent()
  )

  interfaceImplementerSetEvent.parameters = new Array()

  interfaceImplementerSetEvent.parameters.push(
    new ethereum.EventParam("addr", ethereum.Value.fromAddress(addr))
  )
  interfaceImplementerSetEvent.parameters.push(
    new ethereum.EventParam(
      "interfaceHash",
      ethereum.Value.fromFixedBytes(interfaceHash)
    )
  )
  interfaceImplementerSetEvent.parameters.push(
    new ethereum.EventParam(
      "implementer",
      ethereum.Value.fromAddress(implementer)
    )
  )

  return interfaceImplementerSetEvent
}

export function createManagerChangedEvent(
  addr: Address,
  newManager: Address
): ManagerChanged {
  let managerChangedEvent = changetype<ManagerChanged>(newMockEvent())

  managerChangedEvent.parameters = new Array()

  managerChangedEvent.parameters.push(
    new ethereum.EventParam("addr", ethereum.Value.fromAddress(addr))
  )
  managerChangedEvent.parameters.push(
    new ethereum.EventParam(
      "newManager",
      ethereum.Value.fromAddress(newManager)
    )
  )

  return managerChangedEvent
}
