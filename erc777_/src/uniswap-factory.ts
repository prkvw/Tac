import { NewExchange as NewExchangeEvent } from "../generated/UniswapFactory/UniswapFactory"
import { UniswapExchange,NewExchange, RegisteredToken } from "../generated/schema"
import { log } from '@graphprotocol/graph-ts'

export function handleNewExchange(event: NewExchangeEvent): void {log.error("Exchange created {}", [event.params.token.toHexString()])

  let exchangeAddress = event.params.exchange
	let exchangeId = exchangeAddress.toHexString()

	let exchange = UniswapExchange.load(exchangeId)
	if (!exchange) {
		exchange = new UniswapExchange(exchangeId)
		exchange.address = exchangeAddress
		exchange.token = event.params.token
		exchange.isErc777Token = !!RegisteredToken.load(event.params.token.toHexString())
		exchange.save()
  let entity = new NewExchange(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.token = event.params.token
  entity.exchange = event.params.exchange

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}}
