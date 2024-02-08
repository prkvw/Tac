import { NewExchange as NewExchangeEvent } from "../generated/Uniswap V1/Uniswap V1"
import { NewExchange } from "../generated/schema"

export function handleNewExchange(event: NewExchangeEvent): void {
  let entity = new NewExchange(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.token = event.params.token
  entity.exchange = event.params.exchange

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
